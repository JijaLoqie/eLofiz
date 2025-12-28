import {type IEvents, View} from "../../base";
import {ensureElement} from "../../utils";
import {ensureAllElements} from "../../utils/utils.ts";
import type {AddWidgetAction} from "../../actions.ts";
import type {IModalAddWidget, WidgetType} from "../../types.ts";



class ModalAddWidget extends View<IModalAddWidget> {
    private currentSpaceName: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.currentSpaceName = ensureElement(".modal_currentSpace-name", this.container);
        this.currentSpaceId = "main";

        this.isOpen = false;
        document.body.appendChild(this.container);

        document.addEventListener("keypress", async (e) => {
            if (e.key === "Enter") {
                this.open();
            }
        });


        ensureAllElements<HTMLButtonElement>("[data-widget]", this.container).forEach((button) => {
            button.addEventListener("click", () => {
                const widgetType = button.dataset.widget as WidgetType || "MUSIC";
                this.events.emit<AddWidgetAction>("add-widget", { currentSpaceId: this.currentSpaceId, widgetType });
                this.close();
            });
        })
    }

    set currentSpaceId(currentSpaceId: string) {
        this.currentSpaceName.textContent = currentSpaceId;
    }
    get currentSpaceId() {
        return this.currentSpaceName.textContent;
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