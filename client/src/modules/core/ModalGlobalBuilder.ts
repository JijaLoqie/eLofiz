import {ModalAddWidget} from "../../components/Modal/ModalAddWidget.ts";
import {cloneTemplate, ensureElement} from "../../utils";
import type {IEvents} from "../../base";

export class ModalGlobalBuilder implements IModalGlobalBuilder {
    private readonly modalMenu;

    constructor(private readonly events: IEvents) {
        const modalMenuHtml = cloneTemplate("#modal-menu-template");
        this.modalMenu = new ModalAddWidget(modalMenuHtml, this.events);
        document.body.appendChild(
            this.modalMenu.render({open: false, currentSpaceId: "main"})
        );
    }

    openMainMenu(): void {
        this.modalMenu.open = true;
    }
    closeMainMenu(): void {
        this.modalMenu.open = false;
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