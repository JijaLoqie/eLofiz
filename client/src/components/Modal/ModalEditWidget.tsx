import React, { useState, useCallback, useRef } from "react";
import { EntityType, type IModalEditWidget } from "@/types.ts";
import StreamEditor from "@/components/Stream/StreamEditor.tsx";
import { useDispatch, useSelector } from "react-redux";
import { closeEditor } from "@/slices/ModalSlice.ts";
import type { RootState } from "@/index.tsx";

interface ModalEditWidgetProps {
}

export const ModalEditWidget: React.FC<ModalEditWidgetProps> = () => {
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const currentType = useSelector((state: RootState) => state.modal.entityType);
    const currentEntityId = useSelector((state: RootState) => state.modal.currentEntityId)
    const dispatch = useDispatch();

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
            className={`modal ${isOpen ? "open" : ""}`}
            style={{ display: isOpen ? "block" : "none", zIndex: 1000 }}
        >
            <div className="modal-header">
                <div
                    className="button"
                    data-type="close"
                    onClick={handleCloseClick}
                >
                    X
                </div>
            </div>
            <div className="wrapper" data-type="modal-content">
                {renderEditor()}
            </div>
            <div className="wrapper" data-type="modal-actions"></div>
        </div>
    );
};

export default ModalEditWidget;