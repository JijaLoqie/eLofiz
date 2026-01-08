import SpaceView from "../../components/Space/SpaceView.ts";
import type {ISpaceSelector} from "../../app/appData.ts";
import type {IEvents} from "../../base";
import type {ISpace} from "../../types.ts";
import {ensureElement} from "../../utils";


const defaultSpaces: ISpace[] = [
    {name: "main", background: 'startBackground.jpeg', fixed: false, widgets: []},
    {name: "work", background: 'startWorkBackground.gif', fixed: true, widgets: []},
];

export class SpaceManager implements ISpaceManager {
    constructor(private readonly events: IEvents, private readonly spaceStore: ISpaceSelector) {
        defaultSpaces.forEach((space) => this.createSpace(space.name, space));
    }

    createSpace(spaceName: string, space: Partial<ISpace> = {}): SpaceView {
        if (this.spaceStore.getSpaces().has(spaceName)) {
            throw new Error(`Space ${spaceName} already exists`);
        }
        const spaceView = new SpaceView(this.events);
        const spaceHTML = spaceView.render({ ...space, name: spaceName});
        spaceHTML.id = spaceName;
        document.body.appendChild(spaceHTML);

        this.spaceStore.getSpaces().set(spaceName, spaceView);
        console.log("SPACE ADDED: ", this.spaceStore.getSpaces());
        return spaceView;
    }

    deleteSpace(spaceId: string) {
        const spaceView = this.spaceStore.getSpaces().get(spaceId);
        if (spaceView) {
            const spaceHTML = ensureElement(`#${spaceId}`);
            spaceHTML.remove();

            this.spaceStore.getSpaces().delete(spaceId);
        } else {
            throw new Error(`Space ${spaceId} not found`);
        }
    }

    renameSpace(spaceId: string, newName: string) {
        this.deleteSpace(spaceId);
        this.createSpace(newName);
    }

}


interface ISpaceManager {
    createSpace(spaceName: string, space?: ISpace): SpaceView
    deleteSpace(spaceId: string): void
    renameSpace(spaceId: string, newName: string): void
}