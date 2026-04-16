import { useDispatch, useSelector } from "react-redux";
import type { ISpace, WidgetInstance } from "@/shared/types.ts";
import type { RootState } from "@/index.tsx";
import { selectSpace, selectWidgetsOnSpace } from "@/entities/space/model/SpaceSlice.ts";
import { Widget } from "@/widgets/widget/Widget.tsx";
import { createContext, useCallback, useEffect, useRef } from "react";
import { registerAudio } from "@/shared/actions.ts";
import { selectIntersectionMetrics } from "@/pages/spaces/model/IntersectionSlice.ts";
import { setVolume } from "@/shared/middlewares/AudioMiddleware.ts";
import { trailingThrottle } from "@/shared/utils.ts";

interface SpaceProps {
    spaceId: string;
}


export const SpaceContext = createContext<string>("");


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
        <SpaceContext.Provider value={spaceId}>
            <div
                id={`${id}`}
                className={`space ${fixed ? "space--fixed" : ""}`}
                style={{backgroundImage:`url('${images[currentBackground].imageUrl}')`}}
            >
                <audio ref={htmlAudio} className="space__music">NaN</audio>
                {widgets.map((widInst) => <Widget key={widInst.id} widgetInfoId={widInst.widgetId} widgetInstance={widInst} />)}
            </div>
        </SpaceContext.Provider>
    );
}