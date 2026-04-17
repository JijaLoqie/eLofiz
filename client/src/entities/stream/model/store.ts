import type { ILocalStore } from "@/shared/hooks/use-local-store.ts";
import { type CollectionModel, linearizeCollection, normalizeCollection } from "@/shared/lib/collection.ts";
import { type IStream } from "@/shared/types.ts";



const initialState: IStream[] = [
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
];

export class StreamStore implements ILocalStore {
    _items: CollectionModel<string, IStream>;

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

    saveStream(editorItem: IStream) {
        Object.assign(this._items.entities[ editorItem.id ], editorItem);
    };
}