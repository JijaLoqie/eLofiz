import { type IEvents, View } from "../../base";
import { ensureElement } from "../../utils";
import {
    FieldType,
    type IButtonGroup,
    type IModalHomeWidget,
    type IPreset,
    type IStream,
    type WidgetInfo,
    WidgetType
} from "../../types.ts";
import { ButtonGroup } from "../ui/ButtonGroup.ts";
import { Preset } from "../Preset/Preset.ts";
import { app } from "../../app/LofiApp.ts";
import { SearchField } from "../ui/SearchField.ts";
import { ItemsList } from "../ui/ItemsList.ts";
import { WidgetPreview } from "../widget/WidgetPreview.ts";

const streams: Record<string, IStream> = {
    "stream1": {
        id: "stream1",
        name: "stream 1",
        audios: ["audio1", "audio2", "audio3"],
        breakpoints: [10000,20000,30000,40000],
        cover: "image1",
    }
}

export class ModalHomeWidget extends View<IModalHomeWidget> {
    private currentSpaceName: HTMLElement;
    private widgetsList!: ItemsList<WidgetInfo>;
    private presetsList!: ItemsList<IPreset>;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.currentSpaceName = ensureElement(".modal_currentSpace-name", this.container);
        this.initWidgets();
        this.initPresets();
        this.closeModal();
        ensureElement(".button[data-type='open-presets']", this.container).addEventListener("click", () => {
            this.toggleClass(this.container, "open-preset")
        });
    }

    private initWidgets() {
        const key = "widgets"
        this.widgetsList = new ItemsList(
            ensureElement<HTMLElement>(`.items-list[data-type='${key}']`, this.container),
            this.events,
            key,
            () => app.store.getWidgets(),
            WidgetPreview
        );
        const props: IButtonGroup = {
            items: Object.values(WidgetType),
            value: "",
        }
        this.widgetsList.register(
            ButtonGroup,
            props,
            FieldType.BUTTON_GROUP,
            (widget: WidgetInfo, selectedType: string) => {
                if (selectedType === "") return true;
                return widget.type === selectedType;
            }
        )
    }

    set currentSpaceId(currentSpaceId: string) {
        this.currentSpaceName.textContent = currentSpaceId;
    }

    openModal() {
        this.setVisible(this.container);
    }

    closeModal() {
        this.setHidden(this.container);
        this.toggleClass(this.container, "open-preset", false);
        this.widgetsList.reset();
        this.presetsList.reset();
    }

    private initPresets() {
        const key = "presets";
        this.presetsList = new ItemsList(
            ensureElement<HTMLElement>(`.items-list[data-type='${key}']`, this.container),
            this.events,
            key,
            () => app.store.getPresets(),
            Preset,
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
}