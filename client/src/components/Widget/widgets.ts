import { registerWidget } from './widgetRegistry.ts';
import { WidgetType, type SpaceEffects } from '@/types.ts';

const createEffectsGetter = (effects: Partial<SpaceEffects>) => {
    return () => effects;
};

import { PlayerWidget } from "./custom/PlayerWidget/PlayerWidget.tsx";
import { BackgroundWidget } from "./custom/BackgroundWidget/BackgroundWidget.tsx";
import { AudioVisualizerWidget } from "./custom/AudioVisualizers/AudioVisualizerWidget.tsx";
import { CircleAudioVisualizerWidget } from "./custom/AudioVisualizers/CircleAudioVisualizerWidget.tsx";
import { TextAudioVisualizerWidget } from "./custom/AudioVisualizers/TextAudioVisualizerWidget.tsx";
import { YodaTimerWidget } from "./custom/YodaTimerWidget.tsx";
import { PomodoroTimerWidget } from "./custom/PomodoroTimerWidget.tsx";

import { RainSoundsWidget } from "./custom/AmbientWidgets/RainSoundsWidget.tsx";
import { ForestSoundsWidget } from "./custom/NatureWidgets/ForestSoundsWidget.tsx";
import { CafeAmbienceWidget } from "./custom/AmbientWidgets/CafeAmbienceWidget.tsx";
import { WhiteNoiseWidget } from "./custom/AmbientWidgets/WhiteNoiseWidget.tsx";
import { LofiPlayerWidget } from "./custom/AmbientWidgets/LofiPlayerWidget.tsx";
import { PianoPlayerWidget } from "./custom/AmbientWidgets/PianoPlayerWidget.tsx";
import { OceanWavesWidget } from "./custom/NatureWidgets/OceanWavesWidget.tsx";
import { FireplaceWidget } from "./custom/NatureWidgets/FireplaceWidget.tsx";
import { WindSoundsWidget } from "./custom/NatureWidgets/WindSoundsWidget.tsx";
import { BinauralBeatsWidget } from "./custom/FocusWidgets/BinauralBeatsWidget.tsx";
import { ThunderstormWidget } from "./custom/NatureWidgets/ThunderstormWidget.tsx";
import { BirdsongWidget } from "./custom/NatureWidgets/BirdsongWidget.tsx";
import { NightSoundsWidget } from "./custom/NatureWidgets/NightSoundsWidget.tsx";

import { AuroraBackgroundWidget } from "./custom/BackgroundWidgets/AuroraBackgroundWidget.tsx";
import { GradientBackgroundWidget } from "./custom/BackgroundWidgets/GradientBackgroundWidget.tsx";
import { ParticleBackgroundWidget } from "./custom/BackgroundWidgets/ParticleBackgroundWidget.tsx";
import { StarfieldWidget } from "./custom/BackgroundWidgets/StarfieldWidget.tsx";

import { WaveVisualizerWidget } from "./custom/AudioVisualizers/WaveVisualizerWidget.tsx";
import { BarsVisualizerWidget } from "./custom/AudioVisualizers/BarsVisualizerWidget.tsx";
import { SpiralVisualizerWidget } from "./custom/AudioVisualizers/SpiralVisualizerWidget.tsx";
import { OrbVisualizerWidget } from "./custom/AudioVisualizers/OrbVisualizerWidget.tsx";

import { ForestTimerWidget } from "./custom/TimerWidgets/ForestTimerWidget.tsx";
import { DeepWorkTimerWidget } from "./custom/TimerWidgets/DeepWorkTimerWidget.tsx";
import { MeditationTimerWidget } from "./custom/TimerWidgets/MeditationTimerWidget.tsx";
import { ReadingTimerWidget } from "./custom/TimerWidgets/ReadingTimerWidget.tsx";

import { AuroraEffectsWidget } from "./custom/EffectsWidgets/AuroraEffectsWidget.tsx";
import { BlurEffectsWidget } from "./custom/EffectsWidgets/BlurEffectsWidget.tsx";
import { VignetteEffectsWidget } from "./custom/EffectsWidgets/VignetteEffectsWidget.tsx";
import { NoiseEffectsWidget } from "./custom/EffectsWidgets/NoiseEffectsWidget.tsx";

registerWidget({
    id: 'basic player',
    component: PlayerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'basic redactor',
    component: BackgroundWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'basic visualizer',
    component: AudioVisualizerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'circle visualizer',
    component: CircleAudioVisualizerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
    resizable: true,
});

registerWidget({
    id: 'text visualizer',
    component: TextAudioVisualizerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'yoda timer',
    component: YodaTimerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
});

registerWidget({
    id: 'pomodoro timer',
    component: PomodoroTimerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
});

registerWidget({
    id: 'rain sounds',
    component: RainSoundsWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
    resizable: true,
});

registerWidget({
    id: 'forest sounds',
    component: ForestSoundsWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
    resizable: true,
});

registerWidget({
    id: 'cafe ambience',
    component: CafeAmbienceWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
    resizable: true,
});

registerWidget({
    id: 'white noise',
    component: WhiteNoiseWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
    resizable: true,
});

registerWidget({
    id: 'lofi player',
    component: LofiPlayerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'piano player',
    component: PianoPlayerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'ocean waves',
    component: OceanWavesWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
    resizable: true,
});

registerWidget({
    id: 'fireplace',
    component: FireplaceWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
    resizable: true,
});

registerWidget({
    id: 'wind sounds',
    component: WindSoundsWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
    resizable: true,
});

registerWidget({
    id: 'binaural beats',
    component: BinauralBeatsWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'thunderstorm',
    component: ThunderstormWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
    resizable: true,
});

registerWidget({
    id: 'birdsong',
    component: BirdsongWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
    resizable: true,
});

registerWidget({
    id: 'night sounds',
    component: NightSoundsWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
    resizable: true,
});

registerWidget({
    id: 'aurora background',
    component: AuroraBackgroundWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ aurora: true }),
});

registerWidget({
    id: 'gradient background',
    component: GradientBackgroundWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ gradient: ['#667eea', '#764ba2'] }),
});

registerWidget({
    id: 'particle background',
    component: ParticleBackgroundWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ particles: true }),
});

registerWidget({
    id: 'starfield',
    component: StarfieldWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ starfield: true }),
});

registerWidget({
    id: 'wave visualizer',
    component: WaveVisualizerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    resizable: true,
});

registerWidget({
    id: 'bars visualizer',
    component: BarsVisualizerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    resizable: true,
});

registerWidget({
    id: 'spiral visualizer',
    component: SpiralVisualizerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
    resizable: true,
});

registerWidget({
    id: 'orb visualizer',
    component: OrbVisualizerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
    resizable: true,
});

registerWidget({
    id: 'forest timer',
    component: ForestTimerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
});

registerWidget({
    id: 'deep work timer',
    component: DeepWorkTimerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'meditation timer',
    component: MeditationTimerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
});

registerWidget({
    id: 'reading timer',
    component: ReadingTimerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'aurora effect',
    component: AuroraEffectsWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ aurora: true }),
});

registerWidget({
    id: 'blur effect',
    component: BlurEffectsWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ blur: 5 }),
});

registerWidget({
    id: 'vignette effect',
    component: VignetteEffectsWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ vignette: true }),
});

registerWidget({
    id: 'noise effect',
    component: NoiseEffectsWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ noise: true }),
});
