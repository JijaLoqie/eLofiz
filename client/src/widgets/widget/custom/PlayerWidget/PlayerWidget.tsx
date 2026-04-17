import { useAudioNode } from "@/shared/hooks/useAudioNode.ts";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { formatDuration } from "@/shared/StreamEditor";
import { PlayerInfo } from "./PlayerInfo.tsx";
import { PlayerNavigation } from "./PlayerNavigation.tsx";
import { PlayerControls } from "./PlayerControls.tsx";
import { PlayerTimeline } from "./PlayerTimeline.tsx";
import { model } from "@/features/spaces-session";
import { useStreamStore } from "@/features/preload-session/store";
import { observer } from "mobx-react-lite";
import { EditorContext } from "@/features/Modal/EditorProvider.tsx";
import { getDuration } from "@/shared/lib/getDuration.ts";

interface PlayerWidgetProps {
    spaceId: string;
}

export const PlayerWidget = observer((props: PlayerWidgetProps) => {
    const editorContext = use(EditorContext);
    const spaceListStore = model.useSpaceListStore();
    const spaceAudioStore = model.useSpaceAudioStore();
    const space = spaceListStore.getSpace(props.spaceId);
    const streamStore = useStreamStore();
    const stream = streamStore.getItem(space.streamId);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (stream) {
            getDuration(stream).then(setDuration).catch(console.error);
        }
    }, [stream]);

    const handleOpenEditor = useCallback(() => {
        if (stream) {
            editorContext?.handleOpen(stream);
        }
    }, [stream]);
    const [titleOffset, setTitleOffset] = useState(0);

    const {
        volume, setVolume,
        prev, next,
        toggle, isPlaying,
        currentTime, setCurrentTime
    } = useAudioNode({
        spaceId: space.id,
        stream,
    });

    const handleClick = useCallback((callback: () => void) => {
        spaceAudioStore.playBeep();
        callback();
    }, []);

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
});

export default PlayerWidget;