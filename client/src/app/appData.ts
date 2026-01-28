import SpaceView from "../components/Space/SpaceView.ts";
import type { IEvents } from "../base";
import type { SpaceUpdateAction } from "../actions.ts";
import { type IObject, type IPreset, type IStream, type IWidget, WidgetType } from "../types.ts";
import MusicPlaylistWidget from "../components/widget/MusicPlaylistWidget.ts";
import BackgroundWidget from "../components/widget/BackgroundWidget.ts";
import { AudioVisualizerWidget } from "../components/widget/AudioVisualizerWidget.ts";
import { app } from "./LofiApp.ts";
import { PresetCard } from "../components/Preset/PresetCard.ts";
import { cloneTemplate } from "../utils";

type PresetListInfo = {
    tagsCount: Map<string, number>
}



// TODO: Начать делать три модалки - для списка виджетов, для списка пресетов, для списка потоков
// TODO: Возможно ещё два: окно с превью пресета, окно с превью потока
// TODO: Возможно ещё одно: окно с превью виджета, но выглядит как что-то излишнее. Может быть потом


export class AppData implements ISpaceSelector {
    private readonly spaces: Map<string, SpaceView> = new Map<string, SpaceView>();

    musicWidgetsData: Record<string, IWidget> = {
        "basic player": {
            id: "basic player",
            content: cloneTemplate("#widget-music-template"),
            ruName: "Базовый аудио плеер",
            preview: "",
            builder: (spaceId: string) => new MusicPlaylistWidget(this.events, spaceId),
            type: WidgetType.MUSIC,

        },
    };
    backgroundWidgetsData: Record<string, IWidget> = {
        "basic redactor": {
            id: "basic redactor",
            content: cloneTemplate("#widget-image-selection-template"),
            ruName: "Базовый редактор фона",
            preview: "Базовый редактор фона",
            builder: (spaceId: string) => new BackgroundWidget(spaceId),
            type: WidgetType.BACKGROUND,
        },
    };
    audioVisualizerData: Record<string, IWidget> = {
        "basic visualizer": {
            id: "basic visualizer",
            content: cloneTemplate("#widget-audio-visualizer-template"),
            ruName: "Базовый визуализатор",
            preview: "Базовый визуализатор",
            builder: (spaceId: string) => new AudioVisualizerWidget(spaceId),
            type: WidgetType.AUDIO_VISUALIZER,

        },
    };

    widgetsData: Record<WidgetType, Record<string, IWidget>> = {
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


    streams: Record<string, IStream> = {
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
            breakpoints: [10,20,30,40],
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
    }


    constructor(private readonly events: IEvents) {}

    getSpaces(): Map<string, SpaceView> {
        return this.spaces;
    }

    setSpace(key: string, space: SpaceView): void {
        this.spaces.set(key, space);
        this.events.emit<SpaceUpdateAction>("spaces-updated");
    }


    // getDerivedWidgetData(widgetType: WidgetType, name: string) {
    //     return this.widgetsData[widgetType][name];
    // }
    // getWidgetsByType(widgetType: WidgetType) {
    //     return this.widgetsData[widgetType];
    // }
    getWidgets() {
        return Object.values(this.widgetsData)
            .reduce((acc, widgets) => {
            return { ...acc, ...widgets };
        }, {});
    }

    getPresets() {
        return this.presetsData;
    }

    getStreams() {
        return this.streams;
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


    getAudioStats(streamId: string): IStream | null {
        return this.streams[streamId] || null;
    }

    /**
     * Get all audio files from a stream recursively
     * Expands nested stream references to get all actual audio files
     * @param streamId - The ID of the stream
     * @param visited - Set to track visited streams and prevent infinite recursion
     * @returns Array of audio file paths
     */
    getAllAudioFiles(
        streamId: string,
        visited: Set<string> = new Set()
    ): string[] {
        if (visited.has(streamId)) {
            return [];
        }
        visited.add(streamId);

        const stream = this.streams[streamId];
        if (!stream) {
            return [];
        }

        const audioFiles: string[] = [];

        for (const audio of stream.audios) {
            if (this.isAudioFile(audio)) {
                audioFiles.push(audio);
            } else {
                // It's a stream reference, recurse
                const nestedFiles = this.getAllAudioFiles(audio, visited);
                audioFiles.push(...nestedFiles);
            }
        }

        return audioFiles;
    }

    private isAudioFile(path: string): boolean {
        const audioExtensions = [".mp3", ".m4a", ".wav", ".ogg", ".flac", ".aac"];
        const lowerPath = path.toLowerCase();
        return audioExtensions.some(ext => lowerPath.endsWith(ext));
    }
}

export interface ISpaceSelector {
    getSpaces: () =>  Map<string, SpaceView>;
    setSpace: (key: string, space: SpaceView) => void;
}
