import { useState, useEffect, useCallback } from "react";
import { getAudioDuration } from "@/modules/StreamEditor";

export interface Track {
    path: string;
    duration: number;
}

export const useResolveAudioTracks = (
    audioPaths: string[] | undefined,
    isAudioFile: (path: string) => boolean
) => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [totalDuration, setTotalDuration] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Guard against undefined or empty paths
        if (!audioPaths || audioPaths.length === 0) {
            setTracks([]);
            setTotalDuration(0);
            return;
        }

        setIsLoading(true);
        setError(null);

        const resolveRecursively = async (
            paths: string[],
            visited = new Set<string>()
        ): Promise<Track[]> => {
            const result: Track[] = [];

            for (const audioPath of paths) {
                // Safety checks
                if (!audioPath || typeof audioPath !== "string") {
                    console.warn("Invalid audio path:", audioPath);
                    continue;
                }

                if (visited.has(audioPath)) continue;
                visited.add(audioPath);

                if (isAudioFile(audioPath)) {
                    try {
                        const duration = await getAudioDuration(audioPath);
                        result.push({
                            path: audioPath,
                            duration,
                        });
                    } catch (err) {
                        console.warn(
                            `Failed to get duration for ${audioPath}:`,
                            err
                        );
                    }
                }
            }

            return result;
        };

        (async () => {
            try {
                const resolved = await resolveRecursively(audioPaths);
                setTracks(resolved);
                setTotalDuration(
                    resolved.reduce((sum, t) => sum + t.duration, 0)
                );
            } catch (err) {
                const error = err instanceof Error ? err : new Error(String(err));
                setError(error);
                console.error("Error resolving audio tracks:", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [audioPaths, isAudioFile]);

    return { tracks, totalDuration, isLoading, error };
};