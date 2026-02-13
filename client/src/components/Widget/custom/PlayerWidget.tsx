import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { selectSpace } from "@/slices/SpaceSlice.ts";
import { useAudioNode } from "@/components/hooks/useAudioNode.ts";
import type { IStream } from "@/types.ts";
import { selectStream } from "@/slices/StreamSlice.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatDuration } from "@/modules/StreamEditor";
import { playBeep } from "@/actions.ts";
import { useDurationQuery } from "@/api/StreamApi.ts";
import { useStreamData } from "@/components/hooks/useStreamData.ts";

interface PlayerWidgetProps {
    spaceId: string;
}

const getSlicedTitle = (title: string, maxLength: number = 15, offset: number = 0): string => {
    let newTitle = title + " | " + title
    if (title.length <= maxLength) return title;
    offset %= newTitle.length
    return newTitle.slice(offset, offset + maxLength + 2);
};

export const PlayerWidget = (props: PlayerWidgetProps) => {
    const space = useSelector((state: RootState) => selectSpace(state, props.spaceId));
    const stream = useSelector((state: RootState): IStream | undefined => selectStream(state, space.streamId))
    const { data: duration = 0, isLoading } = useDurationQuery(space.streamId);
    const { handleOpenEditor } = useStreamData(space.streamId);
    const dispatch = useDispatch();
    const [titleOffset, setTitleOffset] = useState(0);

    const {
        volume, setVolume,
        prev, next,
        toggle, isPlaying,
        currentTime, setCurrentTime
    } = useAudioNode({
        spaceId: space.id,
        streamId: space.streamId,
    });

    const handleClick = useCallback((callback: () => void) => {
        dispatch(playBeep());
        callback();
    }, []);

    const currentTimeView = useMemo(() => {
        return formatDuration(currentTime * 1000);
    }, [currentTime]);
    const durationView = useMemo(() => {
        return formatDuration(duration);
    }, [duration]);

    const volumeUp = useCallback(() => {
        setVolume(Math.min(volume + 0.05, 1));
    }, [volume, setVolume]);

    const volumeDown = useCallback(() => {
        setVolume(Math.max(volume - 0.05, 0));
    }, [volume, setVolume]);

    const plus30Sec = useCallback(() => {
        setCurrentTime(currentTime + 30);
    }, [setCurrentTime, currentTime]);
    const min30Sec = useCallback(() => {
        setCurrentTime(currentTime - 30);
    }, [setCurrentTime, currentTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleOffset(prev => {
                // Loop back to start when we reach the end
                const maxOffset = (stream?.name || "").length;
                return (prev + 1) % (maxOffset > 15 ? maxOffset : 15);
            });
        }, 1000); // 1 second interval

        return () => clearInterval(interval);
    }, [stream?.name]);


    return (
        <div className="music-player" >
            <div className="info flex justify-between">
                <div className="flex justify-start title w-[15ch]">{stream?.name ? getSlicedTitle(stream?.name, 15, titleOffset) : "Loading..."}</div>
                <div className="button playlist" onClick={handleOpenEditor}>
                    [playlist]
                </div>
            </div>
            <div className="navigation">
                <div className="button" data-type="previous" onClick={() => handleClick(prev)} aria-label="Previous track">
                    [prev]
                </div>
                <div className="button" data-type="back" onClick={() => handleClick(min30Sec)}>
                    [-30]
                </div>
                <div className="button play" data-type="play" onClick={() => handleClick(toggle)}>
                    {isPlaying ? "[stop]" : "[play]"}
                </div>
                <div className="button" data-type="forward" onClick={() => handleClick(plus30Sec)}>
                    [+30]
                </div>
                <div className="button" data-type="next" aria-label="Next track" onClick={() => handleClick(next)}>
                    [next]
                </div>
            </div>
            <div className="controls">
                <span className="progress">{currentTimeView} / {durationView}</span>
                <div className="flex-1 p-0 flex justify-end">
                    <div className="button" data-type="volume-decrease" aria-label="Decrease volume" onClick={() => handleClick(volumeDown)}>
                        [v-]
                    </div>
                    <span className="volume w-[6ch]">{Math.round(volume * 100)} %</span>
                    <div className="button" data-type="volume-increase" aria-label="Increase volume" onClick={() => handleClick(volumeUp)}>
                        [v+]
                    </div>
                </div>
            </div>
        </div>
    )
}