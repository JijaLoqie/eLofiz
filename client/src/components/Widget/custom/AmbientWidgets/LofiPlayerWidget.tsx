import { type FC } from "react";
import { MusicPlayerWidget } from "./MusicPlayerWidget.tsx";

interface LofiPlayerWidgetProps {
    spaceId: string;
}

export const LofiPlayerWidget: FC<LofiPlayerWidgetProps> = ({ spaceId }) => {
    return (
        <MusicPlayerWidget
            spaceId={spaceId}
            title="Lo-fi Beats"
            coverColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        />
    );
};
