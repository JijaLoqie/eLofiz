import {useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { removeStreamParts, selectStreamPartInfo } from "@/slices/StreamSlice.ts";
import type { IStreamPart } from "@/types.ts";

export const StreamCardPart = (props: {parentId: string, id: string}) => {
    const { id, parentId } = props;
    const streamPartInfo = useSelector((state: RootState): IStreamPart => selectStreamPartInfo(state, id));
    const {title, type} = streamPartInfo;
    const dispatch = useDispatch();

    const handleRemove = useCallback((id: string) => {
        dispatch(removeStreamParts({streamId: parentId, partId: id}));
    }, [dispatch, parentId, id]);

    return (
        <div className="stream-card-part" data-id={id}>
            <div className="title">{title}</div>
            <div className="cover"></div>
            <div className="information">
                <div className="type">{type}</div>
                <div className="duration"></div>
            </div>
            <div className="button" data-type="remove" onClick={() => handleRemove(id)}>X</div>
        </div>
    )
}