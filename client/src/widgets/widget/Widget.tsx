import { type FC, use } from "react";
import type { WidgetInstance } from "@/shared/types.ts";

import { BackgroundWidget } from "@/widgets/widget/custom/BackgroundWidget/BackgroundWidget.tsx";
import { PlayerWidget } from "@/widgets/widget/custom/PlayerWidget/PlayerWidget.tsx";
import { AudioVisualizerWidget } from "@/widgets/widget/custom/AudioVisualizers/AudioVisualizerWidget.tsx";
import { CircleAudioVisualizerWidget } from "@/widgets/widget/custom/AudioVisualizers/CircleAudioVisualizerWidget.tsx";
import { TextAudioVisualizerWidget } from "@/widgets/widget/custom/AudioVisualizers/TextAudioVisualizerWidget.tsx";
import { YodaTimerWidget } from "@/widgets/widget/custom/YodaTimerWidget.tsx";
import { PomodoroTimerWidget } from "@/widgets/widget/custom/PomodoroTimerWidget.tsx";
import { SpaceContext } from "@/pages/spaces/Space.tsx";
import { useSpaceListStore } from "@/features/spaces-session/model";
import { observer } from "mobx-react-lite";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface WidgetProps {
    widgetInfoId: string;
    widgetInstance: WidgetInstance;
}

export const Widget: FC<WidgetProps> = observer(({widgetInfoId, widgetInstance}) => {
    const spaceId = use(SpaceContext);

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: widgetInstance.id,
    });

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

    const spaceListStore = useSpaceListStore();
    const handleClose = (id: string) => {
        console.log({
            spaceId,
            id
        })
        spaceListStore.removeWidget(spaceId, id);
    };

    return (
        <div id={widgetInstance.id} ref={setNodeRef}
             style={{
                 position: "absolute" as const,
                 top: widgetInstance.position.y,
                 left: widgetInstance.position.x,
                 transform: CSS.Translate.toString({
                     scaleX: 1,
                     scaleY: 1,
                     x: transform?.x ?? 0,
                     y: transform?.y ?? 0,
                 }),
             }}
             className="widget liquidGlass-effect resizable-wrapper">
            <div className="widget__header"
                 {...listeners}
                 {...attributes}
            >
                {
                widgetInstance && (<button
                        className="button"
                        data-type="close"
                        aria-label="Close widget"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClose(widgetInstance.id);
                        }}
                        // Добавьте это, чтобы dnd-kit не перехватил нажатие
                        onPointerDown={(e) => e.stopPropagation()}
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
});