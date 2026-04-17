import React, { type FC, use, useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { formatDuration } from "@/shared/StreamEditor";
import { EditorContext } from "@/features/Modal/EditorProvider.tsx";
import { getDuration } from "@/shared/lib/getDuration.ts";

interface StreamTimelineProps {
}

export const StreamTimeline: FC<StreamTimelineProps> = () => {
    const stream = use(EditorContext)?.stream;

    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (stream) {
            getDuration(stream).then(setDuration).catch(console.error);
        }
    }, [stream]);

    const breakpoints = useMemo(() => {
        return stream?.breakpoints || []
    }, [stream?.breakpoints]);

    return (
        <>
            <div
                className="stream-editor__timeline"
                data-component="timeline"
            >
                {
                    duration === 0 ? (<div className="m-auto text-white">
                            <div className="m-auto text-white">Loading...</div>
                        </div>) : breakpoints.map((time, index) => (
                        <Breakpoint key={`${time}-${index}`} time={time} duration={duration} />
                    ))
                }
            </div>
        </>)
}

export const Breakpoint: FC<{time: number, duration: number}> = (props) => {
    const editorData = use(EditorContext);
    const stream = editorData?.stream;
    const handleUpdate = editorData?.handleUpdate;

    const { duration } = props;
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
        handleUpdate?.({breakpoints: newBreakpoints});
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