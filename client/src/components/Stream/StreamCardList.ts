import { ItemsList } from "../ui/ItemsList.ts";
import {
    EntityType, FieldType, type IStream,
} from "@/types.ts";
import type { IEvents } from "@/base";
import { StreamCard } from "./StreamCard.ts";
import { SearchField } from "../ui/SearchField.ts";
import { appStore } from "@/app/appStore.ts";
import { selectStreams } from "@/slices/StreamSlice.ts";

export class StreamCardList extends ItemsList<IStream> {
    constructor(wrapper: HTMLElement, events: IEvents) {
        super(
            wrapper,
            events,
            EntityType.STREAMS,
            () => selectStreams(appStore.getState()),
            StreamCard,
        );
        this.register(
            SearchField,
            {},
            FieldType.SEARCH,
            (stream: IStream, selectedName: string) => {
                if (selectedName === "") return true;
                return stream.id.includes(selectedName) || stream.name.includes(selectedName);
            }
        )

    }
}