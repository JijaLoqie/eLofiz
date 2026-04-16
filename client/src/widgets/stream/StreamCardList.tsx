import { StreamCard } from "@/widgets/stream/StreamCard.tsx";
import { useSelector } from "react-redux";
import { selectStreams } from "@/entities/stream/model/StreamSlice.ts";
import type { RootState } from "@/index.tsx";
import type { IStream } from "@/shared/types.ts";

export const StreamCardList = () => {
    const streams = useSelector((state: RootState): Record<string, IStream> => selectStreams(state));
    return (
        <div className="items-list">
            {Object.keys(streams).map((streamId) => (
                <StreamCard key={streamId} streamId={streamId} />
            ))}
        </div>
    );
};