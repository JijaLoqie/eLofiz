import { type IEvents, View } from "../../base";
import type { InputAction } from "../../actions.ts";
import type { IPreset } from "../../types.ts";
import { app } from "../../app/LofiApp.ts";
import { Preset } from "../Preset/Preset.ts";

interface ISearchField {
    value: string;
}

export class SearchField extends View<ISearchField> {
    constructor(container: HTMLElement, events: IEvents, private readonly _key: string) {
        super(container, events);
        this.container.addEventListener("input", (e: Event) => {
            const targetValue = (e.target as HTMLInputElement).value;
            this.events.emit<InputAction>(`text-field:${this._key}:change`, {value: targetValue});
        })
    }
}