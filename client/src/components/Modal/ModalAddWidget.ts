import {type IEvents, View} from "../../base";
import {ensureElement} from "../../utils";
import {ensureAllElements} from "../../utils/utils.ts";
import type {AddWidgetAction} from "../../actions.ts";
import type {WidgetType} from "../../types.ts";

interface IModalAddWidget {
}

class ModalAddWidget extends View<IModalAddWidget> {
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.isOpen = false;
        document.body.appendChild(this.container);


        this.events.on("open-modal-add-widget", () => {
            this.open();
        });

        this.events.on("close-modal-close-widget", () => {
            this.close();
        });
        document.addEventListener("keypress", async (e) => {
            if (e.key === "Enter") {
                this.open();
            }
        });


        ensureAllElements<HTMLButtonElement>("button", this.container).forEach((button) => {
            button.addEventListener("click", () => {
                const widgetType = button.dataset.type as WidgetType || "MUSIC";
                this.events.emit<AddWidgetAction>("add-widget", { currentSpaceId: "main", widgetType });
                this.close();
            });
        })
    }
    get isOpen() {
        return getComputedStyle(this.container).display !== "none";
    }

    set isOpen(isOpen: boolean) {
        if (isOpen) {
            this.setVisible(this.container);
        } else {
            this.setHidden(this.container);
        }
    };

    open() {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
    };

    close() {
        if (!this.isOpen) {
            return;
        }
        this.isOpen = false;
    };
}

export default ModalAddWidget;