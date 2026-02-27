import React from "react";
import ReactDOM from "react-dom/client";
import { appStore } from "@/app/appStore.ts";
import { ensureElement } from "@/utils";
import { Provider } from "react-redux";
import { AppEntry } from "@/app/appEntry.tsx";



const modalEditRoot = ReactDOM.createRoot(ensureElement("#root"));
modalEditRoot.render(
    <Provider store={appStore}>
        <AppEntry />
    </Provider>
);





export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;