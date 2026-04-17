import type { ILocalStore } from "@/shared/hooks/use-local-store.ts";
import type { SpaceMetrics } from "@/shared/hooks/useIntersectionSpaceHandler.ts";
import { makeAutoObservable } from "mobx";

export class SpaceIntersectionStore implements ILocalStore {
    _currentSpace: string = "";
    _spaceMetrics: Record<string, SpaceMetrics> = {}

    constructor() {
        makeAutoObservable(this);
    }

    public setCurrentSpace(spaceId: string) {
        this._currentSpace = spaceId;
    };
    public updateSpaceMetrics(newMetrics: Record<string, SpaceMetrics>) {
        this._spaceMetrics = {...newMetrics};
    };
    public getSpaceMetrics(spaceId: string) {
        return this._spaceMetrics[spaceId];
    }
    get currentSpaceId() {
        return this._currentSpace;
    }
    destroy() {}
}