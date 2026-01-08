import {Middleware} from "../base/Middleware.ts";
import type {ChangeIntersectionAction, ChangeSpaceAction, CreateSpaceAction, SpaceUpdateAction} from "../actions.ts";

import {IntersectionSpaceHandler} from "../modules/core/IntersectionSpaceHandler.ts";
import type {AppData} from "../app/appData.ts";
import type {IEvents} from "../base";

export class IntersectionMiddleware extends Middleware {
    private readonly intersectionSpaceHandler;
    constructor(events: IEvents, store: AppData) {
        super(events, store);
        this.intersectionSpaceHandler= new IntersectionSpaceHandler(this.store)
    }
    override register() {
        this.intersectionSpaceHandler.onSpaceChange((currentSpace, metrics) => {
            this.events.emit<ChangeSpaceAction>("change-space", {spaceId: metrics[currentSpace].element.id});
            console.log("Space changed", metrics[currentSpace].element.id);
        });

        document.addEventListener("scroll", () => {
            const intersectionRatio = this.intersectionSpaceHandler.getSpaceMetrics();
            this.events.emit<ChangeIntersectionAction>("change-intersection", { spaceMetrics: intersectionRatio });
        });

        this.events.on<SpaceUpdateAction>("spaces-updated", () => {
            this.intersectionSpaceHandler.fetchSpaces(this.store);
        });
    }
}