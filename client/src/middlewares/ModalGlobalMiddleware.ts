import { Middleware } from "../base/Middleware.ts";
import type { IEvents } from "../base";
import type { AppData } from "../app/appData.ts";
import { type IModalGlobalBuilder, ModalGlobalBuilder } from "../modules/core/ModalGlobalBuilder.ts";
import type { ToggleModalAction } from "../actions.ts";
import { ModalType } from "../types.ts";

export class ModalGlobalMiddleware extends Middleware {
    private modalGlobalBuilder: IModalGlobalBuilder;

    constructor(events: IEvents, store: AppData) {
        super(events, store);
        this.modalGlobalBuilder = new ModalGlobalBuilder(this.events);
    }

    register(): void {

        this.events.on<ToggleModalAction>("toggle-modal", (data) => {
            const { modalType, entityType, props: entityId } = data;
            if (modalType === ModalType.LIST) {
                this.modalGlobalBuilder.toggleModal(entityType)
            } else if (modalType === ModalType.EDITOR) {
                this.modalGlobalBuilder.openEditor(entityType, entityId);
            }
        })
    }
}