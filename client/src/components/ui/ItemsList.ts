import { type IEvents, View } from "../../base";
import { FieldBase } from "./FieldBase.ts";
import { FieldType, type IFieldBase, type IObject } from "../../types.ts";
import { ensureElement } from "../../utils";
import type { InputAction } from "../../actions.ts";
import { app } from "../../app/LofiApp.ts";
import { Preset } from "../Preset/Preset.ts";


interface IItemsList {
}



type ExtendedClassField<T> = new (
    wrapper: HTMLElement,
    events: IEvents,
    _key: string
) => T;

type FieldInfo<T> = {
    instance: FieldBase<IFieldBase>;
    filterPass: (item: T, newValue: string) => boolean;
    value: string;
}
type FieldsInfo<T> = Record<FieldType, FieldInfo<T>>

export class ItemsList<ItemType extends IObject> extends View<IItemsList> {
    fields: Partial<FieldsInfo<ItemType>> = {};
    items: ItemType[] = [];
    itemsContainer: HTMLElement = ensureElement(".wrapper[data-type='items']", this.container);

    constructor(
        container: HTMLElement,
        events: IEvents,
        private readonly _key: string,
        private readonly getItems: () => Record<string, ItemType>,
        private readonly ViewClass: new (events: IEvents) => View<ItemType>
    ) {
        super(container, events);
        this.fetchItems();


        this.events.on<InputAction>(`${this._key}:change`, (data)=> {
            const { value: newValue, type } = data;
            if (this.fields[type]) {
                this.fields[type].value = newValue;
                this.fetchItems();
            }
        });
    }

    register<T extends FieldBase<IFieldBase>>(
        ClassField: ExtendedClassField<T>,
        props: Partial<IFieldBase>,
        type: FieldType,
        filterPass: (item: ItemType, newValue: string) => boolean,
    ) {
        const wrapper = ensureElement(`.wrapper[data-type='${type}']`, this.container)
        const instance = new ClassField(wrapper, this.events, this._key);
        instance.render(props);
        this.fields[type] = {
            instance,
            filterPass,
            value: "",
        }
    };


    private fetchItems() {
        this.items = Object.values(this.getItems());
        Object.values(this.fields).forEach((fieldInfo) => {
            this.items = this.items.filter((item) => {
                return fieldInfo.filterPass(item, fieldInfo.value);
            })
        })
        this.renderItems();
    }



    private renderItems() {
        this.itemsContainer.innerHTML = "";
        Object.values(this.items).forEach((itemInfo) => {
            const item = new this.ViewClass(this.events).render(itemInfo);
            this.itemsContainer.appendChild(item);
        });
    }


    reset() {
        Object.entries(this.fields).forEach(([type, fieldInfo]) => {
            fieldInfo.instance.setValue("", type as FieldType);
        });
        this.fetchItems();
    }
}