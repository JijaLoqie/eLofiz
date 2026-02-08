import { useSelector } from "react-redux";
import { selectStreamParts } from "@/slices/StreamSlice.ts";
import type { RootState } from "@/index.tsx";
import type { IStreamPart } from "@/types.ts";
import { StreamCardPart } from "@/components/Stream/StreamEditor/StreamCardPart.tsx";

export const StreamCardPartList = (props: {streamId: string}) => {
    const {streamId} = props;
    const streamParts = useSelector((state: RootState): string[] => selectStreamParts(state, streamId));
    return (
        <>
            {streamParts.map(streamPartId => <StreamCardPart key={streamPartId} parentId={streamId} id={streamPartId} />)}
        </>
    )
}