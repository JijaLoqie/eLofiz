import { type FC } from "react";
import { AmbientWidget } from "@/components/Widget/custom/AmbientWidgets/AmbientWidget.tsx";
import { SoundWidget } from "@/components/Widget/custom/AmbientWidgets/SoundWidget.tsx";

interface ForestSoundsWidgetProps {
    spaceId: string;
}

export const ForestSoundsWidget = ({ spaceId }: ForestSoundsWidgetProps) => {
    return (
        <SoundWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/08/04/audio_1daf0a0b80.mp3"
            title="Лес"
            icon="forest"
        />
    );
};
