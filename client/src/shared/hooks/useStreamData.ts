import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/index.ts";
import { selectStream } from "@/entities/stream/model/StreamSlice.ts";
import { use, useCallback, useEffect } from "react";
import { EditorContext } from "@/features/Modal/EditorProvider.tsx";

export const useStreamData = (streamId: string) => {
    const editorContext = use(EditorContext);
    const stream = useSelector((state: RootState) => selectStream(state, streamId));


    const handleOpenEditor = useCallback(() => {
        if (stream) {
            editorContext?.handleOpen(stream);
        }
    }, [stream]);

    return { stream, handleOpenEditor };
};