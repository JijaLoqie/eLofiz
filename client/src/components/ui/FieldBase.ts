import { type IEvents, View } from "../../base";
import type { InputAction } from "../../actions.ts";
import { FieldType, type IFieldBase } from "../../types.ts";
import { cloneTemplate } from "../../utils";

export class FieldBase<T extends IFieldBase> extends View<T> {
    protected _currentValue: string = "";
    constructor(wrapper: HTMLElement,
                template: HTMLTemplateElement,
                events: IEvents,
                protected readonly _key: string,
    ) {
        const container = cloneTemplate(template);
        wrapper.appendChild(container);
        super(container, events);
    }

    setValue(value: string, type: FieldType): void {
        const oldValue = this._currentValue;
        if (oldValue === value) {
            value = "";
        }
        this.handleChange(value);
        this._currentValue = value;

        this.events.emit<InputAction>(`${this._key}:change`, { value, type });
    }

    handleChange(value: string) {};
}