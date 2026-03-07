import { EffectsWidgetBase } from "./EffectsWidgetBase.tsx";

interface VignetteEffectsWidgetProps {
    spaceId: string;
}

export const VignetteEffectsWidget = ({ spaceId }: VignetteEffectsWidgetProps) => {
    return (
        <EffectsWidgetBase
            spaceId={spaceId}
            effectKey="vignette"
            label="Vignette"
            icon="🎬"
        />
    );
};
