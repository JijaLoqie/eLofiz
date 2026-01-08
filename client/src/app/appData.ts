import { type IEvents } from '../base';
import SpaceView from "../components/Space/SpaceView.ts";


export class AppData implements ISpaceSelector {
    private readonly spaces: Map<string, SpaceView> = new Map<string, SpaceView>();

    getSpaces(): Map<string, SpaceView> {
        return this.spaces;
    }

}

export interface ISpaceSelector {
    getSpaces: () =>  Map<string, SpaceView>
}
