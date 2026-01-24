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