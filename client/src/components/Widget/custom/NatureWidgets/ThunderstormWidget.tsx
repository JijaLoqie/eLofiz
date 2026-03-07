import { type FC } from "react";
import { AmbientWidget } from "@/components/Widget/custom/AmbientWidgets/AmbientWidget.tsx";

interface ThunderstormWidgetProps {
    spaceId: string;
}

export const ThunderstormWidget = ({ spaceId }: ThunderstormWidgetProps) => {
    return (
        <SoundWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/03/10/audio_4d73b89c0a.mp3"
            title="Гроза"
            icon="thunder"
        />
    );
};
