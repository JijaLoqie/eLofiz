import { StreamCard } from "@/widgets/stream/StreamCard.tsx";
import { useStreamStore } from "@/features/preload-session/store";
import { observer } from "mobx-react-lite";

export const StreamCardList = observer(() => {
    const {items} = useStreamStore();
    return (
        <div className="items-list">
            {items.map((item) => (
                <StreamCard key={item.id} streamId={item.id} />
            ))}
        </div>
    );
});