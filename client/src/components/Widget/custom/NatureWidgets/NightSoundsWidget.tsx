import { type FC } from "react";
import { AmbientWidget } from "./AmbientWidget.tsx";

interface NightSoundsWidgetProps {
    spaceId: string;
}

export const NightSoundsWidget: FC<NightSoundsWidgetProps> = ({ spaceId }) => {
    return (
        <AmbientWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/08/04/audio_53d25d3a8a.mp3"
            title="Night"
            icon="🌙"
        />
    );
};
