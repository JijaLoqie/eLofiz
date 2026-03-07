import { SoundWidget } from "./SoundWidget.tsx";

interface LofiPlayerWidgetProps {
    spaceId: string;
}

export const LofiPlayerWidget = ({ spaceId }: LofiPlayerWidgetProps) => {
    return (
        <SoundWidget
            spaceId={spaceId}
            soundUrl=""
            title="Lo-fi"
            icon="music"
        />
    );
};
