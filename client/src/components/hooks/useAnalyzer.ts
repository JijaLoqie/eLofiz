import { audioState } from "@/middlewares/AudioMiddleware.ts";
import { useEffect, useEffectEvent, useMemo, useRef } from "react";

interface useAnalyzerProps {
    spaceId: string;
    fftSize: number,
}


export const useAnalyzer = (props: useAnalyzerProps) => {
    const {spaceId, fftSize} = props;
    const analyser = useRef<AnalyserNode>(null)


    useEffect(() => {
        if (analyser.current) return;
        const gainNode = audioState.items[spaceId].gainNode;
        analyser.current = audioState.audioContext.createAnalyser();
        analyser.current.smoothingTimeConstant = 0.8;
        gainNode.connect(analyser.current);
    }, []);

    useEffect(() => {
        if (!analyser.current) return;
        analyser.current.fftSize = fftSize;
    }, [analyser.current, fftSize]);



    return { analyser: analyser }

}