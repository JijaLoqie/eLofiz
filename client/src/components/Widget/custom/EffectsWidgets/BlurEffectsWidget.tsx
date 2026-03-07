import { EffectsWidgetBase } from "./EffectsWidgetBase.tsx";

interface BlurEffectsWidgetProps {
    spaceId: string;
}

export const BlurEffectsWidget = ({ spaceId }: BlurEffectsWidgetProps) => {
    return (
        <EffectsWidgetBase
            spaceId={spaceId}
            effectKey="blur"
            label="Blur"
            icon="🔮"
            defaultValue={5}
        />
    );
};
