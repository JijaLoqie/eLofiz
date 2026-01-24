import {ModalHomeWidget} from "../../components/Modal/ModalHomeWidget.ts";
import {cloneTemplate, ensureElement} from "../../utils";
import type {IEvents} from "../../base";

export class ModalGlobalBuilder implements IModalGlobalBuilder {
    private readonly modalMenu;

    constructor(private readonly events: IEvents) {
        const modalMenuHtml = cloneTemplate("#modal-menu-template");
        this.modalMenu = new ModalHomeWidget(modalMenuHtml, this.events);
        document.body.appendChild(
            this.modalMenu.render({open: false, currentSpaceId: "main"})
        );
    }

    openMainMenu(): void {
        this.modalMenu.openModal();
    }
    closeMainMenu(): void {
        this.modalMenu.closeModal();
    }

    changeSpace(spaceId: string): void {
        this.modalMenu.currentSpaceId = spaceId;
    }

}

export interface IModalGlobalBuilder {
    openMainMenu(): void;
    closeMainMenu(): void;

    changeSpace(spaceId: string): void;
}