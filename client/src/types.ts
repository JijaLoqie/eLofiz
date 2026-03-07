export type ImageInfo = {
    id: string;
    imageUrl: string;
}

export enum WidgetType {
    MUSIC = "music",
    BACKGROUND = "background",
    AUDIO_VISUALIZER = "audio-visualiser",
    TIMER = "timer",
    AMBIENT = "ambient",
    NATURE = "nature",
    FOCUS = "focus",
}


export interface IWidget extends IObject {
    title: string;
    preview: string;
    type: WidgetType;
}

export interface ISpace extends IObject {
    name: string;
    currentBackground: string;
    images: Record<string, ImageInfo>
    streamId: string;
    fixed: boolean;
    widgets: WidgetInstance[];
}

export interface IPreset extends IObject {
    tags: string[];
    spaceProps: SpaceParams

    description: string;
    color: string;
}


export interface IAudio {
    id: string;
    name: string;
    url: string;
    duration: number;
}

export interface IStream extends IObject {
    name: string;
    audios: IAudio[];
    breakpoints: number[];
    cover: string;
    description: string;
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





export interface IObject {
    id: string;
}



export enum StreamType {
    COMPLEX = "Complex",
    SINGLE = "SINGLE",
}

export interface IStreamPart extends IObject {
    title: string;
    type: StreamType;
}
export interface WidgetInstance extends IObject {
    spaceId: string;
    widgetId: string;
    position: { x: number; y: number };
}

export interface SpaceParams {
    name: string;
    streamId: string;
    images: string[];
    fixed?: boolean;
    widgets: WidgetInstance[];
}

export interface ParticleConfig {
    particleNum: number;
    particleSize: number;
    walkForce: number;
    attractRadius: number;
    attractForce: number;
    returnMaxSpeed: number;
    returnMaxForce: number;
    returnRange: number;
    velocityDamping: number;
    backgroundColor: [number, number, number];
    particleColor: [number, number, number];
    accentColor: string;
}