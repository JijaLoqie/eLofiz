import { Component } from "./base";
import { appStore } from "@/app/appStore.ts";

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

export enum EntityType {
    WIDGETS = "widgets",
    PRESETS = "presets",
    STREAMS = "streams",
}


export enum ModalType {
    LIST = "list",
    EDITOR = "editor",
}

export interface IModalWidget {
    open: boolean;
    currentSpaceId: string;
    entityType: EntityType;
}

export interface IModalHomeWidget extends IModalWidget {
    modalType: EntityType;
}

export interface IModalEditWidget extends IModalWidget {
    entityId: string;
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


export enum StreamType {
    COMPLEX = "Complex",
    SINGLE = "SINGLE",
}

export interface IStreamPart extends IObject {
    title: string;
    type: StreamType;
}
