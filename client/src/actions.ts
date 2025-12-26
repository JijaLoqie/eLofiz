import type {WidgetType} from "./types.ts";

export interface AddWidgetAction {
    currentSpaceId: string;
    widgetType: WidgetType;
}