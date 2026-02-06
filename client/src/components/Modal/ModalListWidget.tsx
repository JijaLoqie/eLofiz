import { EntityType } from "@/types.ts";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { StreamCardList } from "@/components/Stream/StreamCardList.tsx";
import { PresetCardList } from "@/components/Preset/PresetCardList.tsx";
import { WidgetCardList } from "@/components/Widget/WidgetCardList.tsx";
import { selectCurrentSpace } from "@/slices/IntersectionSlice.ts";

export const ModalListWidget = () => {
    const entityType = useSelector((state: RootState) => state.modal.entityType);
    const currentSpace = useSelector((state: RootState) => selectCurrentSpace(state));

    const renderList = () => {
        switch (entityType) {
            case EntityType.WIDGETS:
                return <WidgetCardList />
            case EntityType.PRESETS:
                return (
                    <PresetCardList />
                )
            case EntityType.STREAMS:
                return (
                    <StreamCardList />
                );
            default:
                return null;
        }
    };


    return (
        <div id="modal-menu" className="modal">
            <div className="header">
                <div className="modal__currentSpace-info">
                    <span className="modal__currentSpace-label">Текущее пространство: </span>
                    <span className="modal_currentSpace-name">{currentSpace}</span>
                </div>
            </div>
            <div style={{paddingTop: "16px"}}>
                {renderList()}
            </div>
        </div>
    )
}