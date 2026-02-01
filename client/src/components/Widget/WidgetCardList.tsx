import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import type { IWidget } from "@/types.ts";
import { selectWidgets } from "@/slices/WidgetSlice.ts";
import { WidgetCard } from "@/components/Widget/WidgetCard.tsx";

export const WidgetCardList = () => {
    const widgets = useSelector((state: RootState): Record<string, IWidget> => selectWidgets(state));
    return (
        <div className="items-list">
            <div data-type="items">
                {Object.keys(widgets).map((widgetId) => (
                    <WidgetCard key={widgetId} widgetCardId={widgetId} />
                ))}
            </div>
        </div>
    );
}