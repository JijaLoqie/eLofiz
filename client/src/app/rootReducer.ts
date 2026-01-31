import { combineReducers } from "@reduxjs/toolkit";
import { StreamSlice } from "@/slices/StreamSlice.ts";
import { ModalSlice } from "@/slices/ModalSlice.ts";
import { IntersectionSlice } from "@/slices/IntersectionSlice.ts";

export const rootReducer = combineReducers({
    [StreamSlice.name]: StreamSlice.reducer,
    [ModalSlice.name]: ModalSlice.reducer,
    [IntersectionSlice.name]: IntersectionSlice.reducer,
});

