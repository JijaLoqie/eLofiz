export type WidgetType = 'MUSIC' | 'BACKGROUND';


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