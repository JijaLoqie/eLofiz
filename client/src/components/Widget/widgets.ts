import { registerWidget } from './widgetRegistry.ts';
import { WidgetType } from '@/types.ts';

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

import { GradientBackgroundWidget } from "./custom/BackgroundWidgets/GradientBackgroundWidget.tsx";

import { WaveVisualizerWidget } from "./custom/AudioVisualizers/WaveVisualizerWidget.tsx";
import { BarsVisualizerWidget } from "./custom/AudioVisualizers/BarsVisualizerWidget.tsx";
import { SpiralVisualizerWidget } from "./custom/AudioVisualizers/SpiralVisualizerWidget.tsx";
import { OrbVisualizerWidget } from "./custom/AudioVisualizers/OrbVisualizerWidget.tsx";

import { ForestTimerWidget } from "./custom/TimerWidgets/ForestTimerWidget.tsx";
import { DeepWorkTimerWidget } from "./custom/TimerWidgets/DeepWorkTimerWidget.tsx";
import { MeditationTimerWidget } from "./custom/TimerWidgets/MeditationTimerWidget.tsx";
import { ReadingTimerWidget } from "./custom/TimerWidgets/ReadingTimerWidget.tsx";

import { AuroraEffectsWidget } from "./custom/EffectsWidgets/AuroraEffectsWidget.tsx";
import { FlameEffectsWidget } from "./custom/EffectsWidgets/FlameEffectsWidget.tsx";
import { SnowEffectsWidget } from "./custom/EffectsWidgets/SnowEffectsWidget.tsx";
import { RainEffectsWidget } from "./custom/EffectsWidgets/RainEffectsWidget.tsx";
import { SnowyWindEffectsWidget } from "./custom/EffectsWidgets/SnowyWindEffectsWidget.tsx";
import { ParticlesEffectsWidget } from "./custom/EffectsWidgets/ParticlesEffectsWidget.tsx";
import { StarfieldEffectsWidget } from "./custom/EffectsWidgets/StarfieldEffectsWidget.tsx";
import { appStore } from "@/app/appStore.ts";

registerWidget({
    id: 'basic player',
    title: 'Базовый аудио плеер',
    type: WidgetType.MUSIC,
    component: PlayerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'basic redactor',
    title: 'Базовый редактор фона',
    type: WidgetType.BACKGROUND,
    component: BackgroundWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'basic visualizer',
    title: 'Базовый визуализатор',
    type: WidgetType.AUDIO_VISUALIZER,
    component: AudioVisualizerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'circle visualizer',
    title: 'Круговой аудиовизуализатор',
    type: WidgetType.AUDIO_VISUALIZER,
    component: CircleAudioVisualizerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
    resizable: true,
});

registerWidget({
    id: 'text visualizer',
    title: 'Текстовый аудиовизуализатор',
    type: WidgetType.AUDIO_VISUALIZER,
    component: TextAudioVisualizerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'yoda timer',
    title: 'Йода таймер',
    type: WidgetType.TIMER,
    component: YodaTimerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
});

registerWidget({
    id: 'pomodoro timer',
    title: 'Pomodoro таймер',
    type: WidgetType.TIMER,
    component: PomodoroTimerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
});

registerWidget({
    id: 'rain sounds',
    title: 'Дождь',
    type: WidgetType.AMBIENT,
    component: RainSoundsWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
});

registerWidget({
    id: 'forest sounds',
    title: 'Лес',
    type: WidgetType.NATURE,
    component: ForestSoundsWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
});

registerWidget({
    id: 'cafe ambience',
    title: 'Кафе',
    type: WidgetType.AMBIENT,
    component: CafeAmbienceWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
});

registerWidget({
    id: 'white noise',
    title: 'Белый шум',
    type: WidgetType.AMBIENT,
    component: WhiteNoiseWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
});

registerWidget({
    id: 'lofi player',
    title: 'Lo-fi',
    type: WidgetType.MUSIC,
    component: LofiPlayerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'piano player',
    title: 'Пианино',
    type: WidgetType.MUSIC,
    component: PianoPlayerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'ocean waves',
    title: 'Океан',
    type: WidgetType.NATURE,
    component: OceanWavesWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
});

registerWidget({
    id: 'fireplace',
    title: 'Камин',
    type: WidgetType.NATURE,
    component: FireplaceWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
});

registerWidget({
    id: 'wind sounds',
    title: 'Ветер',
    type: WidgetType.NATURE,
    component: WindSoundsWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
});

registerWidget({
    id: 'binaural beats',
    title: 'Бинауральные ритмы',
    type: WidgetType.FOCUS,
    component: BinauralBeatsWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'thunderstorm',
    title: 'Гроза',
    type: WidgetType.NATURE,
    component: ThunderstormWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
});

registerWidget({
    id: 'birdsong',
    title: 'Пение птиц',
    type: WidgetType.NATURE,
    component: BirdsongWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
});

registerWidget({
    id: 'night sounds',
    title: 'Ночь',
    type: WidgetType.NATURE,
    component: NightSoundsWidget,
    defaultShape: 'circle',
    defaultSize: 'small',
});

registerWidget({
    id: 'gradient background',
    title: 'Градиент',
    type: WidgetType.BACKGROUND,
    component: GradientBackgroundWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ gradient: ['#667eea', '#764ba2'] }),
});

registerWidget({
    id: 'wave visualizer',
    title: 'Волны',
    type: WidgetType.AUDIO_VISUALIZER,
    component: WaveVisualizerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    resizable: true,
});

registerWidget({
    id: 'bars visualizer',
    title: 'Столбцы',
    type: WidgetType.AUDIO_VISUALIZER,
    component: BarsVisualizerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    resizable: true,
});

registerWidget({
    id: 'spiral visualizer',
    title: 'Спираль',
    type: WidgetType.AUDIO_VISUALIZER,
    component: SpiralVisualizerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
    resizable: true,
});

registerWidget({
    id: 'orb visualizer',
    title: 'Сфера',
    type: WidgetType.AUDIO_VISUALIZER,
    component: OrbVisualizerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
    resizable: true,
});

registerWidget({
    id: 'forest timer',
    title: 'Лесной таймер',
    type: WidgetType.TIMER,
    component: ForestTimerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
});

registerWidget({
    id: 'deep work timer',
    title: 'Глубокая работа',
    type: WidgetType.TIMER,
    component: DeepWorkTimerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'meditation timer',
    title: 'Медитация',
    type: WidgetType.TIMER,
    component: MeditationTimerWidget,
    defaultShape: 'circle',
    defaultSize: 'medium',
});

registerWidget({
    id: 'reading timer',
    title: 'Чтение',
    type: WidgetType.TIMER,
    component: ReadingTimerWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
});

registerWidget({
    id: 'aurora effect',
    title: 'Северное сияние',
    type: WidgetType.EFFECTS,
    component: AuroraEffectsWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ aurora: true }),
});

registerWidget({
    id: 'flame effect',
    title: 'Пламя',
    type: WidgetType.EFFECTS,
    component: FlameEffectsWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ flame: true }),
});

registerWidget({
    id: 'snow effect',
    title: 'Снег',
    type: WidgetType.EFFECTS,
    component: SnowEffectsWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ snow: true }),
});

registerWidget({
    id: 'rain effect',
    title: 'Дождь',
    type: WidgetType.EFFECTS,
    component: RainEffectsWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ rain: true }),
});

registerWidget({
    id: 'snowy wind effect',
    title: 'Снежный ветер',
    type: WidgetType.EFFECTS,
    component: SnowyWindEffectsWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ snowyWind: true }),
});

registerWidget({
    id: 'particles effect',
    title: 'Частицы',
    type: WidgetType.EFFECTS,
    component: ParticlesEffectsWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ particles: true }),
});

registerWidget({
    id: 'starfield effect',
    title: 'Звёздное небо',
    type: WidgetType.EFFECTS,
    component: StarfieldEffectsWidget,
    defaultShape: 'square',
    defaultSize: 'auto',
    effects: () => ({ starfield: true }),
});