import { type IEvents, View } from "@/base";
import { cloneTemplate, ensureElement } from "@/utils";
import { type IStreamPart, StreamType } from "@/types.ts";


const template = ensureElement<HTMLTemplateElement>("#stream-card-part-template");

export class StreamCardPart extends View<IStreamPart> {
    constructor(events: IEvents) {
        super(cloneTemplate(template), events);
        ensureElement(".button[data-type='remove']", this.container)
            .addEventListener("click", (e) => {
                this.events.emit("remove-stream-card", {id: this.container.getAttribute("data-id")});
            })
    }

    set id(id: string) {
        this.container.setAttribute("data-id", id);
    }

    set title(title: string) {
        this.setText(ensureElement(".title", this.container), title);
    }

    set type(type: StreamType) {
        this.setText(ensureElement(".type", this.container), type);
    }
}