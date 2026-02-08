import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { type WidgetInstance, WidgetType } from "@/types.ts";
import { useCallback, useRef } from "react";
import { selectWidget } from "@/slices/WidgetSlice.ts";
import { useDragHandler } from "@/components/hooks/useDragHandler.ts";
import { removeWidget } from "@/slices/SpaceSlice.ts";
import { selectCurrentSpace } from "@/slices/IntersectionSlice.ts";
import { BackgroundWidget } from "@/components/Widget/custom/BackgroundWidget/BackgroundWidget.tsx";
import { PlayerWidget } from "@/components/Widget/custom/PlayerWidget.tsx";
import { AudioVisualizerWidget } from "@/components/Widget/custom/AudioVisualizerWidget.tsx";




interface WidgetProps {
    widgetInstance: WidgetInstance;
}

export const Widget = (props: WidgetProps) => {
    const {widgetId, spaceId} = props.widgetInstance;
    const currentSpace = useSelector((state: RootState) => selectCurrentSpace(state));
    const widgetInfo = useSelector((state: RootState) => selectWidget(state, widgetId));
    const headerRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    useDragHandler(
        {
            // @ts-ignore
            selectElementRef: headerRef,
            // @ts-ignore
            dragElementRef: rootRef,
            options: {
            }
        }
    );

    const renderWidget = useCallback(() => {
        switch (widgetInfo.type) {
            case WidgetType.BACKGROUND:
                return <BackgroundWidget spaceId={spaceId} />
            case WidgetType.MUSIC:
                return <PlayerWidget spaceId={spaceId} />
            case WidgetType.AUDIO_VISUALIZER:
                return <AudioVisualizerWidget spaceId={spaceId} />
        }
    }, [widgetInfo.type, widgetInfo.id]);

    const handleClose = useCallback(() => {
        dispatch(removeWidget({
            widgetInstanceId: props.widgetInstance.id,
            spaceId: currentSpace,
        }));
    }, [])

    return (
        <div ref={rootRef} className="widget liquidGlass-effect resizable-wrapper">
            <div ref={headerRef} className="widget__header">
                <button
                        className="button"
                        data-type="close"
                        aria-label="Close widget"
                        onClick={handleClose}>
                    &times;
                </button>
            </div>
            <div className="widget__content">
                {renderWidget()}
            </div>
        </div>
    );
};