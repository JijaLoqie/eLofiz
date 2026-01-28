import {ModalHomeWidget} from "../../components/Modal/ModalHomeWidget.ts";
import {cloneTemplate, ensureElement} from "../../utils";
import type {IEvents} from "../../base";
import type { ModalType } from "../../types.ts";

export class ModalGlobalBuilder implements IModalGlobalBuilder {
    private readonly modalMenu;

    constructor(private readonly events: IEvents) {
        const modalMenuHtml = cloneTemplate("#modal-menu-template");
        this.modalMenu = new ModalHomeWidget(modalMenuHtml, this.events);
        document.body.appendChild(
            this.modalMenu.render({open: false, currentSpaceId: "main"})
        );
    }

    toggleModal(modalType: ModalType): void {
        this.modalMenu.toggleModal(modalType);
    }

    changeSpace(spaceId: string): void {
        this.modalMenu.currentSpaceId = spaceId;
    }

}

export interface IModalGlobalBuilder {
    changeSpace(spaceId: string): void;

    toggleModal(modalType: ModalType): void;
}