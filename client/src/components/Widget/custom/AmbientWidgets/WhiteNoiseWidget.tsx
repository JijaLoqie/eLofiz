import { type FC } from "react";
import { AmbientWidget } from "./AmbientWidget.tsx";

interface WhiteNoiseWidgetProps {
    spaceId: string;
}

export const WhiteNoiseWidget: FC<WhiteNoiseWidgetProps> = ({ spaceId }) => {
    return (
        <AmbientWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/03/15/audio_445497a6e2.mp3"
            title="White Noise"
            icon="📻"
        />
    );
};
