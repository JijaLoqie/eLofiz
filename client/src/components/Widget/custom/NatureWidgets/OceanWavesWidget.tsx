import { type FC } from "react";
import { AmbientWidget } from "./AmbientWidget.tsx";

interface OceanWavesWidgetProps {
    spaceId: string;
}

export const OceanWavesWidget: FC<OceanWavesWidgetProps> = ({ spaceId }) => {
    return (
        <AmbientWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/06/07/audio_6382075a93.mp3"
            title="Ocean"
            icon="🌊"
        />
    );
};
