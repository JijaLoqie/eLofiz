import { EntityType } from "@/shared/types.ts";
import React, { use } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { StreamCardList } from "@/widgets/stream/StreamCardList.tsx";
import { PresetCardList } from "@/widgets/preset/PresetCardList.tsx";
import { WidgetCardList } from "@/widgets/widget/WidgetCardList.tsx";
import { selectCurrentSpace } from "@/pages/spaces/model/IntersectionSlice.ts";
import { selectSpace } from "@/entities/space/model/SpaceSlice.ts";
import { ModalContext } from "@/features/Modal/ModalProvider.tsx";

export const ModalListWidget = () => {
    const modalData = use(ModalContext);
    const entityType = modalData?.value;
    const currentSpaceId = useSelector((state: RootState) => selectCurrentSpace(state));
    const currentSpace = useSelector((state: RootState) => selectSpace(state, currentSpaceId));

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
                    <span className="modal_currentSpace-name">{currentSpace.name}</span>
                </div>
            </div>
            <div style={{paddingTop: "16px"}}>
                {renderList()}
            </div>
        </div>
    )
}