import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { EntityType, type IWidget } from "@/types.ts";
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
    const widgetInfo = useSelector((state: RootState): IWidget => selectWidget(state, props.widgetCardId));
    const { title, preview, type } = widgetInfo;
    const dispatch = useDispatch();

    const handleAddWidget = useCallback(() => {
        dispatch(addWidget({ spaceId: currentSpace, widgetId: widgetInfo.id }));
        dispatch(toggleItemsList(EntityType.WIDGETS));
    }, [widgetInfo.id, currentSpace]);

    return (
        <div
            className="stream-card widget-card"
            onClick={handleAddWidget}
            style={{cursor: "pointer"}}
        >
            <div className="cover-image">
                <div
                    className="disk"
                    style={{
                        backgroundImage: widgetInfo.preview ? `url('${widgetInfo.preview}')` : "none",
                    }}
                ></div>
            </div>
            <div className="card-content">
                <div className="name">{widgetInfo.title}</div>
                <div className="description">
                    <>
                        <div className="tracks-header">
                            <span className="track-count">
                                {widgetInfo.type}
                            </span>
                        </div>
                        <div className="tracks-view">
                            {/*{tracks.map((track, index) => (<div key={index} className="track-item">*/}
                            {/*        <span className="track-name">*/}
                            {/*            {extractFileName(track.path)}*/}
                            {/*        </span>*/}
                            {/*        <span className="track-duration">*/}
                            {/*            {formatDuration(track.duration)}*/}
                            {/*        </span>*/}
                            {/*    </div>))}*/}
                        </div>
                    </>
                </div>
            </div>
        </div>);
}
