import { baseApi } from "@/utils/api";
import { getAudioDuration } from "@/modules/StreamEditor";
import type { RootState } from "@/index.tsx";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";


const StreamApi = baseApi.injectEndpoints({
    endpoints: (build => ({
        duration: build.query<number, string>({
            queryFn: async (streamId, { getState }) => {
                const rejectWithValue = (errorMessage: string) => ({
                    error: {
                        status: 400,
                        data: errorMessage
                    } as FetchBaseQueryError,
                })
                try {
                    const state = getState() as RootState;
                    const stream = state.stream.items[streamId];

                    if (!stream) {
                        return rejectWithValue('Stream not found');
                    }

                    const audioLinks: string[] = stream?.audios || [];
                    const durations = await Promise.all(
                        audioLinks.map(audioLink => getAudioDuration(audioLink))
                    );

                    const totalDuration = durations.reduce((total, duration) => total + duration, 0);
                    return { data: totalDuration };
                } catch (error) {
                    return rejectWithValue(
                        error instanceof Error ? error.message : 'Failed to fetch duration'
                    );
                }
            },
        })
    }))
});

export const { useDurationQuery } = StreamApi