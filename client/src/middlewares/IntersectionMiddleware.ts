import {Middleware} from "../base/Middleware.ts";
import type {SpaceUpdateAction} from "../actions.ts";

import {IntersectionSpaceHandler} from "../modules/core/IntersectionSpaceHandler.ts";
import type {AppData} from "@/app/appData.ts";
import type {IEvents} from "@/base";
import { appStore } from "@/app/appStore.ts";
import { setCurrentSpace, updateSpaceMetrics } from "@/slices/IntersectionSlice.ts";

export class IntersectionMiddleware extends Middleware {
    private readonly intersectionSpaceHandler;
    constructor(events: IEvents, store: AppData) {
        super(events, store);
        this.intersectionSpaceHandler= new IntersectionSpaceHandler(this.store)
    }
    override register() {
        this.intersectionSpaceHandler.onSpaceChange((currentSpace, metrics) => {
            appStore.dispatch(setCurrentSpace(metrics[currentSpace].id));
            // this.events.emit<ChangeSpaceAction>("change-space", {spaceId: metrics[currentSpace].element.id});
        });

        document.addEventListener("scroll", () => {
            const intersectionRatio = this.intersectionSpaceHandler.getSpaceMetrics();
            appStore.dispatch(updateSpaceMetrics(intersectionRatio));
            // this.events.emit<ChangeIntersectionAction>("change-intersection", { spaceMetrics: intersectionRatio });
        });

        this.events.on<SpaceUpdateAction>("spaces-updated", () => {
            this.intersectionSpaceHandler.fetchSpaces(this.store);
        });
    }
}