import { combineReducers } from "@reduxjs/toolkit";
import { StreamSlice } from "@/slices/StreamSlice.ts";
import { ModalSlice } from "@/slices/ModalSlice.ts";
import { IntersectionSlice } from "@/slices/IntersectionSlice.ts";
import { PresetSlice } from "@/slices/PresetSlice.ts";
import { WidgetSlice } from "@/slices/WidgetSlice.ts";
import { SpaceSlice } from "@/slices/SpaceSlice.ts";

export const rootReducer = combineReducers({
    [StreamSlice.name]: StreamSlice.reducer,
    [ModalSlice.name]: ModalSlice.reducer,
    [IntersectionSlice.name]: IntersectionSlice.reducer,
    [PresetSlice.name]: PresetSlice.reducer,
    [WidgetSlice.name]: WidgetSlice.reducer,
    [SpaceSlice.name]: SpaceSlice.reducer,
});

