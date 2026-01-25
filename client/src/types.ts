import { Component } from "./base";

export enum WidgetType {
    MUSIC = "Музыка",
    BACKGROUND = "Задний фон",
    AUDIO_VISUALIZER = "Аудио полоски",
}
export interface IObject {
    id: string;
}


export interface IWidget extends IObject {
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

export interface IStream extends IObject {
    name: string;
    audios: string[];
    breakpoints: number[];
    cover: string;
}


export interface IPreset extends IObject {
    title: string
    streamId: string;
    images: string[];
    tags: string[];
}

type WidgetConstructor = (spaceId: string) => Component<IWidget>;

export interface WidgetInfo extends IObject {
    ruName: string;
    preview: string;
    builder: WidgetConstructor;
    type: WidgetType;
}

export interface IFieldBase {
    value: string;
}
export interface IButtonGroup extends IFieldBase {
    items: string[];
}
export interface ISearchField extends IFieldBase {
}

export enum FieldType {
    BUTTON_GROUP = "button-group",
    SEARCH = "search",
}