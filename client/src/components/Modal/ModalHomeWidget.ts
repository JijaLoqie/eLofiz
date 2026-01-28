import { type IEvents, View } from "../../base";
import { ensureElement } from "../../utils";
import {
    FieldType,
    type IButtonGroup,
    type IModalHomeWidget,
    type IPreset,
    type IStream,
    ModalType,
    type IWidget,
    WidgetType
} from "../../types.ts";
import { ButtonGroup } from "../ui/ButtonGroup.ts";
import { PresetCard } from "../Preset/PresetCard.ts";
import { app } from "../../app/LofiApp.ts";
import { SearchField } from "../ui/SearchField.ts";
import { ItemsList } from "../ui/ItemsList.ts";
import { WidgetCard } from "../widget/WidgetCard.ts";
import { StreamCard } from "../Stream/StreamCard.ts";


export class ModalHomeWidget extends View<IModalHomeWidget> {
    private _currentType: ModalType | "" = "";
    private currentSpaceName: HTMLElement;
    private widgetsList!: ItemsList<IWidget>;
    private presetsList!: ItemsList<IPreset>;
    private streamsList!: ItemsList<IStream>;
    private itemsList;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.currentSpaceName = ensureElement(".modal_currentSpace-name", this.container);
        this.initWidgets();
        this.initPresets();
        this.initStreams();
        this.itemsList = {
            [ModalType.WIDGETS]: this.widgetsList,
            [ModalType.PRESETS]: this.presetsList,
            [ModalType.STREAMS]: this.streamsList,
        };

        this.open = false;
        ensureElement(".button[data-type='open-presets']", this.container).addEventListener("click", () => {
            this.toggleClass(this.container, "open-preset")
        });
    }



    set currentSpaceId(currentSpaceId: string) {
        this.currentSpaceName.textContent = currentSpaceId;
    }

    set modalType(type: ModalType) {
        this._currentType = type;
        Object.keys(this.itemsList).forEach(itemType => {
            const itemList = this.itemsList[itemType as ModalType];
            if (this._currentType === itemType) {
                this.setVisible(itemList.render());
            } else {
                this.setHidden(itemList.render());
                itemList.reset();
            }
        })
    }
    set open(open: boolean) {
        if (open) {
            this.setVisible(this.container);
        } else {
            this.setHidden(this.container);
            this.toggleClass(this.container, "open-preset", false);
        }
    }

    toggleModal(newType: ModalType) {
        if (this._currentType !== newType) {
            this.modalType = newType;
            this.open = true;
        } else {
            const itemList = this.itemsList[this._currentType];
            this.setHidden(itemList.render());
            itemList.reset();

            this._currentType = "";
            this.open = false;
        }
    }


    private initWidgets() {
        const key = ModalType.WIDGETS;
        this.widgetsList = new ItemsList<IWidget>(
            this.container,
            this.events,
            key,
            () => app.store.getWidgets(),
            WidgetCard
        );
        const props: IButtonGroup = {
            items: Object.values(WidgetType),
            value: "",
        }
        this.widgetsList.register(
            ButtonGroup,
            props,
            FieldType.BUTTON_GROUP,
            (widget: IWidget, selectedType: string) => {
                if (selectedType === "") return true;
                return widget.type === selectedType;
            }
        )
    }
    private initPresets() {
        const key = ModalType.PRESETS;
        this.presetsList = new ItemsList(
            this.container,
            this.events,
            key,
            () => app.store.getPresets(),
            PresetCard,
        );
        const { tagsCount } = app.store.getPresetListInfo()
        const props: IButtonGroup = {
            value: "",
            items: Array.from(tagsCount.keys())
        };
        this.presetsList.register(
            ButtonGroup,
            props,
            FieldType.BUTTON_GROUP,
            (preset: IPreset, selectedTag: string) => {
                if (selectedTag === "") return true;
                return preset.tags.some((tag) => selectedTag === tag);
            }
        );
        this.presetsList.register(
            SearchField,
            {},
            FieldType.SEARCH,
            (preset: IPreset, selectedName: string) => {
                if (selectedName === "") return true;
                return preset.id.includes(selectedName);
            }
        )
    }
    private initStreams() {
        const key = ModalType.STREAMS;
        this.streamsList = new ItemsList<IStream>(
            this.container,
            this.events,
            key,
            () => app.store.getStreams(),
            StreamCard
        );
        this.streamsList.register(
            SearchField,
            {},
            FieldType.SEARCH,
            (stream: IStream, selectedName: string) => {
                if (selectedName === "") return true;
                return stream.id.includes(selectedName) || stream.name.includes(selectedName);
            }
        )

    }
}