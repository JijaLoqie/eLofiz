import { SoundWidget } from "../AmbientWidgets/SoundWidget.tsx";

interface FireplaceWidgetProps {
    spaceId: string;
}

export const FireplaceWidget = ({ spaceId }: FireplaceWidgetProps) => {
    return (
        <SoundWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2021/08/09/audio_f7d7b8e8c2.mp3"
            title="Камин"
            icon="fireplace"
        />
    );
};
