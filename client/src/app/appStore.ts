import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer.ts";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AudioMiddleware } from "@/middlewares/AudioMiddleware.ts";

function makeStore() {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([AudioMiddleware])
    });
    setupListeners(store.dispatch);

    return store;
}

export const appStore = makeStore();

