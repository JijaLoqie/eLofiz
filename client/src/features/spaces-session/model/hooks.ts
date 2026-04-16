import { use } from "react";
import { SpacesStoreContext } from "@/features/spaces-session/model/context.ts";

export const useSpacesStore = () => {
    const store = use(SpacesStoreContext);
    if (!store) {
        throw new Error("Category List Store has not been installed");
    }
    return store;
}



export const useSpaceListStore = () => {
    const { spaceListStore } = useSpacesStore();
    return spaceListStore;
}