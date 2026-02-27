import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { EntityType, type IPreset } from "@/types.ts";
import { selectPreset } from "@/slices/PresetSlice.ts";
import { use, useCallback } from "react";
import { toggleItemsList } from "@/slices/ModalSlice.ts";
import { createSpace } from "@/slices/SpaceSlice.ts";
import { ModalContext } from "@/components/Modal/ModalProvider.tsx";
import { NotificationContext } from "@/components/Notifications/NotificationProvider.tsx";

interface PresetCardProps {
    presetId: string;
}

export const PresetCard = (props: PresetCardProps) => {
    const dispatch = useDispatch();
    const modalData = use(ModalContext);
    const notificationData = use(NotificationContext);
    const presetInfo = useSelector((state: RootState): IPreset => selectPreset(state, props.presetId));
    const { tags, spaceProps } = presetInfo;
    const { images, name } = spaceProps;

    const handleCreateSpace = useCallback(() => {
        // dispatch(addWidget({ spaceId: currentSpace, widgetId: widgetInfo.id }));
        dispatch(createSpace(spaceProps));
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