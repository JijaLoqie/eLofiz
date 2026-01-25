import { type IEvents } from "../../base";
import { FieldBase } from "./FieldBase.ts";
import { FieldType, type IButtonGroup } from "../../types.ts";
import { cloneTemplate, ensureElement } from "../../utils";

const buttonGroupTemplate = ensureElement<HTMLTemplateElement>("#button-group-template")

export class ButtonGroup extends FieldBase<IButtonGroup> {
    static type = FieldType.BUTTON_GROUP
    constructor(wrapper: HTMLElement, events: IEvents, _key: string) {
        super(wrapper, buttonGroupTemplate, events, _key);
        this.setValue("", ButtonGroup.type);

    }

    set items(items: string[]) {
        this.container.innerHTML = "";
        items.forEach((itemText, i) => {
            const button = document.createElement("div");
            button.className = "button";
            button.textContent = itemText;
            button.dataset.type = itemText;
            button.addEventListener("click", (e) => {
                this.setValue(itemText, ButtonGroup.type);
            });
            this.container.appendChild(button);
        })
    }

    override handleChange(newSelected: string) {
        const oldButton = this.container.querySelector<HTMLElement>(`[data-type='${this._currentValue}']`);
        const newButton = this.container.querySelector<HTMLElement>(`[data-type='${newSelected}']`);

        if (oldButton) {
            this.toggleClass(oldButton, "selected", false);
        }
        if (newButton) {
            this.toggleClass(newButton, "selected", true);
        }
        this._currentValue = newSelected;
    }
}