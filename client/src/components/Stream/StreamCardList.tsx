import { StreamCard } from "@/components/Stream/StreamCard.tsx";
import { useSelector } from "react-redux";
import { selectStreams } from "@/slices/StreamSlice.ts";
import type { RootState } from "@/index.tsx";
import type { IStream } from "@/types.ts";

export const StreamCardList = () => {
    const streams = useSelector((state: RootState): Record<string, IStream> => selectStreams(state));
    return (
        <div className="items-list">
            <div data-type="items">
                {Object.keys(streams).map((streamId) => (
                    <StreamCard key={streamId} streamId={streamId} />
                ))}
            </div>
        </div>
    );
};