import { useSelector } from "react-redux";
import type { ISpace, IWidget, WidgetInstance } from "@/types.ts";
import type { RootState } from "@/index.tsx";
import { selectSpace, selectWidgetsOnSpace } from "@/slices/SpaceSlice.ts";
import { Widget } from "@/components/Widget/Widget.tsx";

interface SpaceProps {
    spaceId: string;
}

export const Space = (props: SpaceProps) => {
    const spaceInfo = useSelector((state: RootState): ISpace => selectSpace(state, props.spaceId));
    const widgets = useSelector((state: RootState): WidgetInstance[] => selectWidgetsOnSpace(state, `${props.spaceId}`));


    const { id, background, fixed } = spaceInfo;
    return (
        <div
            id={`${id}`}
            className={`space ${fixed ? "space--fixed" : ""}`}
            style={{backgroundImage: `url(../images/${background})`}}
        >
            <audio className="space__music">NaN</audio>
            {widgets.map((widInst) => <Widget widgetInstance={widInst} key={widInst.id} />)}
        </div>
    );
}