import { type FC } from "react";
import { AmbientWidget } from "./AmbientWidget.tsx";

interface CafeAmbienceWidgetProps {
    spaceId: string;
}

export const CafeAmbienceWidget: FC<CafeAmbienceWidgetProps> = ({ spaceId }) => {
    return (
        <AmbientWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/10/30/audio_fc8c33f4b2.mp3"
            title="Cafe"
            icon="☕"
        />
    );
};
