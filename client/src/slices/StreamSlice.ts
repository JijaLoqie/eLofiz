import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IStream, type IStreamPart, StreamType } from "@/types.ts";
import type { RootState } from "@/index.tsx";
import * as stream from "node:stream";

interface StreamSliceState {items: Record<string, IStream>}

const initialSlice: StreamSliceState = {
    items: {
        "stream1": {
            id: "stream1",
            name: "composite stream",
            audios: ["stream-link1", "stream-link2", "stream-link3"],
            breakpoints: [10000,20000,30000,40000],
            cover: "images/back3.jpg",
        },
        "stream-link1": {
            id: "stream-link1",
            name: "stream 1",
            audios: ["audio/ambient.m4a"],
            breakpoints: [10,20,30,40],
            cover: "images/back4.gif",
        },
        "stream-link2": {
            id: "stream-link2",
            name: "stream 2",
            audios: ["audio/dark.m4a"],
            breakpoints: [10,20,30,40],
            cover: "images/back5.jpg",
        },
        "stream-link3": {
            id: "stream-link3",
            name: "stream 3",
            audios: ["audio/knight.m4a"],
            breakpoints: [10,20,30,40],
            cover: "images/back6.png",
        }
    }
}

export const StreamSlice = createSlice({
    name: "StreamSlice",
    initialState: initialSlice,
    reducers: {
        updateStream: (state, action: PayloadAction<IStream>) => {
            const changedItem = action.payload;
            Object.assign(state.items[changedItem.id], changedItem);
        },
        removeStreamParts: (state, action: PayloadAction<{streamId: string, partId: string}>) => {
            const {streamId, partId} = action.payload;
            console.log(`REMOVING ${partId} from ${streamId}`);
            state.items[streamId].audios = state.items[streamId].audios.filter(audioLink => audioLink !== partId);
        }
    },
    selectors: {
        selectStreams: (state) => state.items,
    }
})

export const { updateStream, removeStreamParts } = StreamSlice.actions
export const { selectStreams } = StreamSlice.selectors



export const selectStream = createSelector(
    [StreamSlice.selectors.selectStreams,  (_state: RootState, id: string) => id], // Извлекаем id из аргументов,
    (streams, id): IStream | undefined => streams[id]
);

export const selectStreamPartInfo = createSelector(
    [
        StreamSlice.selectors.selectStreams,
        (_state: RootState, streamPartId: string) => streamPartId
    ],
    (streams, streamPartId) => {
        const streamType = streams[streamPartId] ? StreamType.COMPLEX : StreamType.SINGLE;
        return ({
            id: streamPartId,
            title: streamType === StreamType.SINGLE ? streamPartId : streams[streamPartId].name,
            type: streamType,
        })
    }
)


export const selectStreamParts = createSelector(
    [selectStream],
    (stream): string[] => {
        return stream?.audios || [];
    }
)



