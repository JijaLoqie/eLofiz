import { View, type IEvents } from "../../base";
import type { IWidget, WidgetType } from "../../types.ts";
import {cloneTemplate, ensureElement} from "../../utils";

const musicTemplate = ensureElement<HTMLTemplateElement>("#widget-music-template");
const backgroundTemplate = ensureElement<HTMLTemplateElement>("#widget-background-template");

class Widget extends View<IWidget> {
    constructor(
        events: IEvents,
        private readonly type: WidgetType
    ) {
        const template = type === "MUSIC" ? musicTemplate : backgroundTemplate;
        super(cloneTemplate(template), events);
    }
}

export default Widget;