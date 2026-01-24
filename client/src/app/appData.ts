import SpaceView from "../components/Space/SpaceView.ts";
import type { IEvents } from "../base";
import type { SpaceUpdateAction } from "../actions.ts";
import { type IPreset, type WidgetInfo, WidgetType } from "../types.ts";
import MusicPlaylistWidget from "../components/widget/MusicPlaylistWidget.ts";
import BackgroundWidget from "../components/widget/BackgroundWidget.ts";
import { AudioVisualizerWidget } from "../components/widget/AudioVisualizerWidget.ts";
import { app } from "./LofiApp.ts";
import { Preset } from "../components/Preset/Preset.ts";

type PresetListInfo = {
    tagsCount: Map<string, number>
}


export class AppData implements ISpaceSelector {
    private readonly spaces: Map<string, SpaceView> = new Map<string, SpaceView>();

    musicWidgetsData: Record<string, WidgetInfo> = {
        "basic player": {
            name: "basic player",
            ruName: "Базовый аудио плеер",
            preview: "",
            builder: (spaceId: string) => new MusicPlaylistWidget(this.events, spaceId),
            type: WidgetType.MUSIC,
        },
    };
    backgroundWidgetsData: Record<string, WidgetInfo> = {
        "basic redactor": {
            name: "basic redactor",
            ruName: "Базовый редактор фона",
            preview: "Базовый редактор фона",
            builder: (spaceId: string) => new BackgroundWidget(spaceId),
            type: WidgetType.BACKGROUND,
        },
    };
    audioVisualizerData: Record<string, WidgetInfo> = {
        "basic visualizer": {
            name: "basic visualizer",
            ruName: "Базовый визуализатор",
            preview: "Базовый визуализатор",
            builder: (spaceId: string) => new AudioVisualizerWidget(spaceId),
            type: WidgetType.AUDIO_VISUALIZER,

        },
    };

    widgetsData: Record<WidgetType, Record<string, WidgetInfo>> = {
        [ WidgetType.MUSIC ]: this.musicWidgetsData,
        [ WidgetType.BACKGROUND ]: this.backgroundWidgetsData,
        [ WidgetType.AUDIO_VISUALIZER ]: this.audioVisualizerData,
    };

    presetsData: Record<string, IPreset> = {
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
    }


    constructor(private readonly events: IEvents) {}

    getSpaces(): Map<string, SpaceView> {
        return this.spaces;
    }

    setSpace(key: string, space: SpaceView): void {
        this.spaces.set(key, space);
        this.events.emit<SpaceUpdateAction>("spaces-updated");
    }


    getDerivedWidgetData(widgetType: WidgetType, name: string) {
        return this.widgetsData[widgetType][name];
    }
    getWidgetsByType(widgetType: WidgetType) {
        return this.widgetsData[widgetType];
    }
    getWidgets() {
        return Object.values(this.widgetsData)
            .reduce((acc, widgets) => {
            return { ...acc, ...widgets };
        }, {});
    }

    getPresets() {
        return this.presetsData;
    }

    getPresetListInfo(): PresetListInfo {
        const tagsCount = new Map<string, number>();
        Object.values(app.store.getPresets()).forEach((presetInfo) => {
            presetInfo.tags.forEach((tag) => {
                if (!tagsCount.has(tag)) {
                    tagsCount.set(tag, 0);
                }
                let old = tagsCount.get(tag)!;
                tagsCount.set(tag, old + 1);
            })
        });
        return {tagsCount};
    }

    getPresetsByTag(selectedTag: string) {
        return Object.fromEntries(
            Object.values(this.presetsData).filter((preset) => {
                return preset.tags.some(tag => selectedTag === tag);
            }).map(presetInfo => [presetInfo.id, presetInfo])
        );
    }
}

export interface ISpaceSelector {
    getSpaces: () =>  Map<string, SpaceView>;
    setSpace: (key: string, space: SpaceView) => void;
}
