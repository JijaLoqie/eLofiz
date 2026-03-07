import { type FC } from "react";
import { AmbientWidget } from "./AmbientWidget.tsx";

interface WindSoundsWidgetProps {
    spaceId: string;
}

export const WindSoundsWidget: FC<WindSoundsWidgetProps> = ({ spaceId }) => {
    return (
        <AmbientWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/10/30/audio_a3f92d2bfd.mp3"
            title="Wind"
            icon="💨"
        />
    );
};
