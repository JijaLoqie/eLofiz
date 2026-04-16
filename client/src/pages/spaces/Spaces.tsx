import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import type { ISpace } from "@/shared/types.ts";

import { Space } from "@/pages/spaces/Space.tsx";
import { selectSpaces } from "@/entities/space/model/SpaceSlice.ts";

import { EntrySpace } from "@/pages/EntrySpace/EntrySpace.tsx";

export const Spaces = () => {
    const spaces = useSelector((state: RootState): ISpace[] => selectSpaces(state))
    return (
        <>
            {spaces.length === 0 ? (
                <EntrySpace />
            ) : spaces.map((space) => (<Space spaceId={space.id} key={space.id} />))}
        </>
    )
}