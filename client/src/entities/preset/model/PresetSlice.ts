import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { IPreset } from "@/shared/types.ts";
import type { RootState } from "@/index.tsx";

interface PresetSliceState {
    items: Record<string, IPreset>;
}

const initialState: PresetSliceState = {
    items: {
        "elofiz-studio": {
            id: "elofiz-studio",
            tags: ["Classic"],
            spaceProps: {
                name: "eLofiz Studio",
                streamId: "elofiz-studio",
                images: ["images/startBackground.jpeg"],
                widgets: []
            },
            description: "A classic creative studio showcasing innovative projects and timeless design aesthetics",
            color: "#9333ea"
        },
        "dead-house": {
            id: "dead-house",
            tags: ["Dark Lo-Fi"],
            spaceProps: {
                name: "Dead house",
                streamId: "dead-house",
                images: ["images/back6.png"],
                widgets: []
            },
            description: "Immerse yourself in a dark, atmospheric lo-fi environment perfect for focused work and relaxation",
            color: "#ff0000"
        },
        "snowy-weather": {
            id: "snowy-weather",
            tags: ["Ambient"],
            spaceProps: {
                name: "Snowy weather",
                streamId: "snowy-weather",
                images: ["images/back7.jpeg"],
                widgets: []
            },
            description: "Experience a serene snowy ambiance with peaceful, calming vibes for deep concentration",
            color: "#ff0000"
        },
        "knights-welcome": {
            id: "knights-welcome",
            tags: ["Knights"],
            spaceProps: {
                name: "Knights welcome",
                streamId: "knights-welcome",
                images: ["images/back3.jpg"],
                widgets: []
            },
            description: "Step into a medieval-inspired realm where epic adventures and creative exploration await",
            color: "#9333ea"
        },
        "electronic-hip-hop": {
            id: "electronic-hip-hop",
            tags: ["Electronic Music"],
            spaceProps: {
                name: "Electronic Hip Hop",
                streamId: "electronic-hip-hop",
                images: ["images/back4.gif"],
                widgets: []
            },
            description: "Blend electronic beats with hip-hop rhythms in this high-energy creative workspace",
            color: "#fff000"
        },
        "snowy-town": {
            id: "snowy-town",
            tags: ["Hip-Hop"],
            spaceProps: {
                name: "Snowy town",
                streamId: "snowy-town",
                images: ["images/back8.jpeg"],
                widgets: []
            },
            description: "Urban hip-hop vibes meet winter charm in this cool, laid-back creative space",
            color: "#fff000"
        }}
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
