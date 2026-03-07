import { EffectsWidgetBase } from "./EffectsWidgetBase.tsx";

interface AuroraEffectsWidgetProps {
    spaceId: string;
}

export const AuroraEffectsWidget = ({ spaceId }: AuroraEffectsWidgetProps) => {
    return (
        <EffectsWidgetBase
            spaceId={spaceId}
            effectKey="aurora"
            label="Aurora"
            icon="🌌"
        />
    );
};
