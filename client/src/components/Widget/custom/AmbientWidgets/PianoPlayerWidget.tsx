import { SoundWidget } from "./SoundWidget.tsx";

interface PianoPlayerWidgetProps {
    spaceId: string;
}

export const PianoPlayerWidget = ({ spaceId }: PianoPlayerWidgetProps) => {
    return (
        <SoundWidget
            spaceId={spaceId}
            soundUrl=""
            title="Пианино"
            icon="music"
        />
    );
};
