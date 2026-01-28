import { Component } from "./base";

export enum WidgetType {
    MUSIC = "Музыка",
    BACKGROUND = "Задний фон",
    AUDIO_VISUALIZER = "Аудио полоски",
}

export interface IBaseWidget {
    spaceId: string;
    content: HTMLElement;
}


export interface IWidget extends IObject {
    content: HTMLElement;
    ruName: string;
    preview: string;
    builder: WidgetConstructor;
    type: WidgetType;
}

export interface ISpace {
    name: string;
    background: string;
    fixed: boolean;
    widgets: string[];
}

export enum ModalType {
    WIDGETS = "widgets",
    PRESETS = "presets",
    STREAMS = "streams",
}

export interface IModalHomeWidget {
    open: boolean;
    currentSpaceId: string;
    modalType: ModalType;
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

type WidgetConstructor = (spaceId: string) => Component<IWidget>;
export interface IAudioVisualizerWidget extends IWidget {
}

export interface IStream extends IObject {
    name: string;
    audios: string[];
    breakpoints: number[];
    cover: string;
}


export interface IObject {
    id: string;
}
export interface IPreset extends IObject {
    title: string
    streamId: string;
    images: string[];
    tags: string[];
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