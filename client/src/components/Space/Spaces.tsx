import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import type { ISpace, IWidget } from "@/types.ts";
import { Space } from "@/components/Space/Space.tsx";
import { selectSpaces } from "@/slices/SpaceSlice.ts";

export const Spaces = () => {
    const spaces = useSelector((state: RootState): ISpace[] => selectSpaces(state))
    return (
        <>
            {spaces.map((space) => (<Space spaceId={space.id} key={space.id} />))}
        </>
    )
}