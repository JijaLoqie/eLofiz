import type { ILocalStore } from "@/shared/hooks/use-local-store.ts";
import { SpaceListStore } from "@/entities/space/model/store/SpaceListStore.ts";
import { SpaceIntersectionStore } from "@/features/spaces-intersection/model/store/SpaceIntersectionStore.ts";
import { SpaceAudioStore } from "@/features/audio/store/store.ts";


export class SpacesPageStore implements ILocalStore {
    public spaceListStore: SpaceListStore;
    public intersectionStore: SpaceIntersectionStore;
    public spaceAudioStore: SpaceAudioStore;

    constructor() {
        this.spaceListStore = new SpaceListStore();
        this.intersectionStore = new SpaceIntersectionStore();
        this.spaceAudioStore = new SpaceAudioStore();
    }


    destroy() {
        this.spaceListStore.destroy();
        this.intersectionStore.destroy();
        this.spaceAudioStore.destroy();
    };

}