import {type IEvents, View} from "../../base";
import {cloneTemplate, ensureElement} from "../../utils";
import type { AddWidgetAction, CloseModalAction, InputAction, SelectAction } from "../../actions.ts";
import type {IModalHomeWidget, IPreset, IStream} from "../../types.ts";
import {WidgetType} from "../../types.ts";
import {ButtonGroup} from "../ui/ButtonGroup.ts";
import {Preset} from "../Preset/Preset.ts";
import { app } from "../../app/LofiApp.ts";
import { SearchField } from "../ui/SearchField.ts";
import { ItemsList } from "../ui/ItemsList.ts";

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
    private buttonGroupPresetTags: ButtonGroup | undefined;
    private buttonGroupWidgetTypes: ButtonGroup | undefined;

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
        this.buttonGroupWidgetTypes = new ButtonGroup(
            ensureElement(".button-group[data-type='widget-type']", this.container),
            this.events,
            key,
        )
        this.buttonGroupWidgetTypes.render({
            items: Object.values(WidgetType)
        });

        const widgetsContainer = ensureElement<HTMLElement>(".widget__buttons", this.container);
        this.events.on<SelectAction>(`button-group:${key}:select`, (data) => {
            let selectedWidgets;
            widgetsContainer.innerHTML = ""
            const { selected } = data;
            if (selected === "") {
                selectedWidgets = app.store.getWidgets();
            } else {
                const selectedWidgetType = selected as WidgetType;
                selectedWidgets = app.store.getWidgetsByType(selectedWidgetType);
            }


            Object.values(selectedWidgets).forEach((widgetData) => {
                const button = document.createElement("div");
                button.className = "button";
                button.textContent = widgetData.ruName;
                widgetsContainer.appendChild(button);
                button.addEventListener("click", () => {
                    this.events.emit<AddWidgetAction>("add-widget", {
                        widgetType: widgetData.type,
                        widgetName: widgetData.name,
                    });
                    this.events.emit<CloseModalAction>("close-modal");
                })
            });


        })
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
        this.buttonGroupWidgetTypes?.reset();
        this.buttonGroupPresetTags?.reset();
    }

    private initPresets() {
        const key = "preset-tags"
        const presetsContainer = ensureElement<HTMLElement>(`.modal__presets-list`, this.container);



        const { tagsCount } = app.store.getPresetListInfo()


        const addPreset = ensureElement(".button[data-type='new-preset']", this.container);


        // Поиск по тегу
        this.buttonGroupPresetTags = new ButtonGroup(
            ensureElement(".button-group[data-type='preset-tag']", this.container),
            this.events,
            key
        );
        this.events.on<SelectAction>(`button-group:${key}:select`, (data) => {
            presetsContainer.innerHTML = "";
            presetsContainer.appendChild(addPreset);
            const { selected: selectedTag } = data;
            let presets: Record<string, IPreset>;

            if (selectedTag === "") {
                presets = app.store.getPresets();
            } else {
                presets = app.store.getPresetsByTag(selectedTag);
            }
            Object.values(presets).forEach((presetInfo) => {
                const preset = new Preset(this.events).render(presetInfo);
                presetsContainer.insertBefore(preset, addPreset);
            });
        });

        // Поиск по названию
        new SearchField(
            ensureElement(".modal__presets-search-field", this.container),
            this.events,
            key
        );
        this.events.on<InputAction>(`text-field:${key}:change`, (data) => {
            const { value } = data;

        });

        this.buttonGroupPresetTags.render( {
            items: Array.from(tagsCount.keys())
        });
    }
}