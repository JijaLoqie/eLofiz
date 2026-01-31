import { type IEvents, View } from "../../base";
import { cloneTemplate, ensureElement } from "../../utils";
import {
    type IModalHomeWidget,
    EntityType,
} from "../../types.ts";
import { WidgetCardList } from "../Widget/WidgetCardList.ts";
import { PresetCardList } from "../Preset/PresetCardList.ts";
import { StreamCardList } from "../Stream/StreamCardList.ts";


const template = ensureElement<HTMLTemplateElement>("#modal-menu-template");


export class ModalHomeWidget extends View<IModalHomeWidget> {
    private _currentType: EntityType | "" = "";
    private readonly itemsList;

    constructor(events: IEvents) {
        super(cloneTemplate(template), events);
        this.itemsList = {
            [EntityType.WIDGETS]: new WidgetCardList(this.container, events),
            [EntityType.PRESETS]: new PresetCardList(this.container, events),
            [EntityType.STREAMS]: new StreamCardList(this.container, events),
        };

        this.open = false;
        ensureElement(".button[data-type='open-presets']", this.container).addEventListener("click", () => {
            this.toggleClass(this.container, "open-preset")
        });
    }



    set currentSpaceId(currentSpaceId: string) {
        ensureElement(".modal_currentSpace-name", this.container)
            .textContent = currentSpaceId;
    }

    set entityType(type: EntityType) {
        this._currentType = type;
        Object.keys(this.itemsList).forEach(itemType => {
            const itemList = this.itemsList[itemType as EntityType];
            if (this._currentType === itemType) {
                this.setVisible(itemList.render());
            } else {
                this.setHidden(itemList.render());
                itemList.reset();
            }
        })
    }
    set open(open: boolean) {
        if (open) {
            this.setVisible(this.container);
        } else {
            this.setHidden(this.container);
            this.toggleClass(this.container, "open-preset", false);
        }
    }

    toggleModal(newType: EntityType) {
        if (this._currentType !== newType) {
            this.entityType = newType;
            this.open = true;
        } else {
            const itemList = this.itemsList[this._currentType];
            this.setHidden(itemList.render());
            itemList.reset();

            this._currentType = "";
            this.open = false;
        }
    }
}