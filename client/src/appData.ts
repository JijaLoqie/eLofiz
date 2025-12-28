import {type ISpace, type IWidget} from './types.ts';
import { type IEvents } from './base';

const defaultSpaces: ISpace[] = [
    {id: "main", background: 'startBackground.jpeg', music: 'DOOM DOOM DOOOM DOM DOM', fixed: false, widgets: []},
    {id: "work", background: 'startWorkBackground.gif', music: 'NO MUSIC', fixed: true, widgets: []},
];

export class AppData {
    private readonly spaces: ISpace[] = defaultSpaces;
    constructor(private readonly events: IEvents) {
        this.spaces = defaultSpaces;
    }

    getSpaces() {
        return this.spaces;
    }

    getSpace(id: string)  {
        return this.spaces.find(space => space.id === id);
    }

    addWidget(spaceId: string, widgetId: string) {
        const space = this.getSpace(spaceId);
        if (space) {
            space.widgets.push(widgetId);
        }
    }

    removeWidget(spaceId: string, widgetId: string) {
        const space = this.getSpace(spaceId);
        if (space) {
            space.widgets = space.widgets.filter(widget => widget !== widgetId);
        }
    }

}
