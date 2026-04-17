import { EntityType } from "@/shared/types.ts";
import React, { use } from "react";
import { StreamCardList } from "@/widgets/stream/StreamCardList.tsx";
import { PresetCardList } from "@/widgets/preset/PresetCardList.tsx";
import { WidgetCardList } from "@/widgets/widget/WidgetCardList.tsx";
import { ModalContext } from "@/features/Modal/ModalProvider.tsx";
import { observer } from "mobx-react-lite";
import { model } from "@/features/spaces-session";

export const ModalListWidget = observer(() => {
    const spaceListStore = model.useSpaceListStore();
    const modalData = use(ModalContext);
    const entityType = modalData?.value;
    const { currentSpaceId } = model.useIntersectionStore();
    const currentSpace = spaceListStore.getSpace(currentSpaceId);

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
})