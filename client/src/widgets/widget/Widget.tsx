import { useDispatch } from "react-redux";
import { use, useRef } from "react";
import type { WidgetInstance } from "@/shared/types.ts";
import { removeWidget } from "@/entities/space/model/SpaceSlice.ts";

import { useDragHandler } from "@/shared/hooks/useDragHandler.ts";
import { BackgroundWidget } from "@/widgets/widget/custom/BackgroundWidget/BackgroundWidget.tsx";
import { PlayerWidget } from "@/widgets/widget/custom/PlayerWidget/PlayerWidget.tsx";
import { AudioVisualizerWidget } from "@/widgets/widget/custom/AudioVisualizers/AudioVisualizerWidget.tsx";
import { CircleAudioVisualizerWidget } from "@/widgets/widget/custom/AudioVisualizers/CircleAudioVisualizerWidget.tsx";
import { TextAudioVisualizerWidget } from "@/widgets/widget/custom/AudioVisualizers/TextAudioVisualizerWidget.tsx";
import { YodaTimerWidget } from "@/widgets/widget/custom/YodaTimerWidget.tsx";
import { PomodoroTimerWidget } from "@/widgets/widget/custom/PomodoroTimerWidget.tsx";
import { SpaceContext } from "@/pages/spaces/Space.tsx";

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