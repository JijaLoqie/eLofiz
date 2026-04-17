import { Widget } from "@/widgets/widget/Widget.tsx";
import { createContext, useCallback, useEffect, useRef } from "react";
import { trailingThrottle } from "@/shared/utils.ts";
import { observer } from "mobx-react-lite";
import { model } from "@/features/spaces-session"
import { useIntersectionStore } from "@/features/spaces-session/model";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers"

interface SpaceProps {
    spaceId: string;
}


export const SpaceContext = createContext<string>("");


export const Space = observer((props: SpaceProps) => {
    const {spaceId} = props;
    const spaceAudioStore = model.useSpaceAudioStore();
    const spaceListStore = model.useSpaceListStore();
    const spaceInfo = spaceListStore.getSpace(spaceId);
    const widgets = spaceListStore.getSpaceWidgets(spaceId);
    const intersectionStore = useIntersectionStore();

    const spaceMetrics = intersectionStore.getSpaceMetrics(spaceId);

    const htmlAudio = useRef<HTMLAudioElement>(null);
    useEffect(() => {
        if (htmlAudio.current) {
            spaceAudioStore.registerAudio(spaceId);
        }
    }, [htmlAudio.current]);

    const updateVolume = useCallback((newVolume: number) => {
        spaceAudioStore.setVolume(spaceId, newVolume);
    }, [spaceId]);

    // Create throttled function once and memoize it
    const throttledUpdateVolume = useRef(trailingThrottle(updateVolume, 0)).current;

    useEffect(() => {
        if (spaceMetrics === undefined) return;

        throttledUpdateVolume(spaceMetrics.intersectionRatio);
    }, [spaceMetrics?.intersectionRatio, throttledUpdateVolume]);

    const handleDropWidget = (event: DragEndEvent) => {
        const { active, delta } = event;
        const widgetId = active.id;
        const widget = widgets.find(item => item.id === widgetId);
        // Находим текущий виджет в MobX сторе (предположим, через find)
        if (widget) {
            // Вызываем ваш метод обновления
            spaceListStore.updateWidget(spaceId, widgetId.toString(), {
                position: {
                    x: widget.position.x + delta.x,
                    y: widget.position.y + delta.y
                }
            });
        }
    };


    const { id, currentBackground, images, fixed } = spaceInfo;
    return (
        <SpaceContext.Provider value={spaceId}>
            <DndContext onDragEnd={handleDropWidget} modifiers={[restrictToParentElement]}>
                <div
                    id={`${id}`}
                    className={`space ${fixed ? "space--fixed" : ""}`}
                    style={{backgroundImage:`url('${images[currentBackground].imageUrl}')`}}
                >
                    <audio ref={htmlAudio} className="space__music">NaN</audio>
                    {widgets.map((widInst) => <Widget key={widInst.id} widgetInfoId={widInst.widgetId} widgetInstance={widInst} />)}
                </div>
            </DndContext>
        </SpaceContext.Provider>
    );
})