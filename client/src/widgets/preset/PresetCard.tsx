import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { type IPreset } from "@/shared/types.ts";
import { selectPreset } from "@/entities/preset/model/PresetSlice.ts";
import { use, useCallback } from "react";
import { ModalContext } from "@/features/Modal/ModalProvider.tsx";
import { NotificationContext } from "@/shared/Notifications/NotificationProvider.tsx";
import { useSpaceListStore } from "@/features/spaces-session/model";

interface PresetCardProps {
    presetId: string;
}

export const PresetCard = (props: PresetCardProps) => {
    const spaceListStore = useSpaceListStore();
    const modalData = use(ModalContext);
    const notificationData = use(NotificationContext);
    const presetInfo = useSelector((state: RootState): IPreset => selectPreset(state, props.presetId));
    const { tags, spaceProps } = presetInfo;
    const { images, name } = spaceProps;

    const handleCreateSpace = useCallback(() => {
        spaceListStore.createSpace(spaceProps);
        modalData?.setValue?.("");

        setTimeout(() => window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth" // smooth animation
        }), 100);

        notificationData?.setValue?.("Создано новое пространство!");

    }, [])
    return (
        <div className="preset-card" onClick={handleCreateSpace}>
            <img alt="preset-cover" src={`${images[0]}`} className="preset-cover"/>
            <div className="preset-title">{name}</div>
            <div className="preset-tags">
                {tags.map((tag: string) => (<div className="tag" key={tag}>{tag}</div>))}
            </div>
        </div>
    )
}