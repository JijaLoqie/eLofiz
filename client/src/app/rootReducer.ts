import { combineReducers } from "@reduxjs/toolkit";
import { StreamSlice } from "@/entities/stream/model/StreamSlice.ts";
import { IntersectionSlice } from "@/pages/spaces/model/IntersectionSlice.ts";
import { PresetSlice } from "@/entities/preset/model/PresetSlice.ts";
import { WidgetSlice } from "@/entities/widget/model/WidgetSlice.ts";
import { SpaceSlice } from "@/entities/space/model/SpaceSlice.ts";
import { baseApi } from "@/shared/api";

export const rootReducer = combineReducers({
    [StreamSlice.name]: StreamSlice.reducer,
    [IntersectionSlice.name]: IntersectionSlice.reducer,
    [PresetSlice.name]: PresetSlice.reducer,
    [WidgetSlice.name]: WidgetSlice.reducer,
    [SpaceSlice.name]: SpaceSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

