import { SoundWidget } from "../AmbientWidgets/SoundWidget.tsx";

interface WindSoundsWidgetProps {
    spaceId: string;
}

export const WindSoundsWidget = ({ spaceId }: WindSoundsWidgetProps) => {
    return (
        <SoundWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/10/30/audio_a3f92d2bfd.mp3"
            title="Ветер"
            icon="wind"
        />
    );
};
