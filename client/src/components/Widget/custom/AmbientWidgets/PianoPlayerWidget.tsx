import { type FC } from "react";
import { MusicPlayerWidget } from "./MusicPlayerWidget.tsx";

interface PianoPlayerWidgetProps {
    spaceId: string;
}

export const PianoPlayerWidget: FC<PianoPlayerWidgetProps> = ({ spaceId }) => {
    return (
        <MusicPlayerWidget
            spaceId={spaceId}
            title="Piano Relax"
            coverColor="linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
        />
    );
};
