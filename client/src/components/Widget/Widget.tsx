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

import { RainSoundsWidget } from "@/components/Widget/custom/AmbientWidgets/RainSoundsWidget.tsx";
import { ForestSoundsWidget } from "@/components/Widget/custom/NatureWidgets/ForestSoundsWidget.tsx";
import { CafeAmbienceWidget } from "@/components/Widget/custom/AmbientWidgets/CafeAmbienceWidget.tsx";
import { WhiteNoiseWidget } from "@/components/Widget/custom/AmbientWidgets/WhiteNoiseWidget.tsx";
import { LofiPlayerWidget } from "@/components/Widget/custom/AmbientWidgets/LofiPlayerWidget.tsx";
import { PianoPlayerWidget } from "@/components/Widget/custom/AmbientWidgets/PianoPlayerWidget.tsx";
import { OceanWavesWidget } from "@/components/Widget/custom/NatureWidgets/OceanWavesWidget.tsx";
import { FireplaceWidget } from "@/components/Widget/custom/NatureWidgets/FireplaceWidget.tsx";
import { WindSoundsWidget } from "@/components/Widget/custom/NatureWidgets/WindSoundsWidget.tsx";
import { BinauralBeatsWidget } from "@/components/Widget/custom/FocusWidgets/BinauralBeatsWidget.tsx";
import { ThunderstormWidget } from "@/components/Widget/custom/NatureWidgets/ThunderstormWidget.tsx";
import { BirdsongWidget } from "@/components/Widget/custom/NatureWidgets/BirdsongWidget.tsx";
import { NightSoundsWidget } from "@/components/Widget/custom/NatureWidgets/NightSoundsWidget.tsx";

import { AuroraBackgroundWidget } from "@/components/Widget/custom/BackgroundWidgets/AuroraBackgroundWidget.tsx";
import { GradientBackgroundWidget } from "@/components/Widget/custom/BackgroundWidgets/GradientBackgroundWidget.tsx";
import { ParticleBackgroundWidget } from "@/components/Widget/custom/BackgroundWidgets/ParticleBackgroundWidget.tsx";
import { StarfieldWidget } from "@/components/Widget/custom/BackgroundWidgets/StarfieldWidget.tsx";

import { WaveVisualizerWidget } from "@/components/Widget/custom/AudioVisualizers/WaveVisualizerWidget.tsx";
import { BarsVisualizerWidget } from "@/components/Widget/custom/AudioVisualizers/BarsVisualizerWidget.tsx";
import { SpiralVisualizerWidget } from "@/components/Widget/custom/AudioVisualizers/SpiralVisualizerWidget.tsx";
import { OrbVisualizerWidget } from "@/components/Widget/custom/AudioVisualizers/OrbVisualizerWidget.tsx";

import { ForestTimerWidget } from "@/components/Widget/custom/TimerWidgets/ForestTimerWidget.tsx";
import { DeepWorkTimerWidget } from "@/components/Widget/custom/TimerWidgets/DeepWorkTimerWidget.tsx";
import { MeditationTimerWidget } from "@/components/Widget/custom/TimerWidgets/MeditationTimerWidget.tsx";
import { ReadingTimerWidget } from "@/components/Widget/custom/TimerWidgets/ReadingTimerWidget.tsx";
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

            case "rain sounds": {return (<RainSoundsWidget spaceId={spaceId} />)}
            case "forest sounds": {return (<ForestSoundsWidget spaceId={spaceId} />)}
            case "cafe ambience": {return (<CafeAmbienceWidget spaceId={spaceId} />)}
            case "white noise": {return (<WhiteNoiseWidget spaceId={spaceId} />)}
            case "lofi player": {return (<LofiPlayerWidget spaceId={spaceId} />)}
            case "piano player": {return (<PianoPlayerWidget spaceId={spaceId} />)}
            case "ocean waves": {return (<OceanWavesWidget spaceId={spaceId} />)}
            case "fireplace": {return (<FireplaceWidget spaceId={spaceId} />)}
            case "wind sounds": {return (<WindSoundsWidget spaceId={spaceId} />)}
            case "binaural beats": {return (<BinauralBeatsWidget spaceId={spaceId} />)}
            case "thunderstorm": {return (<ThunderstormWidget spaceId={spaceId} />)}
            case "birdsong": {return (<BirdsongWidget spaceId={spaceId} />)}
            case "night sounds": {return (<NightSoundsWidget spaceId={spaceId} />)}

            case "aurora background": {return (<AuroraBackgroundWidget spaceId={spaceId} />)}
            case "gradient background": {return (<GradientBackgroundWidget spaceId={spaceId} />)}
            case "particle background": {return (<ParticleBackgroundWidget spaceId={spaceId} />)}
            case "starfield": {return (<StarfieldWidget spaceId={spaceId} />)}

            case "wave visualizer": {return (<WaveVisualizerWidget spaceId={spaceId} />)}
            case "bars visualizer": {return (<BarsVisualizerWidget spaceId={spaceId} />)}
            case "spiral visualizer": {return (<SpiralVisualizerWidget spaceId={spaceId} />)}
            case "orb visualizer": {return (<OrbVisualizerWidget spaceId={spaceId} />)}

            case "forest timer": {return (<ForestTimerWidget spaceId={spaceId} />)}
            case "deep work timer": {return (<DeepWorkTimerWidget spaceId={spaceId} />)}
            case "meditation timer": {return (<MeditationTimerWidget spaceId={spaceId} />)}
            case "reading timer": {return (<ReadingTimerWidget spaceId={spaceId} />)}
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