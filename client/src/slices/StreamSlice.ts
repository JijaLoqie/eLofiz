import { createAsyncThunk, createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IStream, StreamType } from "@/types.ts";
import type { RootState } from "@/index.tsx";
import { getAudioDuration } from "@/modules/StreamEditor";

interface StreamSliceState {items: Record<string, IStream>, editingStream: IStream | null}

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
            breakpoints: [10000,20000,30000,40000],
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
    },
    editingStream: null
}

export const StreamSlice = createSlice({
    name: "stream",
    initialState: initialSlice,
    reducers: {
        saveStream: (state) => {
            if (!state.editingStream) return;
            Object.assign(state.items[ state.editingStream.id ], state.editingStream);
            state.editingStream = null;
        },
        removeStreamParts: (state, action: PayloadAction<{ streamId: string, partId: string }>) => {
            const {
                streamId,
                partId
            } = action.payload;
            state.items[ streamId ].audios = state.items[ streamId ].audios.filter(audioLink => audioLink !== partId);
        },
        setEditingStream: (state, action: PayloadAction<IStream | null>) => {
            state.editingStream = action.payload;
        },
        updateEditingStream: (state, action: PayloadAction<Partial<IStream>>) => {
            if (!state.editingStream) return;
            // All checks passed, update the property
            const newEditingSteamProps = action.payload;
            Object.assign(state.editingStream, newEditingSteamProps);
        }
    },
    selectors: {
        selectStreams: (state) => state.items,
        selectEditingStream: (state) => state.editingStream,
    }
})

export const { saveStream, removeStreamParts, setEditingStream, updateEditingStream } = StreamSlice.actions
export const { selectStreams, selectEditingStream } = StreamSlice.selectors



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
);

