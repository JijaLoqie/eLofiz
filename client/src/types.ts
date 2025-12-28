export type WidgetType = 'MUSIC' | 'BACKGROUND';


export interface IWidget {
    id: string
    content: HTMLElement;
}

export interface ISpace {
    id: string;
    background: string;
    music: string;
    fixed: boolean;
    widgets: string[];
}