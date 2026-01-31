import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/index.ts";
import { selectStream } from "@/slices/StreamSlice.ts";
import { openEditor } from "@/slices/ModalSlice.ts";
import { EntityType } from "@/types.ts";
import { useCallback } from "react";

export const useStreamData = (streamId: string) => {
    const dispatch = useDispatch();

    // Get stream from store by ID
    const stream = useSelector((state: RootState) =>
        selectStream(state, streamId)
    );

    const handleOpenEditor = useCallback(() => {
        dispatch(
            openEditor({
                entityType: EntityType.STREAMS,
                entityId: streamId,
            })
        );
    }, [dispatch, streamId]);

    return { stream, handleOpenEditor };
};