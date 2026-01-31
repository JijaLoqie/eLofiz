import { ItemsList } from "../ui/ItemsList.ts";
import { type IStreamPart, } from "@/types.ts";
import type { IEvents } from "@/base";
import { StreamCardPart } from "./StreamCardPart.ts";
import { removeStreamParts, selectStreamParts } from "@/slices/StreamSlice.ts";
import { appStore } from "@/app/appStore.ts";



export class StreamCardPartList extends ItemsList<IStreamPart> {
    private _removeHandler: (data: {id: string}) => void;
    constructor(wrapper: HTMLElement, events: IEvents) {
        const _key = "stream-part";
        super(
            wrapper,
            events,
            _key,
            () =>  selectStreamParts(appStore.getState(), ""),
            StreamCardPart,
        );
        this._removeHandler = (data: {id: string}) => {
            console.log("NO ID");
            this.removeItem("", data.id);
        };
        this.events.on("remove-stream-card", this._removeHandler);
    };

    removeItem(streamId: string, partId: string) {
        appStore.dispatch(removeStreamParts({streamId: streamId, partId: partId}));
        this.fetchItems();
    }

    set id(streamId: string) {
        console.log(`new id: ${streamId}`);
        console.log("REAL UPDATED");

        // Remove old listener and add new one
        this.events.off("remove-stream-card", this._removeHandler);
        this._removeHandler = (data: {id: string}) => {
            console.log({streamId})
            this.removeItem(streamId, data.id);
        }
        this.events.on("remove-stream-card", this._removeHandler);

        super.updateFunction(() =>  selectStreamParts(appStore.getState(), streamId));
    }


}