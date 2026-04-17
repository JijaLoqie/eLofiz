import { use, useCallback } from "react";
import { ModalContext } from "@/features/Modal/ModalProvider.tsx";
import { NotificationContext } from "@/shared/Notifications/NotificationProvider.tsx";
import { useSpaceListStore } from "@/features/spaces-session/model";
import { usePresetStore } from "@/features/preload-session/store";
import { observer } from "mobx-react-lite";

interface PresetCardProps {
    presetId: string;
}

export const PresetCard = observer((props: PresetCardProps) => {
    const spaceListStore = useSpaceListStore();
    const modalData = use(ModalContext);
    const notificationData = use(NotificationContext);
    const presetStore = usePresetStore();
    const presetInfo = presetStore.getItem(props.presetId);
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
})