import { use } from "react";
import { SpacesStoreContext } from "@/features/spaces-session/model/context.ts";

export const useSpacesStore = () => {
    const store = use(SpacesStoreContext);
    if (!store) {
        throw new Error("Space session Store has not been installed");
    }
    return store;
}



export const useSpaceListStore = () => {
    const { spaceListStore } = useSpacesStore();
    return spaceListStore;
}

export const useIntersectionStore = () => {
    const { intersectionStore } = useSpacesStore();
    return intersectionStore;
}

export const useSpaceAudioStore = () => {
    const { spaceAudioStore } = useSpacesStore();
    return spaceAudioStore;
}