import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { type IWidget } from "@/shared/types.ts";
import { selectWidget } from "@/entities/widget/model/WidgetSlice.ts";
import { use, useCallback } from "react";
import { selectCurrentSpace } from "@/pages/spaces/model/IntersectionSlice.ts";
import { addWidget } from "@/entities/space/model/SpaceSlice.ts";
import { ModalContext } from "@/features/Modal/ModalProvider.tsx";
import { NotificationContext } from "@/shared/Notifications/NotificationProvider.tsx";

interface WidgetCardProps {
    widgetCardId: string;
}

// Map widget types to Font Awesome icons
const WIDGET_ICON_MAP: Record<string, string> = {
    "timer": "fas fa-hourglass-start",
    "audio-visualiser": "fas fa-wave-square",
    "background": "fas fa-image",
    "music": "fas fa-music",
};

// Map widget types to accent colors
const WIDGET_COLOR_MAP: Record<string, { border: string; bg: string; line: string }> = {
    "timer": { border: "group-hover:border-orange-500", bg: "group-hover:bg-orange-500/20", line: "group-hover:via-orange-500" },
    "audio-visualiser": { border: "group-hover:border-purple-500", bg: "group-hover:bg-purple-500/20", line: "group-hover:via-purple-500" },
    "background": { border: "group-hover:border-emerald-500", bg: "group-hover:bg-emerald-500/20", line: "group-hover:via-emerald-500" },
    "music": { border: "group-hover:border-pink-500", bg: "group-hover:bg-pink-500/20", line: "group-hover:via-pink-500" },
};

export const WidgetCard = (props: WidgetCardProps) => {
    const modalData = use(ModalContext);
    const notificationData = use(NotificationContext);
    const currentSpace = useSelector((state: RootState) => selectCurrentSpace(state));
    const widgetInfo = useSelector((state: RootState): IWidget => selectWidget(state, props.widgetCardId));
    const dispatch = useDispatch();

    const handleAddWidget = useCallback(() => {
        dispatch(addWidget({ spaceId: currentSpace, widgetId: widgetInfo.id }));
        modalData?.setValue?.("");
        notificationData?.setValue?.("Создан новый виджет!");


    }, [widgetInfo.id, currentSpace]);

    const iconClass = WIDGET_ICON_MAP[widgetInfo.type.toLowerCase()] || "fas fa-cube";
    const colors = WIDGET_COLOR_MAP[widgetInfo.type.toLowerCase()] || WIDGET_COLOR_MAP["timer"];

    return (
        <div
            className="
                rounded-lg overflow-hidden
                cursor-pointer
                bg-[#000000AA] hover:bg-[#000000DD]
                transition-all duration-300
                hover:shadow-lg hover:scale-105
                p-1
                group
            "
            onClick={handleAddWidget}
        >
            {/* Image Container */}
            <img
                src={widgetInfo.preview}
                alt="widget image"
            />

            {/* Divider Line with Icon Circle */}
            <div className={`relative h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent ${colors.line}`}>
                <div className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-12 h-12
                    bg-[#000000AA] ${colors.bg}
                    border-2 border-gray-500 ${colors.border}
                    rounded-full
                    flex items-center justify-center
                    transition-all duration-300
                `}>
                    <i className={`${iconClass} text-white text-lg`}></i>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                <div className="text-base font-semibold text-white truncate">
                    {widgetInfo.title}
                </div>
            </div>
        </div>
    );
};