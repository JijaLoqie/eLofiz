import { View, type IEvents } from "../../base";
import type { IWidget, WidgetType } from "../../types.ts";
import { cloneTemplate, ensureElement } from "../../utils";
import { DragHandler } from "../../utils/DragHandler.ts";
import type {RemoveWidgetAction} from "../../actions.ts";

const widgetTemplate = ensureElement<HTMLTemplateElement>("#widget-template");

class Widget extends View<IWidget> {

    private dragHandler: DragHandler;

    constructor(events: IEvents) {
        super(cloneTemplate(widgetTemplate), events);
        const widgetHeader = ensureElement(".widget__header", this.container);
        this.dragHandler = new DragHandler(widgetHeader, this.container);
        ensureElement<HTMLButtonElement>(".button[data-close-button]", this.container)
            .addEventListener("click", this.destroy.bind(this));
    }

    set content(content: HTMLElement) {
        const widgetContent = this.container.querySelector(".widget__content")!;
        widgetContent.innerHTML = "";
        widgetContent.appendChild(content);
    }

    private destroy(): void {
        const closeButton =
            this.container
            .querySelector<HTMLButtonElement>
            (".button[data-close-button]");

        if (closeButton) {
            closeButton.removeEventListener("click", this.destroy.bind(this));
        }

        // Clean up DragHandler
        this.dragHandler.destroy();

        // Remove container from DOM
        this.container.remove();
    }
}

export default Widget;