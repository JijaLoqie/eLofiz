import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IAudio, type IStream, StreamType } from "@/shared/types.ts";
import type { RootState } from "@/index.tsx";

interface StreamSliceState {
    items: Record<string, IStream>,
}
const initialSlice: StreamSliceState = {
    items: {
        "composite-stream": {
            id: "composite-stream",
            name: "composite stream",
            audios: [
                {
                    id: "snowy-weather-audio",
                    name: "snowy-weather",
                    url: "audio/ambient.m4a",
                    duration: 0,
                },
                {
                    id: "dead-house-audio",
                    name: "dead-house",
                    url: "audio/dark.m4a",
                    duration: 0,
                },
                {
                    id: "knights-welcome-audio",
                    name: "knights-welcome",
                    url: "audio/knight.m4a",
                    duration: 0,
                },
            ],
            breakpoints: [10000, 20000, 30000, 40000],
            cover: "images/startBackground.jpeg",
            description: "",
        },
        "snowy-weather": {
            id: "snowy-weather",
            name: "snowy-weather",
            audios: [
                {
                    id: "snowy-weather-1",
                    name: "ambient.m4a",
                    url: "audio/ambient.m4a",
                    duration: 0,
                },
            ],
            breakpoints: [10000, 20000, 30000, 40000],
            cover: "images/back7.jpeg",
            description: "",
        },
        "dead-house": {
            id: "dead-house",
            name: "dead-house",
            audios: [
                {
                    id: "dead-house-1",
                    name: "dark.m4a",
                    url: "audio/dark.m4a",
                    duration: 0,
                },
            ],
            breakpoints: [10, 20, 30, 40],
            cover: "images/back6.png",
            description: "",
        },
        "knights-welcome": {
            id: "knights-welcome",
            name: "knights-welcome",
            audios: [
                {
                    id: "knights-welcome-1",
                    name: "knight.m4a",
                    url: "audio/knight.m4a",
                    duration: 0,
                },
            ],
            breakpoints: [10, 20, 30, 40],
            cover: "images/back3.jpg",
            description: "",
        },
        "elofiz-studio": {
            id: "elofiz-studio",
            name: "elofiz-studio",
            audios: [
                {
                    id: "elofiz-studio-1",
                    name: "datassette_1.mp3",
                    url: "audio/datassette_1.mp3",
                    duration: 0,
                },
            ],
            breakpoints: [10000, 20000, 30000, 40000],
            cover: "images/startBackground.jpeg",
            description: "",
        },
        "electronic-hip-hop": {
            id: "electronic-hip-hop",
            name: "electronic-hip-hop",
            audios: [
                {
                    id: "electronic-hip-hop-1",
                    name: "song1.mp3",
                    url: "audio/song1.mp3",
                    duration: 0,
                },
            ],
            breakpoints: [10000, 20000, 30000, 40000],
            cover: "images/back4.gif",
            description: "",
        },
        "snowy-town": {
            id: "snowy-town",
            name: "snowy-town",
            audios: [
                {
                    id: "snowy-town-1",
                    name: "song2.mp3",
                    url: "audio/song2.mp3",
                    duration: 0,
                },
            ],
            breakpoints: [10000, 20000, 30000, 40000],
            cover: "images/back8.jpeg",
            description: "",
        },
    },
};

export const StreamSlice = createSlice({
    name: "stream",
    initialState: initialSlice,
    reducers: {
        saveStream: (state, action: PayloadAction<IStream>) => {
            Object.assign(state.items[ action.payload.id ], action.payload);
        },
    },
    selectors: {
        selectStreams: (state) => state.items,
    }
})

export const { saveStream } = StreamSlice.actions
export const { selectStreams } = StreamSlice.selectors



export const selectStream = createSelector(
    [StreamSlice.selectors.selectStreams,  (_state: RootState, id: string) => id], // Извлекаем id из аргументов,
    (streams, id): IStream | undefined => streams[id]
);