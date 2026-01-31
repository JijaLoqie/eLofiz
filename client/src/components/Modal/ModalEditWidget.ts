import { type IEvents, View } from "../../base";
import { cloneTemplate, ensureElement } from "../../utils";
import { EntityType, type IModalEditWidget } from "../../types.ts";
import { StreamEditor } from "../Stream/StreamEditor.ts";

const template = ensureElement<HTMLTemplateElement>("#modal-edit-template");

export class ModalEditWidget extends View<IModalEditWidget> {
    private _currentType: EntityType | "" = "";
    private _currentEntityId: string = "";

    itemEditors: Record<EntityType, any>= {
        [EntityType.WIDGETS]: new StreamEditor(this.container, this.events),
        [EntityType.PRESETS]: new StreamEditor(this.container, this.events), // temporary
        [EntityType.STREAMS]: new StreamEditor(this.container, this.events), // temporary
    }

    constructor(events: IEvents) {
        super(cloneTemplate(template), events);
        this.open = false;
        ensureElement(".button[data-type='close']", this.container).addEventListener("click", () => {
            this.closeModal();
        });
    }

    set currentSpaceId(currentSpaceId: string) {
        ensureElement(".modal_currentSpace-name", this.container)
            .textContent = currentSpaceId;
    }

    set entityType(type: EntityType) {
        this._currentType = type;
        Object.keys(this.itemEditors).forEach(itemType => {
            const itemEditor = this.itemEditors[itemType as EntityType];
            if (this._currentType === itemType) {
                this.setVisible(itemEditor.render());
            } else {
                this.setHidden(itemEditor.render());
                itemEditor.reset();
            }
        })
    }

    set entityId(entityId: string) {
        this._currentEntityId = entityId;
        const itemEditor = this.itemEditors[this._currentType as EntityType];
        itemEditor.render({id: entityId});
    }

    set open(open: boolean) {
        if (open) {
            this.setVisible(this.container);
        } else {
            this.setHidden(this.container);
            this.toggleClass(this.container, "open-preset", false);
        }
    }

    openModal(newType: EntityType, entityId: string) {
        if (this._currentType !== newType) {
            this.entityType = newType;
            this.entityId = entityId;
            this.open = true;
        }
    }

    closeModal() {
        if (this._currentType === "") return;
        const itemEditor = this.itemEditors[this._currentType];
        this.setHidden(itemEditor.render());
        itemEditor.reset();

        this.entityId = "";
        this._currentType = "";
        this.open = false;
    }
}