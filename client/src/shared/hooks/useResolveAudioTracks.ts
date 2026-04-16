import { useState, useEffect, useCallback } from "react";
import { getAudioDuration } from "../StreamEditor";
import type { IAudio } from "@/shared/types.ts";

export const useResolveAudioTracks = (
    audios: IAudio[] | undefined
) => {
    const [tracks, setTracks] = useState<IAudio[]>([]);
    const [totalDuration, setTotalDuration] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Guard against undefined or empty audios
        if (!audios || audios.length === 0) {
            setTracks([]);
            setTotalDuration(0);
            return;
        }

        setIsLoading(true);
        setError(null);

        const resolveAudioTracks = async (): Promise<IAudio[]> => {
            const result: IAudio[] = [];
            const visited = new Set<string>();

            for (const audio of audios) {
                // Safety checks
                if (!audio || typeof audio !== "object" || !audio.id) {
                    console.warn("Invalid audio object:", audio);
                    continue;
                }

                if (visited.has(audio.id)) continue;
                visited.add(audio.id);

                // If duration is already set, use it
                if (audio.duration > 0) {
                    result.push(audio);
                    continue;
                }

                // Otherwise, fetch the duration
                try {
                    const duration = await getAudioDuration(audio.url);
                    result.push({
                        ...audio,
                        duration,
                    });
                } catch (err) {
                    console.warn(
                        `Failed to get duration for ${audio.name}:`,
                        err
                    );
                    // Add audio with duration 0 if fetching fails
                    result.push(audio);
                }
            }

            return result;
        };

        (async () => {
            try {
                const resolved = await resolveAudioTracks();
                setTracks(resolved);
                setTotalDuration(
                    resolved.reduce((sum, audio) => sum + audio.duration, 0)
                );
            } catch (err) {
                const error = err instanceof Error ? err : new Error(String(err));
                setError(error);
                console.error("Error resolving audio tracks:", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [audios]);

    return { tracks, totalDuration, isLoading, error };
};