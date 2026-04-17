import { use } from "react";
import { PreloadStoreContext } from "@/features/preload-session/store/context.ts";

const usePreloadStore = () => {
    const preloadStore = use(PreloadStoreContext);
    if (!preloadStore) {
        throw new Error("Preload Store has not been installed");
    }
    return preloadStore;
};

export const useWidgetStore = () => {
    const { widgetStore } = usePreloadStore();
    return widgetStore;
}
export const usePresetStore = () => {
    const { presetStore } = usePreloadStore();
    return presetStore;
}
export const useStreamStore = () => {
    const { streamStore } = usePreloadStore();
    return streamStore;
}