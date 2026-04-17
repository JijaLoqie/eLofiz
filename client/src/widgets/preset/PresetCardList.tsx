import { PresetCard } from "@/widgets/preset/PresetCard.tsx";
import { usePresetStore } from "@/features/preload-session/store";
import { observer } from "mobx-react-lite";

export const PresetCardList = observer(() => {
    const {items} = usePresetStore();
    return (
        <div className="items-list">
            {items.map((item) => (
                <PresetCard key={item.id} presetId={item.id} />
            ))}
        </div>
    );
});