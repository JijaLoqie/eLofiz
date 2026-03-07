import { SoundWidget } from "./SoundWidget.tsx";

interface WhiteNoiseWidgetProps {
    spaceId: string;
}

export const WhiteNoiseWidget = ({ spaceId }: WhiteNoiseWidgetProps) => {
    return (
        <SoundWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/03/15/audio_445497a6e2.mp3"
            title="Шум"
            icon="ambient"
        />
    );
};
