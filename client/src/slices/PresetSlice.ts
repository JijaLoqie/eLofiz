import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IPreset } from "@/types.ts";
import type { RootState } from "@/index.tsx";

interface PresetSliceState {
    items: Record<string, IPreset>;
}

const initialState: PresetSliceState = {
    items: {
        "preset1": {
            id: "preset1",
            title: "preset 1",
            streamId: "stream1",
            images: ["startBackground.jpeg", "image2", "image3"],
            tags: ["ambient"]
        },
        "preset2": {
            id: "preset2",
            title: "preset 2",
            streamId: "stream1",
            images: ["back4.gif", "image2", "image3"],
            tags: ["electronic"]
        },
        "preset3": {
            id: "preset3",
            title: "preset 3",
            streamId: "stream1",
            images: ["startWorkBackground.gif", "image2", "image3"],
            tags: ["electronic"]
        },
        "preset4": {
            id: "preset4",
            title: "preset 4",
            streamId: "stream1",
            images: ["back6.png", "image2", "image3"],
            tags: ["dark"]
        },
        "preset5": {
            id: "preset5",
            title: "preset 5",
            streamId: "stream1",
            images: ["back3.jpg", "image2", "image3"],
            tags: ["dark"]
        }
    },
}

export const PresetSlice = createSlice({
    name: "presets",
    initialState,
    reducers: {},
    selectors: {
        selectPresets: (state) => state.items,
    }
})

export const { selectPresets } = PresetSlice.selectors

export const selectPreset = createSelector([
    selectPresets,
    (_state: RootState, id: string) => id
], (items: Record<string, IPreset>, id: string) => items[id])