import { SoundWidget } from "../AmbientWidgets/SoundWidget.tsx";

interface NightSoundsWidgetProps {
    spaceId: string;
}

export const NightSoundsWidget = ({ spaceId }: NightSoundsWidgetProps) => {
    return (
        <SoundWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/08/04/audio_53d25d3a8a.mp3"
            title="Ночь"
            icon="night"
        />
    );
};
