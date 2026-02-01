import type {IEvents} from "@/base";
import {Middleware} from "../base/Middleware.ts";
import type {ChangeIntersectionAction} from "../actions.ts";
import {webAudioApi} from "../modules/WebAudioApi.ts";
import {spaceApi} from "../modules/core/SpaceApi.ts";
import type { SpaceMetrics } from "@/components/hooks/useIntersectionSpaceHandler.ts";

export class AudioManagerMiddleware extends Middleware {
    constructor(events: IEvents) {
        super(events);
    }
    override register() {
        this.events.on("space-created", (data: { spaceId: string }) => {
            webAudioApi.registerMediaElement(data.spaceId, spaceApi.getMusicNode(data.spaceId));
        })
        this.events.on<ChangeIntersectionAction>("change-intersection", (data: { spaceMetrics: Record<string, SpaceMetrics>}) => {
            const {spaceMetrics} = data;
            for (const metrics of Object.values(spaceMetrics)) {
                webAudioApi.setVolume(metrics.id, metrics.intersectionRatio);
            }
        })
    }
}