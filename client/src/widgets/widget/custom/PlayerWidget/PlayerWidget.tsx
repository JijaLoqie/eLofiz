import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { selectSpace } from "@/entities/space/model/SpaceSlice.ts";
import { useAudioNode } from "@/shared/hooks/useAudioNode.ts";
import type { IStream } from "@/shared/types.ts";
import { selectStream } from "@/entities/stream/model/StreamSlice.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatDuration } from "../../../../shared/StreamEditor";
import { playBeep } from "@/shared/actions.ts";
import { useDurationQuery } from "@/entities/stream/api/StreamApi.ts";
import { useStreamData } from "@/shared/hooks/useStreamData.ts";
import { PlayerInfo } from "./PlayerInfo.tsx";
import { PlayerNavigation } from "./PlayerNavigation.tsx";
import { PlayerControls } from "./PlayerControls.tsx";
import { PlayerTimeline } from "./PlayerTimeline.tsx";

interface PlayerWidgetProps {
    spaceId: string;
}

export const PlayerWidget = (props: PlayerWidgetProps) => {
    const space = useSelector((state: RootState) => selectSpace(state, props.spaceId));
    const stream = useSelector((state: RootState): IStream | undefined => selectStream(state, space.streamId))
    const { data: duration = 0 } = useDurationQuery(space.streamId);
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
    }, [dispatch]);

    const currentTimeView = useMemo(() => formatDuration(currentTime * 1000), [currentTime]);
    const durationView = useMemo(() => formatDuration(duration), [duration]);

    const adjustVolume = useCallback((delta: number) => {
        setVolume(Math.max(0, Math.min(1, volume + delta)));
    }, [volume, setVolume]);

    const adjustTime = useCallback((delta: number) => {
        setCurrentTime(currentTime + delta);
    }, [setCurrentTime, currentTime]);

    const handleBreakpointClick = useCallback((timeInSeconds: number) => {
        setCurrentTime(timeInSeconds);
    }, [setCurrentTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleOffset(prev => {
                const maxOffset = (stream?.name || "").length;
                return (prev + 1) % (maxOffset > 20 ? maxOffset : 20);
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [stream?.name]);

    return (
        <div className="w-fit rounded-xl bg-[#1a1a1a] px-3 py-3 font-mono text-[#898989] shadow-2xl">
            <PlayerInfo
                streamName={stream?.name}
                titleOffset={titleOffset}
                onPlaylistClick={handleOpenEditor}
            />

            <PlayerNavigation
                isPlaying={isPlaying}
                onPrev={() => handleClick(prev)}
                onRewind={() => handleClick(() => adjustTime(-30))}
                onToggle={() => handleClick(toggle)}
                onForward={() => handleClick(() => adjustTime(30))}
                onNext={() => handleClick(next)}
            />

            <PlayerControls
                currentTime={currentTimeView}
                duration={durationView}
                volume={Math.round(volume * 100)}
                onVolumeDown={() => handleClick(() => adjustVolume(-0.05))}
                onVolumeUp={() => handleClick(() => adjustVolume(0.05))}
            />

            <PlayerTimeline
                currentTime={currentTime}
                duration={duration}
                breakpoints={stream?.breakpoints}
                onBreakpointClick={handleBreakpointClick}
            />
        </div>
    )
}

export default PlayerWidget;