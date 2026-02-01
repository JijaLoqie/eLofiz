import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import type { IPreset } from "@/types.ts";
import { selectPreset } from "@/slices/PresetSlice.ts";

interface PresetCardProps {
    presetId: string;
}

export const PresetCard = (props: PresetCardProps) => {
    const presetInfo = useSelector((state: RootState): IPreset => selectPreset(state, props.presetId));
    const { images, title, tags } = presetInfo;
    return (
        <div className="preset-card">
            <img alt="preset-cover" src={`images/${images[0]}`} className="preset-cover"/>
            <div className="preset-title">{title}</div>
            <div className="preset-tags">
                {tags.map((tag: string) => (<div className="tag" key={tag}>{tag}</div>))}
            </div>
        </div>
    )
}