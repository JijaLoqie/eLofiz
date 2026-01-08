import {type IEvents, View} from "../../base";
import type {ISpace} from "../../types.ts";
import {cloneTemplate, ensureElement} from "../../utils";


class SpaceView extends View<ISpace> {
    constructor(events: IEvents) {
        super(cloneTemplate("#space-template"), events);
    }

    set background(background: string) {
        this.container.style.backgroundImage = `url(../images/${background})`;
    }

    set fixed(fixed: boolean) {
        this.container.classList.toggle("space--fixed", fixed);
    }
}

export default SpaceView;