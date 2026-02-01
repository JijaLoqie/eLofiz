import React from "react";
import ReactDOM from "react-dom/client";
import { app } from "./app/LofiApp.ts";
import { EntityType, ModalType } from "./types.ts";
import { AudioManagerMiddleware } from "./middlewares/AudioManagerMiddleware.ts";
import { appStore } from "@/app/appStore.ts";
import { ensureElement } from "@/utils";
import { Provider } from "react-redux";
import { AppEntry } from "@/app/appEntry.tsx";
import { toggleItemsList } from "@/slices/ModalSlice.ts";


const openActions: Record<string, () => void> = {
    "1": () => appStore.dispatch(toggleItemsList(EntityType.WIDGETS)),
    "2": () => appStore.dispatch(toggleItemsList(EntityType.PRESETS)),
    "3": () => appStore.dispatch(toggleItemsList(EntityType.STREAMS)),
}

document.body.addEventListener("keypress", (e) => {
    const handlePress = openActions[e.key];
    if (handlePress) {
        handlePress();
    }

})

const modalEditRoot = ReactDOM.createRoot(ensureElement("#root"));
modalEditRoot.render(
    <Provider store={appStore}>
        <AppEntry />
    </Provider>
);

app.use(AudioManagerMiddleware);




export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;