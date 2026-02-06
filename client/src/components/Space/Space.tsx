import { useDispatch, useSelector } from "react-redux";
import type { ISpace, WidgetInstance } from "@/types.ts";
import type { RootState } from "@/index.tsx";
import { selectSpace, selectWidgetsOnSpace } from "@/slices/SpaceSlice.ts";
import { Widget } from "@/components/Widget/Widget.tsx";
import { useCallback, useEffect, useRef } from "react";
import { registerAudio } from "@/actions.ts";
import { selectIntersectionMetrics } from "@/slices/IntersectionSlice.ts";
import { setVolume } from "@/middlewares/AudioMiddleware.ts";
import { trailingThrottle } from "@/utils/utils.ts";

interface SpaceProps {
    spaceId: string;
}


export const Space = (props: SpaceProps) => {
    const {spaceId} = props;
    const spaceInfo = useSelector((state: RootState): ISpace => selectSpace(state, spaceId));
    const widgets = useSelector((state: RootState): WidgetInstance[] => selectWidgetsOnSpace(state, `${spaceId}`));
    const spaceMetrics = useSelector((state: RootState) => selectIntersectionMetrics(state, spaceId))

    const htmlAudio = useRef<HTMLAudioElement>(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (htmlAudio.current) {
            dispatch(registerAudio({
                spaceId: spaceInfo.id,
            }))
        }
    }, [dispatch, htmlAudio.current]);

    const updateVolume = useCallback((newVolume: number) => {
        dispatch(setVolume({spaceId, volume: newVolume}))
    }, [dispatch, spaceId]);

    // Create throttled function once and memoize it
    const throttledUpdateVolume = useRef(trailingThrottle(updateVolume, 0)).current;

    useEffect(() => {
        if (spaceMetrics === undefined) return;

        throttledUpdateVolume(spaceMetrics.intersectionRatio);
    }, [spaceMetrics?.intersectionRatio, throttledUpdateVolume]);


    const { id, currentBackground, images, fixed } = spaceInfo;
    return (
        <div
            id={`${id}`}
            className={`space ${fixed ? "space--fixed" : ""}`}
            style={{backgroundImage:`url('${images[currentBackground].imageUrl}')`}}
        >
            <audio ref={htmlAudio} className="space__music">NaN</audio>
            {widgets.map((widInst) => <Widget widgetInstance={widInst} key={widInst.id} />)}
        </div>
    );
}