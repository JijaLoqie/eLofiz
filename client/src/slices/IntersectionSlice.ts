import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SpaceMetrics } from "@/components/hooks/useIntersectionSpaceHandler.ts";
import { selectSpace } from "@/slices/SpaceSlice.ts";
import type { RootState } from "@/index.tsx";

interface IntersectionSliceType {
    currentSpace: string,
    spaceMetrics:Record<string, SpaceMetrics>;
}


const initialState: IntersectionSliceType = {
    currentSpace: "",
    spaceMetrics: {},
}



export const IntersectionSlice = createSlice({
    name: "intersection",
    initialState,
    reducers: {
        setCurrentSpace: (state, action: PayloadAction<string>) => {
            state.currentSpace = action.payload;
        },
        updateSpaceMetrics: (state, action: PayloadAction<Record<string, SpaceMetrics>>) => {
            state.spaceMetrics = {...action.payload};
        }
    },
    selectors: {
        selectCurrentSpace: (state) => state.currentSpace,
        selectSpaceMetrics: (state) => state.spaceMetrics,
    }
});


export const { selectCurrentSpace, selectSpaceMetrics } = IntersectionSlice.selectors

export const { setCurrentSpace, updateSpaceMetrics } = IntersectionSlice.actions;


export const selectIntersectionMetrics = createSelector(
    [
        selectSpaceMetrics,
        (_state: RootState, id: string) => id,
    ],
    (spaceMetrics, id: string) => spaceMetrics[id],
)