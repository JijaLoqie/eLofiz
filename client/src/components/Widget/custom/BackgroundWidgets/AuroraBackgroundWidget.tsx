import { BackgroundEffectsWidget } from "./BackgroundEffectsWidget.tsx";

interface AuroraBackgroundWidgetProps {
    spaceId: string;
}

export const AuroraBackgroundWidget = ({ spaceId }: AuroraBackgroundWidgetProps) => {
    return (
        <BackgroundEffectsWidget
            spaceId={spaceId}
            effectKey="aurora"
            label="Aurora"
            icon="🌌"
        />
    );
};
