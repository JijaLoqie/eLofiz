import {ensureElement} from "../../utils";

class SpaceApi implements ISpaceApi {
    getMusicNode(spaceId: string): HTMLAudioElement {
        const space = this.getRequiredSpace(spaceId);
        return ensureElement<HTMLAudioElement>(".space__music", space);
    }
    getBackgroundNode(spaceId: string): HTMLDivElement {
        const space = this.getRequiredSpace(spaceId);
        return space as HTMLDivElement;
    }


    private getRequiredSpace(spaceId: string): HTMLElement {
        const space = ensureElement(`#${spaceId}`);
        if (space) {
            return space;
        } else {
            throw new Error(`Space ${spaceId} not found`);
        }
    }
}

interface ISpaceApi {
    getMusicNode(spaceId: string): HTMLAudioElement;
    getBackgroundNode(spaceId: string): HTMLDivElement;
}

export const spaceApi = new SpaceApi();