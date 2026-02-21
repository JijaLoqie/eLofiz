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
            className={`
            absolute
            flex flex-col
            top-0 right-0
            max-w-[500px]
            bg-black
            ${isOpen ? "open" : ""}
            `}
            style={{ display: isOpen ? "block" : "none", zIndex: 1000 }}
        >
            <div className="relative h-fit min-h-12 flex">
                <div
                    className={
                    `h-12 aspect-square border-gray-500 text-white border-[1px] cursor-pointer flex justify-center items-center text-center`
                } onClick={handleCloseClick}
                >
                    &times;
                </div>
            </div>

            {renderEditor()}

            <div className="wrapper" data-type="modal-actions"></div>
        </div>
    );
};

export default ModalEditWidget;