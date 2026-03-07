import { type FC } from "react";
import { AmbientWidget } from "@/components/Widget/custom/AmbientWidgets/AmbientWidget.tsx";

interface CafeAmbienceWidgetProps {
    spaceId: string;
}

export const CafeAmbienceWidget = ({ spaceId }: CafeAmbienceWidgetProps) => {
    return (
        <SoundWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/10/30/audio_fc8c33f4b2.mp3"
            title="Кафе"
            icon="cafe"
        />
    );
};
