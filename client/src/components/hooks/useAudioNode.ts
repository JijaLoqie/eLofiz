import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ensureElement } from "@/utils";
import { useSelector } from "react-redux";
import { selectStream } from "@/slices/StreamSlice.ts";
import type { RootState } from "@/index.tsx";
import type { IStream } from "@/types.ts";

export const useAudioNode = (props: {spaceId: string, streamId: string}) => {
    const {spaceId, streamId} = props;
    const stream = useSelector((state: RootState): IStream | undefined => selectStream(state, streamId))
    const audioNode = useRef(ensureElement<HTMLAudioElement>(`#${spaceId} audio`));
    const [isPlaying, setPlaying] = useState(!audioNode.current.paused);
    const [currentTime, _setCurrentTime] = useState(audioNode.current.currentTime);
    const [volume, _setVolume] = useState(audioNode.current.volume);





    useEffect(() => {
        if (!audioNode.current || audioNode.current.src) return;
        audioNode.current.src = stream?.audios[0]!
    }, [audioNode.current, stream?.audios]);



    const toggle = useCallback(() => {
        if (!audioNode.current) return;
        setPlaying((wasPlaying) => {
            if (wasPlaying) audioNode.current.pause();
            else audioNode.current.play();
            return !wasPlaying;
        })

    }, [audioNode.current]);
    const setCurrentTime = useCallback((newTime: number) => {
        if (!audioNode.current) return;
        _setCurrentTime(_oldTime => {
            const duration = audioNode.current.duration;
            newTime = Math.max(Math.min(newTime, duration), 0);
            audioNode.current.currentTime = newTime;
            return newTime;
        })
    }, [audioNode.current]);

    useEffect(() => {
        if (!audioNode.current) return;
        audioNode.current.ontimeupdate = (e) => {
            _setCurrentTime(audioNode.current.currentTime);
        }
        audioNode.current.onended = (e) => {
            setCurrentTime(0);
            setPlaying(false);
        }
    }, [audioNode.current]);


    const setVolume = useCallback((newVolume: number) => {
        if (!audioNode.current) return;
        _setVolume(_oldVolume => {
            audioNode.current.volume = newVolume;
            return newVolume;
        })
    }, [audioNode.current]);

    const next = useCallback(() => {
        if (!audioNode.current) return;
        const breakpoints = stream?.breakpoints || [];
        let i = 0;
        while (i < breakpoints.length && breakpoints[i] < currentTime * 1000) i++;
        if (i === breakpoints.length) {
            setCurrentTime(audioNode.current.duration);
        } else {
            setCurrentTime(breakpoints[i] / 1000);
        }


    }, [audioNode.current, currentTime, stream?.breakpoints, setCurrentTime]);


    const prev = useCallback(() => {
        if (!audioNode.current) return;
        const breakpoints = stream?.breakpoints || [];
        let i = 0;
        while (i < breakpoints.length && breakpoints[i] + 1000 < currentTime * 1000) i++;
        if (i === 0) {
            setCurrentTime(0);
        } else {
            setCurrentTime(breakpoints[i - 1] / 1000);
        }

    }, [audioNode.current, stream?.breakpoints, currentTime, setCurrentTime]);

    const canPrev = useMemo(() => {
        if (!audioNode.current || stream?.breakpoints.length) return false;
        const breakpoints = stream?.breakpoints || [];
        return currentTime > breakpoints[0];
    }, [audioNode.current, stream?.breakpoints]);

    const canNext = useMemo(() => {
        if (!audioNode?.current || stream?.breakpoints.length) return false;
        const breakpoints = stream?.breakpoints || [];
        return currentTime >= breakpoints[breakpoints.length - 1];
    }, [currentTime, stream?.breakpoints]);



    return {
        volume, setVolume,
        next, prev, canPrev, canNext,
        toggle, isPlaying,
        currentTime, setCurrentTime
    }
}