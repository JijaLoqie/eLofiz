import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer.ts";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AudioMiddleware } from "@/middlewares/AudioMiddleware.ts";
import { baseApi } from "@/utils/api";

function makeStore() {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([
                baseApi.middleware,
                AudioMiddleware
            ])
    });
    setupListeners(store.dispatch);

    return store;
}

export const appStore = makeStore();

