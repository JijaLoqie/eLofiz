import { EntityType } from "@/types.ts";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { StreamCardList } from "@/components/Stream/StreamCardList.tsx";

export const ModalListWidget = () => {
    const entityType = useSelector((state: RootState) => state.modal.entityType);
    const currentSpace = useSelector((state: RootState) => state.intersection.currentSpace);
    const [extended, setExtended] = useState(false);

    const renderList = () => {
        switch (entityType) {
            case EntityType.WIDGETS:
            case EntityType.PRESETS:
            case EntityType.STREAMS:
                return (
                    <StreamCardList />
                );
            default:
                return null;
        }
    };

    const handleToggleOpen = useCallback((() => {
        setExtended(old => !old)
    }), [])

    return (
        <div id="modal-menu" className={`modal ${extended ? "open-preset" : ""}`}>
            <div className="header">
                <div className="modal__currentSpace-info">
                    <span className="modal__currentSpace-label">Текущее пространство:</span>
                    <span className="modal_currentSpace-name">{currentSpace}</span>
                </div>
            </div>
            {renderList()}
            <div className="button" onClick={handleToggleOpen}>Раскрыть</div>
        </div>
        )
        }