import { type ISpace } from './types.ts';
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

}
