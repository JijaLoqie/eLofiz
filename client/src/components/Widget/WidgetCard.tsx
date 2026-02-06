import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { EntityType, type IWidget } from "@/types.ts";
import { selectWidget } from "@/slices/WidgetSlice.ts";
import { useCallback } from "react";
import { toggleItemsList } from "@/slices/ModalSlice.ts";
import { selectCurrentSpace } from "@/slices/IntersectionSlice.ts";
import { addWidget } from "@/slices/SpaceSlice.ts";

interface WidgetCardProps {
    widgetCardId: string;
}

export const WidgetCard = (props: WidgetCardProps) => {
    const currentSpace = useSelector((state: RootState) => selectCurrentSpace(state));
    const widgetInfo = useSelector((state: RootState): IWidget => selectWidget(state, props.widgetCardId));
    const { title, preview, type } = widgetInfo;
    const dispatch = useDispatch();

    const handleAddWidget = useCallback(() => {
        dispatch(addWidget({ spaceId: currentSpace, widgetId: widgetInfo.id }));
        dispatch(toggleItemsList(EntityType.WIDGETS));
    }, [widgetInfo.id, currentSpace]);

    return (
        <div className="relative flex flex-col h-125 w-82 widget-card border bg-[#1a1a1a] border-[#898989] rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="p-4">
                <h3 className="text-[#898989] text-[1.4em] font-semibold truncate">{title}</h3>
            </div>
            <div className="relative flex-1 flex justify-center h-full overflow-hidden"> {/* Fixed size here */}
                {preview && (
                    <img
                        src={`preview/${preview}`}
                        alt={title}
                        className="rounded-md w-full h-full object-contain" // Make image responsive within the container
                    />
                )}
            </div>
            <div className="text-center text-[#1beb9e] font-medium mb-2">
                {type}
            </div>
            <div className="p-4 bg-[#1a1a1a]">
                <div className="flex justify-center mt-2">
                    <button
                        className="bg-[#1beb9e] text-black py-2 px-4 rounded hover:bg-[#1beb9e]/90 transition duration-150"
                        onClick={handleAddWidget}
                    >
                        Add Widget
                    </button>
                </div>
            </div>
        </div>
    );
}
