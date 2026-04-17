import { getAudioDuration } from "@/shared/StreamEditor";
import type { IStream } from "@/shared/types.ts";

export const getDuration = async (stream: IStream) => {
    try {
        const audioLinks: string[] = (stream?.audios || []).map(audio => audio.url);
        const durations = await Promise.all(
            audioLinks.map(audioLink => getAudioDuration(audioLink))
        );

        return durations.reduce((total, duration) => total + duration, 0);
    } catch (error) {
        throw Error(error instanceof Error ? error.message : 'Failed to fetch duration');
    }
};
