import { type FC } from "react";
import { AmbientWidget } from "./AmbientWidget.tsx";

interface ThunderstormWidgetProps {
    spaceId: string;
}

export const ThunderstormWidget: FC<ThunderstormWidgetProps> = ({ spaceId }) => {
    return (
        <AmbientWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2022/03/10/audio_4d73b89c0a.mp3"
            title="Thunder"
            icon="⛈️"
        />
    );
};
