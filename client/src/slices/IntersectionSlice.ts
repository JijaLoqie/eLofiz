import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SpaceMetrics } from "@/components/hooks/useIntersectionSpaceHandler.ts";

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
    }
});

export const { selectCurrentSpace } = IntersectionSlice.selectors

export const { setCurrentSpace, updateSpaceMetrics } = IntersectionSlice.actions;