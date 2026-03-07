import { EffectsWidgetBase } from "./EffectsWidgetBase.tsx";

interface NoiseEffectsWidgetProps {
    spaceId: string;
}

export const NoiseEffectsWidget = ({ spaceId }: NoiseEffectsWidgetProps) => {
    return (
        <EffectsWidgetBase
            spaceId={spaceId}
            effectKey="noise"
            label="Film Grain"
            icon="📺"
        />
    );
};
