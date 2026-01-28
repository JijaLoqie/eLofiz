import {type IEvents, View} from "../../base";
import {cloneTemplate, ensureElement} from "../../utils";
import type {IPreset} from "../../types.ts";


export class PresetCard extends View<IPreset> {
    constructor(events: IEvents) {
        const container = cloneTemplate("#preset-template");
        super(container, events);
    }

    set images(images: string[]) {
        ensureElement<HTMLImageElement>(
            ".preset-cover",
            this.container
        ).src = `images/${images[0]}`;
    }

    set tags(tags: string[]) {
        const tagsContainer = ensureElement<HTMLDivElement>(".preset-tags", this.container);
        tagsContainer.innerHTML = "";
        tags.forEach((tagName) => {
            const tagDiv = document.createElement("div");
            tagDiv.className = "tag";
            tagDiv.textContent = tagName;
            tagsContainer.appendChild(tagDiv);
        });
    }

    set title(title: string) {
        const titleContainer = ensureElement<HTMLDivElement>(
            ".preset-title", this.container
        );
        titleContainer.textContent = title;
    }
}