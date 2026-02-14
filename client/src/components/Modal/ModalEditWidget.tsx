import React, { useState, useCallback, useRef, useEffect, createContext } from "react";
import { EntityType, type IModalEditWidget, type IPreset, type IStream, type IWidget } from "@/types.ts";
import StreamEditor from "@/components/Stream/StreamEditor/StreamEditor.tsx";
import { useDispatch, useSelector } from "react-redux";
import { closeEditor } from "@/slices/ModalSlice.ts";
import type { RootState } from "@/index.tsx";
import { selectStream, setEditingStream } from "@/slices/StreamSlice.ts";

interface ModalEditWidgetProps {
}

export const ModalEditWidget: React.FC<ModalEditWidgetProps> = () => {
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const currentType = useSelector((state: RootState) => state.modal.entityType);
    const currentEntityId = useSelector((state: RootState) => state.modal.currentEntityId)
    const dispatch = useDispatch();

    const stream = useSelector((state: RootState) =>
        selectStream(state, currentEntityId)
    );

    useEffect(() => {
        if (stream !== undefined) {
            dispatch(setEditingStream(stream))
        }
    }, [dispatch, stream]);

    const handleCloseClick = useCallback(() => {
        dispatch(closeEditor());
    }, [dispatch]);

    const renderEditor = () => {
        switch (currentType) {
            case EntityType.WIDGETS:
            case EntityType.PRESETS:
            case EntityType.STREAMS:
                return (
                    <StreamEditor
                        streamId={currentEntityId}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div
            id="modal-edit"
            className={`modal edit ${isOpen ? "open" : ""}`}
            style={{ display: isOpen ? "block" : "none", zIndex: 1000 }}
        >
            <span
                className={`
                absolute 
                top-5 
                right 4 
                rounded-full 
                bg-red-300
                flex 
                aspect-square 
                h-4 justify-center 
                items-center
                shadow-[2px_2px_4px_#f00,-2px_-2px_4px_#f00]
                `}
                onClick={handleCloseClick}
            >
            </span>
            <div className="wrapper">
                {renderEditor()}
            </div>
            <div className="wrapper" data-type="modal-actions"></div>
        </div>
    );
};

export default ModalEditWidget;