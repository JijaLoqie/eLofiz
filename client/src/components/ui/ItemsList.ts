import { type IEvents, View } from "../../base";


interface IItemsList {
}


export class ItemsList extends View<IItemsList> {
    constructor(container: HTMLElement, events: IEvents, _key: string) {
        super(container, events);
    }
}