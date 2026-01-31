import {ModalHomeWidget} from "@/components/Modal/ModalHomeWidget.ts";
import type {IEvents} from "@/base";
import type { EntityType } from "@/types.ts";
import { appStore } from "@/app/appStore.ts";
import { toggleItemsList } from "@/slices/ModalSlice.ts";

export class ModalGlobalBuilder implements IModalGlobalBuilder {

    constructor(private readonly events: IEvents) {
    }

    openEditor(entityType: EntityType, entityId: string): void {
    }

    toggleModal(entityType: EntityType): void {
        appStore.dispatch(toggleItemsList(entityType));
    }
}

export interface IModalGlobalBuilder {
    toggleModal(modalType: EntityType): void;

    openEditor(entityType: EntityType, entityId: string): void;
}