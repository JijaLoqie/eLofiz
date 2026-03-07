import { type FC } from "react";
import { AmbientWidget } from "./AmbientWidget.tsx";

interface FireplaceWidgetProps {
    spaceId: string;
}

export const FireplaceWidget: FC<FireplaceWidgetProps> = ({ spaceId }) => {
    return (
        <AmbientWidget
            spaceId={spaceId}
            soundUrl="https://cdn.pixabay.com/audio/2021/08/09/audio_f7d7b8e8c2.mp3"
            title="Fireplace"
            icon="🔥"
        />
    );
};
