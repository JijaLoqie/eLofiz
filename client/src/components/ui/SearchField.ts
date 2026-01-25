import { type IEvents } from "../../base";
import { FieldType, type ISearchField } from "../../types.ts";
import { FieldBase } from "./FieldBase.ts";
import { ensureElement } from "../../utils";

const searchTemplate = ensureElement<HTMLTemplateElement>("#search-template");

export class SearchField extends FieldBase<ISearchField> {
    input: HTMLInputElement
    constructor(wrapper: HTMLElement, events: IEvents, _key: string) {
        super(wrapper, searchTemplate, events, _key);
        this.input = ensureElement<HTMLInputElement>("input", this.container);

        this.input.addEventListener("input", (e: Event) => {
            const value = (e.target as HTMLInputElement).value;
            this.setValue(value, FieldType.SEARCH);
        })
    };

    handleChange(value: string) {
        this.input.value = value;
    }
}