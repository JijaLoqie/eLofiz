import { useCallback } from "react";

export const useAudioFileUtils = () => {
    const isAudioFile = useCallback((path: string): boolean => {
        return [".mp3", ".m4a", ".wav", ".ogg", ".flac", ".aac"].some((ext) =>
            path.toLowerCase().endsWith(ext)
        );
    }, []);

    const extractFileName = useCallback((path: string): string => {
        return path.split("/").pop()?.replace(/\.[^/.]+$/, "") || path;
    }, []);

    const formatDuration = useCallback((ms: number): string => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    }, []);

    return { isAudioFile, extractFileName, formatDuration };
};