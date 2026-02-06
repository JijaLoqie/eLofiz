import { FieldType, type ISpace, EntityType, type WidgetType, ModalType } from "./types.ts";
import { createAction } from "@reduxjs/toolkit";
import type { SpaceMetrics } from "@/components/hooks/useIntersectionSpaceHandler.ts";

export interface AddWidgetAction {
    widgetType: WidgetType;
    widgetName: string;
}

export interface ChangeIntersectionAction {
    spaceMetrics: Record<string, SpaceMetrics>;
}

export interface CreateSpaceAction {
    spaceName: string;
    spaceSettings?: Partial<ISpace>;
}


export interface ChangeSpaceAction {
    spaceId: string;
}

export interface SpaceUpdateAction {}

export interface ToggleModalAction {
    modalType: ModalType;
    entityType: EntityType;
    props?: any;
}

export interface InputAction {
    value: string;
    type: FieldType;
}

export const registerAudio = createAction<{
    spaceId: string,
}>("registerAudio");

export const playBeep = createAction("playBeep");