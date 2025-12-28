import { View, type IEvents } from "../../base";
import type { IWidget, WidgetType } from "../../types.ts";
import {cloneTemplate, ensureElement} from "../../utils";

const widgetTemplate = ensureElement<HTMLTemplateElement>("#widget-template");

class Widget extends View<IWidget> {
    constructor(
        events: IEvents,
    ) {
        super(cloneTemplate(widgetTemplate), events);
    }

    set id (id: string) {
        this.container.id = `widget-${id}`;
    }

    set content(content: HTMLElement) {
        const widgetContent = this.container.querySelector(".widget__content")!

        widgetContent.innerHTML = "";
        widgetContent.appendChild(content);
    }
}

export default Widget;