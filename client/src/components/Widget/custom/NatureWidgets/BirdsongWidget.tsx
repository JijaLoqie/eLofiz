import { type FC } from "react";
import { AmbientWidget } from "@/components/Widget/custom/AmbientWidgets/AmbientWidget.tsx";
import { SoundWidget } from "@/components/Widget/custom/AmbientWidgets/SoundWidget.tsx";

interface BirdsongWidgetProps {
    spaceId: string;
}

export const BirdsongWidget = ({ spaceId }: BirdsongWidgetProps) => {
    return (
        <SoundWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/08/31/audio_9521e05e71.mp3"
            title="Птицы"
            icon="birds"
        />
    );
};
