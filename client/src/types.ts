export type WidgetType = 'MUSIC' | 'BACKGROUND';


export interface IWidget {
    type: WidgetType
}

export interface ISpace {
    id: string;
    background: string;
    music: string;
    fixed: boolean;
    widgets: IWidget[];
}