import {type IEvents, View} from "../../base";
import {ensureElement} from "../../utils";
import type {SelectAction} from "../../actions.ts";

interface IButtonGroup {
    items: string[];
}


export class ButtonGroup extends View<IButtonGroup> {
    private _selected: string = "";
    constructor(container: HTMLElement, events: IEvents, private readonly _key: string) {
        super(container, events);
        this.setSelected("");
    }

    set items(items: string[]) {
        this.container.innerHTML = "";
        items.forEach((itemText, i) => {
            const button = document.createElement("div");
            button.className = "button";
            button.textContent = itemText;
            button.dataset.type = itemText;
            button.addEventListener("click", () => {
                this.setSelected(itemText);
            });
            this.container.appendChild(button);
        })
    }

    private setSelected(newSelected: string) {
        const oldButton = this.container.querySelector<HTMLElement>(`[data-type='${this._selected}']`);
        const newButton = this.container.querySelector<HTMLElement>(`[data-type='${newSelected}']`);

        console.log({oldSelected: this._selected, newSelected: newSelected});
        if (oldButton) {
            this.toggleClass(oldButton, "selected", false);
            if (newSelected === this._selected) {
                this.events.emit<SelectAction>(`button-group:${this._key}:select`, {selected: ""});
                this._selected = "";
                return;
            }
        }
        if (newButton) {
            this.toggleClass(newButton, "selected", true);
        }

        this._selected = newSelected;
        this.events.emit<SelectAction>(`button-group:${this._key}:select`, {selected: newSelected});
    }

    reset() {
        this.setSelected("");
    }
}