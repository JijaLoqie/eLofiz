import { BackgroundEffectsWidget } from "./BackgroundEffectsWidget.tsx";

interface StarfieldWidgetProps {
    spaceId: string;
}

export const StarfieldWidget = ({ spaceId }: StarfieldWidgetProps) => {
    return (
        <BackgroundEffectsWidget
            spaceId={spaceId}
            effectKey="starfield"
            label="Starfield"
            icon="⭐"
        />
    );
};
