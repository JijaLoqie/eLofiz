import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { createContext, type JSX, type ReactNode, use, useCallback, useMemo, useRef } from "react";
import { useDragHandler } from "@/components/hooks/useDragHandler.ts";
import { removeWidget } from "@/slices/SpaceSlice.ts";
import { selectCurrentSpace } from "@/slices/IntersectionSlice.ts";
import { BackgroundWidget } from "@/components/Widget/custom/BackgroundWidget/BackgroundWidget.tsx";
import { PlayerWidget } from "@/components/Widget/custom/PlayerWidget/PlayerWidget.tsx";
import { AudioVisualizerWidget } from "@/components/Widget/custom/AudioVisualizers/AudioVisualizerWidget.tsx";
import { CircleAudioVisualizerWidget } from "@/components/Widget/custom/AudioVisualizers/CircleAudioVisualizerWidget.tsx";
import { TextAudioVisualizerWidget } from "@/components/Widget/custom/AudioVisualizers/TextAudioVisualizerWidget.tsx";
import { YodaTimerWidget } from "@/components/Widget/custom/YodaTimerWidget.tsx";
import { PomodoroTimerWidget } from "@/components/Widget/custom/PomodoroTimerWidget.tsx";
import type { WidgetInstance } from "@/types.ts";
import { SpaceContext } from "@/components/Space/Space.tsx";

interface WidgetProps {
    widgetInfoId: string;
    widgetInstance?: WidgetInstance;
}

export const Widget = (props: WidgetProps) => {
    const {widgetInfoId, widgetInstance} = props;

    const headerRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const spaceId = use(SpaceContext);

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

    const renderWidget = (id: string) => {
        switch (id) {
            case "basic player": {return (<PlayerWidget spaceId={spaceId} />)}
            case "basic redactor": {return (<BackgroundWidget spaceId={spaceId} />)}
            case "basic visualizer": {return (<AudioVisualizerWidget spaceId={spaceId} />)}
            case "circle visualizer": {return (<CircleAudioVisualizerWidget spaceId={spaceId} />)}
            case "text visualizer": {return (<TextAudioVisualizerWidget spaceId={spaceId} />)}
            case "yoda timer": {return (<YodaTimerWidget spaceId={spaceId} />)}
            case "pomodoro timer": {return (<PomodoroTimerWidget spaceId={spaceId} />)}

        }
    };

    const handleClose = (id: string) => {
        dispatch(removeWidget({
            widgetInstanceId: id,
            spaceId,
        }));
    };

    return (
        <div ref={rootRef} className="widget liquidGlass-effect resizable-wrapper">
            <div ref={headerRef} className="widget__header">
                {
                widgetInstance && (<button
                        className="button"
                        data-type="close"
                        aria-label="Close widget"
                        onClick={() => handleClose(widgetInstance.id)}
                        style={{display: "inline", paddingInline: "4px"}}
                >
                    &times;
                </button>)
                }
            </div>
            <div className="widget__content">
                {renderWidget(widgetInfoId)}
            </div>
        </div>
    );
};