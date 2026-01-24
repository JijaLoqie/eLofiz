import {type IEvents, View} from "../../base";
import {cloneTemplate, ensureElement} from "../../utils";
import type {AddWidgetAction, CloseModalAction} from "../../actions.ts";
import type {IModalHomeWidget} from "../../types.ts";
import {WidgetType} from "../../types.ts";

interface IStream {
    id: string;
    name: string;
    audios: string[];
    breakpoints: number[];
    cover: string;
}


interface IPreset {
    id: string;
    title: string
    streamId: string;
    images: string[];
    tags: string[];
}

const streams: Record<string, IStream> = {
    "stream1": {
        id: "stream1",
        name: "stream 1",
        audios: ["audio1", "audio2", "audio3"],
        breakpoints: [10000,20000,30000,40000],
        cover: "image1",
    }
}

const presets: Record<string, IPreset> = {
    "preset1": {
        id: "preset1",
        title: "preset 1",
        streamId: "stream1",
        images: ["startBackground.jpeg", "image2", "image3"],
        tags: ["ambient"]
    },
    "preset2": {
        id: "preset2",
        title: "preset 2",
        streamId: "stream1",
        images: ["back4.gif", "image2", "image3"],
        tags: ["electronic"]
    },
    "preset3": {
        id: "preset3",
        title: "preset 3",
        streamId: "stream1",
        images: ["startWorkBackground.gif", "image2", "image3"],
        tags: ["electronic"]
    },
    "preset4": {
        id: "preset4",
        title: "preset 4",
        streamId: "stream1",
        images: ["back6.png", "image2", "image3"],
        tags: ["dark"]
    },
    "preset5": {
        id: "preset5",
        title: "preset 5",
        streamId: "stream1",
        images: ["back3.jpg", "image2", "image3"],
        tags: ["dark"]
    }
}

export class ModalHomeWidget extends View<IModalHomeWidget> {
    private currentSpaceName: HTMLElement;

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
        const buttonsContainer = ensureElement<HTMLDivElement>(".add_widget_buttons", this.container);
        Object.values(WidgetType).forEach((widgetType) => {
            const button = document.createElement("button");
            button.className = "button";
            button.textContent = widgetType;
            buttonsContainer.appendChild(button);
            button.addEventListener("click", () => {
                this.events.emit<AddWidgetAction>("add-widget", { widgetType });
                this.events.emit<CloseModalAction>("close-modal");
            })
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
        this.toggleClass(this.container, "open-preset", false)
    }


    private initPresets() {
        const addPreset = ensureElement(".button[data-type='new-preset']", this.container);
        Object.values(presets).forEach((presetInfo) => {
            const preset = cloneTemplate("#preset-template");
            // init
            ensureElement<HTMLImageElement>(".preset-cover", preset).src = `images/${presetInfo.images[0]}`;
            const tagsContainer = ensureElement<HTMLDivElement>(".preset-tags", preset);
            presetInfo.tags.forEach((tagName) => {
                const tagDiv = document.createElement("div");
                tagDiv.className = "tag";
                tagDiv.textContent = tagName;
                tagsContainer.appendChild(tagDiv);
            });
            const titleContainer = ensureElement<HTMLDivElement>(".preset-title", preset);
            titleContainer.textContent = presetInfo.title;

            ensureElement(`.modal__presets`, this.container).insertBefore(preset, addPreset);

        });
    }
}