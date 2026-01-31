import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer.ts";
import { setupListeners } from "@reduxjs/toolkit/query";

function makeStore() {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([])
    });
    setupListeners(store.dispatch);

    return store;
}

export const appStore = makeStore();

