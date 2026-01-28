import {Middleware} from "../base/Middleware.ts";
import type {IEvents} from "../base";
import type {AppData} from "../app/appData.ts";
import {type IModalGlobalBuilder, ModalGlobalBuilder} from "../modules/core/ModalGlobalBuilder.ts";
import type {ChangeSpaceAction} from "../actions.ts";
import { app } from "../app/LofiApp.ts";
import type { ModalType } from "../types.ts";

export class ModalGlobalMiddleware extends Middleware {
    private modalGlobalBuilder: IModalGlobalBuilder;

    constructor(events: IEvents, store: AppData) {
        super(events, store);
        this.modalGlobalBuilder = new ModalGlobalBuilder(this.events);
    }

    register(): void {

        this.events.on<ChangeSpaceAction>("change-space", (data: { spaceId: string }) => {
            this.modalGlobalBuilder.changeSpace(data.spaceId);
        });

        this.events.on("toggle-modal", (data: { modalType: ModalType }) => {
            this.modalGlobalBuilder.toggleModal(data.modalType)
        })
    }
}