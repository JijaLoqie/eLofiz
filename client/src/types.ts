export enum WidgetType {
    MUSIC = "MUSIC",
    BACKGROUND = "BACKGROUND",
    AUDIO_VISUALIZER = "AUDIO VISUALIZER",
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

export interface IModalAddWidget {
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