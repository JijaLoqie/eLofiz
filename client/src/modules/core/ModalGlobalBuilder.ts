import {ModalHomeWidget} from "../../components/Modal/ModalHomeWidget.ts";
import {cloneTemplate, ensureElement} from "../../utils";
import type {IEvents} from "../../base";
import type { EntityType } from "../../types.ts";
import { ModalEditWidget } from "../../components/Modal/ModalEditWidget.ts";

export class ModalGlobalBuilder implements IModalGlobalBuilder {
    private readonly modalItemsList;
    private readonly modalEditor;

    constructor(private readonly events: IEvents) {
        this.modalItemsList = new ModalHomeWidget(this.events);
        this.modalEditor = new ModalEditWidget(this.events);
        document.body.appendChild(
            this.modalItemsList.render({open: false, currentSpaceId: "main"})
        );
        document.body.appendChild(
            this.modalEditor.render({open: false, currentSpaceId: "main"})
        );
    }

    openEditor(entityType: EntityType, entityId: string): void {
        this.modalEditor.openModal(entityType, entityId);
    }

    toggleModal(modalType: EntityType): void {
        this.modalItemsList.toggleModal(modalType);
    }

    changeSpace(spaceId: string): void {
        this.modalItemsList.currentSpaceId = spaceId;
        this.modalEditor.currentSpaceId = spaceId;
    }
}

export interface IModalGlobalBuilder {
    changeSpace(spaceId: string): void;

    toggleModal(modalType: EntityType): void;

    openEditor(entityType: EntityType, entityId: string): void;
}