import {type IEvents, View} from "../base";
import type {ISpace} from "../types.ts";
import {cloneTemplate, ensureElement} from "../utils";


class Space extends View<ISpace> {
    constructor(events: IEvents) {
        super(cloneTemplate("#space-template"), events);
    }

    set id(id: string) {
        this.container.id = `space-${id}`;
    }

    set background(background: string) {
        this.container.style.backgroundImage = `url(../images/${background})`;
    }

    set music(music: string) {
        this.container.querySelector(".space__music")!.textContent = music;
    }

    set fixed(fixed: boolean) {
        this.container.classList.toggle("space--fixed", fixed);
    }
}

export default Space;