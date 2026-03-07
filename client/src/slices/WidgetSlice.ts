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
        "rain sounds": {
            id: "rain sounds",
            title: "Звуки дождя",
            preview: "preview/rain.png",
            type: WidgetType.AMBIENT,
        },
        "forest sounds": {
            id: "forest sounds",
            title: "Звуки леса",
            preview: "preview/forest.png",
            type: WidgetType.NATURE,
        },
        "cafe ambience": {
            id: "cafe ambience",
            title: "Кафе",
            preview: "preview/cafe.png",
            type: WidgetType.AMBIENT,
        },
        "white noise": {
            id: "white noise",
            title: "Белый шум",
            preview: "preview/whitenoise.png",
            type: WidgetType.AMBIENT,
        },
        "lofi player": {
            id: "lofi player",
            title: "Lo-fi музыка",
            preview: "preview/lofi.png",
            type: WidgetType.MUSIC,
        },
        "piano player": {
            id: "piano player",
            title: "Фортепиано",
            preview: "preview/piano.png",
            type: WidgetType.MUSIC,
        },
        "ocean waves": {
            id: "ocean waves",
            title: "Океан",
            preview: "preview/ocean.png",
            type: WidgetType.NATURE,
        },
        "fireplace": {
            id: "fireplace",
            title: "Камин",
            preview: "preview/fireplace.png",
            type: WidgetType.NATURE,
        },
        "wind sounds": {
            id: "wind sounds",
            title: "Ветер",
            preview: "preview/wind.png",
            type: WidgetType.NATURE,
        },
        "binaural beats": {
            id: "binaural beats",
            title: "Бинауральные ритмы",
            preview: "preview/binaural.png",
            type: WidgetType.FOCUS,
        },
        "thunderstorm": {
            id: "thunderstorm",
            title: "Гроза",
            preview: "preview/thunder.png",
            type: WidgetType.NATURE,
        },
        "birdsong": {
            id: "birdsong",
            title: "Пение птиц",
            preview: "preview/birds.png",
            type: WidgetType.NATURE,
        },
        "night sounds": {
            id: "night sounds",
            title: "Ночные звуки",
            preview: "preview/night.png",
            type: WidgetType.NATURE,
        },
        "aurora background": {
            id: "aurora background",
            title: "Северное сияние",
            preview: "preview/aurora.png",
            type: WidgetType.BACKGROUND,
        },
        "gradient background": {
            id: "gradient background",
            title: "Градиент",
            preview: "preview/gradient.png",
            type: WidgetType.BACKGROUND,
        },
        "particle background": {
            id: "particle background",
            title: "Частицы",
            preview: "preview/particles.png",
            type: WidgetType.BACKGROUND,
        },
        "starfield": {
            id: "starfield",
            title: "Звёздное небо",
            preview: "preview/stars.png",
            type: WidgetType.BACKGROUND,
        },
        "wave visualizer": {
            id: "wave visualizer",
            title: "Волны",
            preview: "preview/wave-viz.png",
            type: WidgetType.AUDIO_VISUALIZER,
        },
        "bars visualizer": {
            id: "bars visualizer",
            title: "Столбцы",
            preview: "preview/bars-viz.png",
            type: WidgetType.AUDIO_VISUALIZER,
        },
        "spiral visualizer": {
            id: "spiral visualizer",
            title: "Спираль",
            preview: "preview/spiral-viz.png",
            type: WidgetType.AUDIO_VISUALIZER,
        },
        "orb visualizer": {
            id: "orb visualizer",
            title: "Сфера",
            preview: "preview/orb-viz.png",
            type: WidgetType.AUDIO_VISUALIZER,
        },
        "forest timer": {
            id: "forest timer",
            title: "Лесной таймер",
            preview: "preview/forest-timer.png",
            type: WidgetType.TIMER,
        },
        "deep work timer": {
            id: "deep work timer",
            title: "Глубокая работа",
            preview: "preview/deepwork.png",
            type: WidgetType.TIMER,
        },
        "meditation timer": {
            id: "meditation timer",
            title: "Медитация",
            preview: "preview/meditation.png",
            type: WidgetType.TIMER,
        },
        "reading timer": {
            id: "reading timer",
            title: "Чтение",
            preview: "preview/reading.png",
            type: WidgetType.TIMER,
        },
        "aurora effect": {
            id: "aurora effect",
            title: "Эффект: Северное сияние",
            preview: "preview/aurora-effect.png",
            type: WidgetType.EFFECTS,
        },
        "blur effect": {
            id: "blur effect",
            title: "Эффект: Размытие",
            preview: "preview/blur-effect.png",
            type: WidgetType.EFFECTS,
        },
        "vignette effect": {
            id: "vignette effect",
            title: "Эффект: Виньетка",
            preview: "preview/vignette-effect.png",
            type: WidgetType.EFFECTS,
        },
        "noise effect": {
            id: "noise effect",
            title: "Эффект: Зерно",
            preview: "preview/noise-effect.png",
            type: WidgetType.EFFECTS,
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