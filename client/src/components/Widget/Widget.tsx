import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { type WidgetInstance } from "@/types.ts";
import { type JSX, useCallback, useMemo, useRef } from "react";
import { useDragHandler } from "@/components/hooks/useDragHandler.ts";
import { removeWidget } from "@/slices/SpaceSlice.ts";
import { selectCurrentSpace } from "@/slices/IntersectionSlice.ts";
import { BackgroundWidget } from "@/components/Widget/custom/BackgroundWidget/BackgroundWidget.tsx";
import { PlayerWidget } from "@/components/Widget/custom/PlayerWidget.tsx";
import { AudioVisualizerWidget } from "@/components/Widget/custom/AudioVisualizers/AudioVisualizerWidget.tsx";
import { CircleAudioVisualizerWidget } from "@/components/Widget/custom/AudioVisualizers/CircleAudioVisualizerWidget.tsx";
import { TextAudioVisualizerWidget } from "@/components/Widget/custom/AudioVisualizers/TextAudioVisualizerWidget.tsx";
import { YodaTimerWidget } from "@/components/Widget/custom/YodaTimerWidget.tsx";




interface WidgetProps {
    widgetInstance: WidgetInstance;
}

export const Widget = (props: WidgetProps) => {
    const {widgetId, spaceId} = props.widgetInstance;
    const currentSpace = useSelector((state: RootState) => selectCurrentSpace(state));
    // const widgetInfo = useSelector((state: RootState) => selectWidget(state, widgetId));
    const headerRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
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
    const widgets = useMemo<Record<string, JSX.Element>>(() => {
        return {
            "basic player": (<PlayerWidget spaceId={spaceId}/>),
            "basic redactor": <BackgroundWidget spaceId={spaceId}/>,
            "basic visualizer": <AudioVisualizerWidget spaceId={spaceId}/>,
            "circle visualizer": <CircleAudioVisualizerWidget spaceId={spaceId}/>,
            "text visualizer": <TextAudioVisualizerWidget spaceId={spaceId}/>,
            "yoda timer": <YodaTimerWidget spaceId={spaceId}/>,
        }
    }, [spaceId])

    const renderWidget = useCallback(() => {
        return widgets[widgetId]
    }, [widgets, widgetId]);

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
                        onClick={handleClose}
                        style={{display: "inline", paddingInline: "4px"}}
                >
                    &times;
                </button>
            </div>
            <div className="widget__content">
                {renderWidget()}
            </div>
        </div>
    );
};