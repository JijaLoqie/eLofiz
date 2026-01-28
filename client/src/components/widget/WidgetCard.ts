import { ModalType, type IWidget, WidgetType } from "../../types.ts";
import { type IEvents, View } from "../../base";
import { cloneTemplate, ensureElement } from "../../utils";
import type { AddWidgetAction, ToggleModalAction } from "../../actions.ts";

export class WidgetCard extends View<IWidget> {
    private _id: string = "";
    private _type: WidgetType = WidgetType.BACKGROUND;

    button = ensureElement(".button", this.container);

    constructor(events: IEvents) {
        super(cloneTemplate("#widget-preview-template"), events);
        this.button.addEventListener("click", () => {
            this.events.emit<AddWidgetAction>("add-widget", {
                widgetType: this.getType(),
                widgetName: this.getId(),
            });
            this.events.emit<ToggleModalAction>("toggle-modal", {modalType: ModalType.WIDGETS});
        })
    }

    set ruName(ruName: string) {
        this.button!.textContent = ruName;
    }

    set type(type: WidgetType) {
        this._type = type;
    }

    set id(id: string) {
        this._id = id;
    }

    private getType() {
        return this._type;
    }

    private getId() {
        return this._id;
    }
}