import { type FC } from "react";
import { AmbientWidget } from "@/components/Widget/custom/AmbientWidgets/AmbientWidget.tsx";
import { SoundWidget } from "@/components/Widget/custom/AmbientWidgets/SoundWidget.tsx";

interface OceanWavesWidgetProps {
    spaceId: string;
}

export const OceanWavesWidget = ({ spaceId }: OceanWavesWidgetProps) => {
    return (
        <SoundWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/06/07/audio_6382075a93.mp3"
            title="Океан"
            icon="ocean"
        />
    );
};
