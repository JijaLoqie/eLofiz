import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { EntityType, type IWidget, WidgetType } from "@/types.ts";
import { selectWidget } from "@/slices/WidgetSlice.ts";
import { useCallback } from "react";
import { toggleItemsList } from "@/slices/ModalSlice.ts";
import { selectCurrentSpace } from "@/slices/IntersectionSlice.ts";
import { addWidget } from "@/slices/SpaceSlice.ts";

interface WidgetCardProps {
    widgetCardId: string;
}

export const WidgetCard = (props: WidgetCardProps) => {
    const currentSpace = useSelector((state: RootState) => selectCurrentSpace(state));
    const widgetInfo = useSelector((state: RootState): IWidget => selectWidget(state, props.widgetCardId))
    const {title, type} = widgetInfo;
    const dispatch = useDispatch();

    const handleAddWidget = useCallback(() => {
        dispatch(addWidget({spaceId: currentSpace, widgetId: widgetInfo.id}));
        dispatch(toggleItemsList(EntityType.WIDGETS));
    }, [type, title, widgetInfo.id, currentSpace]);

    return (
        <div className="widget-preview">
            <div className="button" onClick={handleAddWidget}>{title}</div>
        </div>
    )
}