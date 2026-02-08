import React, { type FC, useCallback, useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { formatDuration } from "@/modules/StreamEditor";
import { useDurationQuery } from "@/api/StreamApi.ts";
import { useDragHandler } from "@/components/hooks/useDragHandler.ts";
import type { IStream } from "@/types.ts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { selectEditingStream, updateEditingStream } from "@/slices/StreamSlice.ts";

interface StreamTimelineProps {
}

export const StreamTimeline: FC<StreamTimelineProps> = () => {
    const stream = useSelector((state: RootState) => selectEditingStream(state));

    const {data: duration = 0, isLoading} = useDurationQuery(stream?.id || "");

    const breakpoints = useMemo(() => {
        return stream?.breakpoints || []
    }, [stream?.breakpoints]);



    // const audios = stream?.audios || [];

    return (
        <>
            <div
                className="stream-editor__timeline"
                data-component="timeline"
            >
                {
                    isLoading ? (
                        <div className="m-auto text-white">Loading...</div>
                    ) : duration === 0 ? (
                        <div className="m-auto text-white">Произошла ошибка</div>
                    ) : breakpoints.map((time, index) => (
                        <Breakpoint key={`${time}-${index}`} time={time} duration={duration} />
                    ))
                }
            </div>
        </>)
}

export const Breakpoint: FC<{time: number, duration: number}> = (props) => {
    const dispatch = useDispatch();
    const { duration } = props;
    const stream = useSelector((state: RootState) => selectEditingStream(state));
    const breakpointRef = useRef<HTMLDivElement>(null);

    const [currentTime, setCurrentTime] = useState(props.time);


    const breakpoints = useMemo(() => {
        return stream?.breakpoints || []
    }, [stream?.breakpoints]);

    const handleDragEnd = useEffectEvent(() => {
        let newBreakpoints = breakpoints.map((breakpoint) => {
            if (breakpoint === props.time) {
                return currentTime;
            } else {
                return breakpoint;
            }
        }).sort();
        console.log({newBreakpoints})
        dispatch(updateEditingStream({breakpoints: newBreakpoints}));
    });

    useDragHandler({
        // @ts-ignore
        selectElementRef: breakpointRef,
        // @ts-ignore
        dragElementRef: breakpointRef,
        options: {
            manual: true,
            onDragEnd: handleDragEnd,
            onDrag: (_e, offsetX, _offsetY) => {
                if (!breakpointRef.current?.parentElement) return;
                const clientWidth = breakpointRef.current.parentElement.clientWidth;
                setCurrentTime(offsetX * duration / clientWidth);
            },
        }
    });

    const percentTime = useMemo(() => `calc(${(currentTime / duration) * 100}%)`, [duration, currentTime]);
    const readableTime = useMemo(() => formatDuration(Math.round(currentTime)), [currentTime]);

    return (
        <div
            style={{left: percentTime}}
            className="stream-editor__breakpoint"
            ref={breakpointRef}
        >
            <div className="stream-editor__breakpoint-label">
                {readableTime}
            </div>
        </div>
    )
}