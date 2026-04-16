import type { ILocalStore } from "@/shared/hooks/use-local-store.ts";
import { SpaceListStore } from "@/entities/space/model/store/SpaceListStore.ts";


export class SpacesPageStore implements ILocalStore {
    public spaceListStore: SpaceListStore;

    constructor() {
        this.spaceListStore = new SpaceListStore();
    }


    destroy() {
        this.spaceListStore.destroy();
    };

}