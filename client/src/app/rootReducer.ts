import { combineReducers } from "@reduxjs/toolkit";
import { StreamSlice } from "@/slices/StreamSlice.ts";

export const rootReducer = combineReducers({
    [StreamSlice.name]: StreamSlice.reducer,
});

