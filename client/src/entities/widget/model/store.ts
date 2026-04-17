import type { ILocalStore } from "@/shared/hooks/use-local-store.ts";
import { type CollectionModel, linearizeCollection, normalizeCollection } from "@/shared/lib/collection.ts";
import { type IWidget, WidgetType } from "@/shared/types.ts";



const initialState: IWidget[] = [
    {
        id: "basic player",
        title: "Базовый аудио плеер",
        preview: "preview/player.png",
        type: WidgetType.MUSIC,

    },
    {
        id: "basic redactor",
        title: "Базовый редактор фона",
        preview: "preview/background.png",
        type: WidgetType.BACKGROUND,
    },
    {
        id: "basic visualizer",
        title: "Базовый визуализатор",
        preview: "preview/visualiser.png",
        type: WidgetType.AUDIO_VISUALIZER,

    },
    {
        id: "circle visualizer",
        title: "Круговой аудиовизуализатор",
        preview: "preview/circle-visualiser.png",
        type: WidgetType.AUDIO_VISUALIZER,

    },
    {
        id: "text visualizer",
        title: "Текстовый аудиовизуализатор",
        preview: "preview/text-visualiser.png",
        type: WidgetType.AUDIO_VISUALIZER,
    },
    {
        id: "yoda timer",
        title: "Йода таймер",
        preview: "preview/yoda-timer.png",
        type: WidgetType.TIMER,
    },
    {
        id: "pomodoro timer",
        title: "Pomodoro таймер",
        preview: "preview/pomodoro-timer.png",
        type: WidgetType.TIMER,
    },
];

export class WidgetStore implements ILocalStore {
    _items: CollectionModel<string, IWidget>;

    constructor() {
        this._items = normalizeCollection(initialState, (item) => item.id);
    }

    get items() {
        return linearizeCollection(this._items);
    }

    getItem(id: string) {
        return this._items.entities[id];
    }

    destroy() {};
}