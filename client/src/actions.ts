import { FieldType, type ISpace, type WidgetType } from "./types.ts";
import type {SpaceMetrics} from "./modules/core/IntersectionSpaceHandler.ts";

export interface AddWidgetAction {
    widgetType: WidgetType;
    widgetName: string;
}

export interface RemoveWidgetAction {
    spaceId: string;
    widgetId: string;
}

export interface ChangeIntersectionAction {
    spaceMetrics: Record<string, SpaceMetrics>;
}

export interface CreateSpaceAction {
    spaceName: string;
    spaceSettings?: Partial<ISpace>;
}

export interface DeleteSpaceAction {
    spaceId: string;
}

export interface RenameSpaceAction {
    spaceId: string;
    newName: string;
}

export interface ChangeSpaceAction {
    spaceId: string;
}

export interface SpaceUpdateAction {}

export interface OpenModalAction { }
export interface CloseModalAction {}


export interface SelectAction {
    selected: string;
}

export interface InputAction {
    value: string;
    type: FieldType;
}