import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { selectSpace } from "@/slices/SpaceSlice.ts";
import { useAudioNode } from "@/components/hooks/useAudioNode.tsx";
import type { IStream } from "@/types.ts";
import { selectStream } from "@/slices/StreamSlice.ts";
import { useCallback, useMemo } from "react";
import { formatDuration } from "@/modules/StreamEditor";
import { playBeep } from "@/actions.ts";

interface PlayerWidgetProps {
    spaceId: string;
}


export const PlayerWidget = (props: PlayerWidgetProps) => {
    const space = useSelector((state: RootState) => selectSpace(state, props.spaceId));
    const stream = useSelector((state: RootState): IStream | undefined => selectStream(state, space.streamId))
    const dispatch = useDispatch();
    const {
        volume, setVolume,
        canPrev, canNext,
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


    return (
        <div className="music-player" >
            <div className="info">
                <div className="title">{stream?.name || "Loading..."}</div>
                <div className="button playlist" data-type="playlist" aria-label="Playlist">
                    [playlist]
                </div>
            </div>
            <div className="navigation">
                <button disabled={canPrev} className="button" data-type="previous" onClick={() => handleClick(prev)} aria-label="Previous track">
                    [prev]
                </button>
                <div className="button back" data-type="back" onClick={() => handleClick(min30Sec)}>
                    [-30]
                </div>
                <div className="button play" data-type="play" onClick={() => handleClick(toggle)}>
                    {isPlaying ? "[stop]" : "[play]"}
                </div>
                <div className="button forward" data-type="forward" onClick={() => handleClick(plus30Sec)}>
                    [+30]
                </div>
                <button disabled={canNext} className="button" data-type="next" aria-label="Next track" onClick={() => handleClick(next)}>
                    [next]
                </button>
            </div>
            <div className="controls">
                <span className="progress">{currentTimeView}</span>
                <div className="button v-minus" data-type="volume-decrease" aria-label="Decrease volume" onClick={() => handleClick(volumeDown)}>
                    [v-]
                </div>
                <span className="volume">{Math.round(volume * 100)} %</span>
                <div className="button v-increase" data-type="volume-increase" aria-label="Increase volume" onClick={() => handleClick(volumeUp)}>
                    [v+]
                </div>
                <div className="button" data-type="random" aria-label="Random">
                    [random]
                </div>
            </div>
        </div>
    )
}