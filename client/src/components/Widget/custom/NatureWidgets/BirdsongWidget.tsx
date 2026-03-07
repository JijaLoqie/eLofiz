import { type FC } from "react";
import { AmbientWidget } from "./AmbientWidget.tsx";

interface BirdsongWidgetProps {
    spaceId: string;
}

export const BirdsongWidget: FC<BirdsongWidgetProps> = ({ spaceId }) => {
    return (
        <AmbientWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/08/31/audio_9521e05e71.mp3"
            title="Birds"
            icon="🐦"
        />
    );
};
