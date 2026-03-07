import { BackgroundEffectsWidget } from "./BackgroundEffectsWidget.tsx";

interface GradientBackgroundWidgetProps {
    spaceId: string;
}

export const GradientBackgroundWidget = ({ spaceId }: GradientBackgroundWidgetProps) => {
    return (
        <BackgroundEffectsWidget
            spaceId={spaceId}
            effectKey="gradient"
            label="Gradient"
            icon="🎨"
            gradientColors={['#667eea', '#764ba2']}
        />
    );
};
