import { BackgroundEffectsWidget } from "./BackgroundEffectsWidget.tsx";

interface ParticleBackgroundWidgetProps {
    spaceId: string;
}

export const ParticleBackgroundWidget = ({ spaceId }: ParticleBackgroundWidgetProps) => {
    return (
        <BackgroundEffectsWidget
            spaceId={spaceId}
            effectKey="particles"
            label="Particles"
            icon="✨"
        />
    );
};
