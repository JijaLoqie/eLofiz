import { type FC, type ReactNode, useEffect } from "react";
import { SpacesStoreContext } from "@/features/spaces-session/model/context.ts";
import { useLocalStore } from "@/shared/hooks/use-local-store.ts";
import { SpacesPageStore } from "@/features/spaces-session/model/store.ts";
import { useIntersectionSpaceHandler } from "@/shared/hooks/useIntersectionSpaceHandler.ts";
import { observer } from "mobx-react-lite";

export const SpacesSessionProvider: FC<{children: ReactNode}> = observer(({children}) => {
    let store = useLocalStore(() => new SpacesPageStore());
    const {
        currentSpaceName,
        spaceMetrics,
    } = useIntersectionSpaceHandler(store.spaceListStore.spaces);

    useEffect(() => {
        store.intersectionStore.setCurrentSpace(currentSpaceName);
    }, [currentSpaceName]);

    useEffect(() => {
        store.intersectionStore.updateSpaceMetrics(spaceMetrics);
    }, [spaceMetrics]);
    return (
        <SpacesStoreContext.Provider value={store}>{children}</SpacesStoreContext.Provider>
    )
});