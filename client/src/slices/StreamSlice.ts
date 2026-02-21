import { createAsyncThunk, createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IStream, StreamType } from "@/types.ts";
import type { RootState } from "@/index.tsx";

interface StreamSliceState {
    items: Record<string, IStream>,
    editingStream: IStream | null
}
const initialSlice: StreamSliceState = {
    items: {
        "composite-stream": {
            id: "composite-stream",
            name: "composite stream",
            audios: ["snowy-weather", "dead-house", "knights-welcome"],
            breakpoints: [10000, 20000, 30000, 40000],
            cover: "images/startBackground.jpeg",
            description: "",
        },
        "snowy-weather": {
            id: "snowy-weather",
            name: "snowy-weather",
            audios: ["audio/ambient.m4a"],
            breakpoints: [10000, 20000, 30000, 40000],
            cover: "images/back7.jpeg",
            description: "",
        },
        "dead-house": {
            id: "dead-house",
            name: "dead-house",
            audios: ["audio/dark.m4a"],
            breakpoints: [10, 20, 30, 40],
            cover: "images/back6.png",
            description: "",
        },
        "knights-welcome": {
            id: "knights-welcome",
            name: "knights-welcome",
            audios: ["audio/knight.m4a"],
            breakpoints: [10, 20, 30, 40],
            cover: "images/back3.jpg",
            description: "",
        },
        "elofiz-studio": {
            id: "elofiz-studio",
            name: "elofiz-studio",
            audios: ["audio/datassette_1.mp3"],
            breakpoints: [10000, 20000, 30000, 40000],
            cover: "images/startBackground.jpeg",
            description: "",
        },
        "electronic-hip-hop": {
            id: "electronic-hip-hop",
            name: "electronic-hip-hop",
            audios: ["audio/song1.mp3"],
            breakpoints: [10000, 20000, 30000, 40000],
            cover: "images/back4.gif",
            description: "",
        },
        "snowy-town": {
            id: "snowy-town",
            name: "snowy-town",
            audios: ["audio/song2.mp3"],
            breakpoints: [10000, 20000, 30000, 40000],
            cover: "images/back8.jpeg",
            description: "",
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

