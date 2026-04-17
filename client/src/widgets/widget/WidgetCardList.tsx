import { WidgetCard } from "@/widgets/widget/WidgetCard.tsx";
import { useWidgetStore } from "@/features/preload-session/store";
import { observer } from "mobx-react-lite";

export const WidgetCardList = observer(() => {
    const {items} = useWidgetStore();
    return (
        <div className="items-list">
            {items.map((item) => (
                <WidgetCard key={item.id} widgetCardId={item.id} />
            ))}
        </div>
    );
});