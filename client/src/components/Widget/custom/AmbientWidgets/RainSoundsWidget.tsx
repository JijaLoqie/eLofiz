import { SoundWidget } from "./SoundWidget.tsx";

interface RainSoundsWidgetProps {
    spaceId: string;
}

export const RainSoundsWidget = ({ spaceId }: RainSoundsWidgetProps) => {
    return (
        <SoundWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/05/16/audio_1333d7d4a8.mp3"
            title="Дождь"
            icon="rain"
        />
    );
};
