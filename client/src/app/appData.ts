import SpaceView from "../components/Space/SpaceView.ts";
import type {IEvents} from "../base";
import type {SpaceUpdateAction} from "../actions.ts";


export class AppData implements ISpaceSelector {
    private readonly spaces: Map<string, SpaceView> = new Map<string, SpaceView>();


    constructor(private readonly events: IEvents) {}

    getSpaces(): Map<string, SpaceView> {
        return this.spaces;
    }

    setSpace(key: string, space: SpaceView): void {
        this.spaces.set(key, space);
        this.events.emit<SpaceUpdateAction>("spaces-updated");
    }



}

export interface ISpaceSelector {
    getSpaces: () =>  Map<string, SpaceView>;
    setSpace: (key: string, space: SpaceView) => void;
}
