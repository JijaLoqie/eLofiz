import {type IEvents, View} from "../../base";
import {ensureElement} from "../../utils";
import {ensureAllElements} from "../../utils/utils.ts";
import type {AddWidgetAction, CloseModalAction} from "../../actions.ts";
import type {IModalAddWidget} from "../../types.ts";
import {WidgetType} from "../../types.ts";



export class ModalAddWidget extends View<IModalAddWidget> {
    private currentSpaceName: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.currentSpaceName = ensureElement(".modal_currentSpace-name", this.container);
        const buttonsContainer = ensureElement<HTMLDivElement>(".modal__buttons", this.container);
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

    set open(isOpen: boolean) {
        if (isOpen) {
            this.setVisible(this.container);
        } else {
            this.setHidden(this.container);
        }
    };
}