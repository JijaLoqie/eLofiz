import { createSelector, createSlice } from "@reduxjs/toolkit";
import { type IWidget, WidgetType } from "@/shared/types.ts";
import type { RootState } from "@/index.tsx";

interface WidgetSliceState {
    items: Record<string, IWidget>;
}

const initialState: WidgetSliceState = {
    items: {
        "basic player": {
            id: "basic player",
            title: "Базовый аудио плеер",
            preview: "preview/player.png",
            type: WidgetType.MUSIC,

        },
        "basic redactor": {
            id: "basic redactor",
            title: "Базовый редактор фона",
            preview: "preview/background.png",
            type: WidgetType.BACKGROUND,
        },
        "basic visualizer": {
            id: "basic visualizer",
            title: "Базовый визуализатор",
            preview: "preview/visualiser.png",
            type: WidgetType.AUDIO_VISUALIZER,

        },
        "circle visualizer": {
            id: "circle visualizer",
            title: "Круговой аудиовизуализатор",
            preview: "preview/circle-visualiser.png",
            type: WidgetType.AUDIO_VISUALIZER,

        },
        "text visualizer": {
            id: "text visualizer",
            title: "Текстовый аудиовизуализатор",
            preview: "preview/text-visualiser.png",
            type: WidgetType.AUDIO_VISUALIZER,
        },
        "yoda timer": {
            id: "yoda timer",
            title: "Йода таймер",
            preview: "preview/yoda-timer.png",
            type: WidgetType.TIMER,
        },
        "pomodoro timer": {
            id: "pomodoro timer",
            title: "Pomodoro таймер",
            preview: "preview/pomodoro-timer.png",
            type: WidgetType.TIMER,
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