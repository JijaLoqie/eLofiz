import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { PresetCard } from "@/widgets/preset/PresetCard.tsx";
import { selectPresets } from "@/entities/preset/model/PresetSlice.ts";

export const PresetCardList = () => {
    const presets = useSelector((state: RootState) => selectPresets(state));
    return (
        <div className="items-list">
            {Object.keys(presets).map((presetId) => (
                <PresetCard key={presetId} presetId={presetId} />
            ))}
        </div>
    );
}