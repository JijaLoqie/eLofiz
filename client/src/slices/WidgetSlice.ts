import { createSelector, createSlice } from "@reduxjs/toolkit";
import { type IWidget, WidgetType } from "@/types.ts";
import type { RootState } from "@/index.tsx";

interface WidgetSliceState {
    items: Record<string, IWidget>;
}

const initialState: WidgetSliceState = {
    items: {
        "basic player": {
            id: "basic player",
            title: "Базовый аудио плеер",
            preview: "",
            type: WidgetType.MUSIC,

        },
        "basic redactor": {
            id: "basic redactor",
            title: "Базовый редактор фона",
            preview: "",
            type: WidgetType.BACKGROUND,
        },
        "basic visualizer": {
            id: "basic visualizer",
            title: "Базовый визуализатор",
            preview: "",
            type: WidgetType.AUDIO_VISUALIZER,

        },
    },
}

export const WidgetSlice = createSlice({
    name: "widget",
    initialState,
    reducers: {},
    selectors: {
        selectWidgets: (state) => state.items,
    }
});

export const { selectWidgets } = WidgetSlice.selectors;

export const selectWidget = createSelector(
    [
        selectWidgets,
        (_state: RootState, id: string) => id,
    ],
    (widgets, id) => widgets[id]
)