import { Component } from "./base";

export enum WidgetType {
    MUSIC = "Музыка",
    BACKGROUND = "Задний фон",
    AUDIO_VISUALIZER = "Аудио полоски",
}


export interface IWidget {
    id: string;
    spaceId: string;
    content: HTMLElement;
}

export interface ISpace {
    name: string;
    background: string;
    fixed: boolean;
    widgets: string[];
}

export interface IModalHomeWidget {
    open: boolean;
    currentSpaceId: string;
}

export interface IBackgroundWidget extends IWidget {
    url: string
}

export interface IMusicPlaylistWidget extends IWidget {
    currentMusicIndex: number;
    musicUrl: string;
    position: number;
    playing: boolean;
    volume: number;
    cover: string;
    songTitle: string;
    artist: string;
}

export interface IAudioVisualizerWidget extends IWidget {
}

export interface IStream {
    id: string;
    name: string;
    audios: string[];
    breakpoints: number[];
    cover: string;
}


export interface IPreset {
    id: string;
    title: string
    streamId: string;
    images: string[];
    tags: string[];
}

type WidgetConstructor = (spaceId: string) => Component<IWidget>;

export interface WidgetInfo {
    name: string;
    ruName: string;
    preview: string;
    builder: WidgetConstructor;
    type: WidgetType;
}