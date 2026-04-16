import type { FC, ReactNode } from "react";
import { SpacesStoreContext } from "@/features/spaces-session/model/context.ts";
import { useLocalStore } from "@/shared/hooks/use-local-store.ts";
import { SpacesPageStore } from "@/features/spaces-session/model/store.ts";

export const SpacesSessionProvider: FC<{children: ReactNode}> = ({children}) => {
    let store = useLocalStore(() => new SpacesPageStore());
    return (
        <SpacesStoreContext.Provider value={store}>{children}</SpacesStoreContext.Provider>
    )
}