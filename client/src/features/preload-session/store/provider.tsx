import type { FC, ReactNode } from "react";
import { PreloadStoreContext } from "@/features/preload-session/store/context.ts";
import { useLocalStore } from "@/shared/hooks/use-local-store.ts";
import { PreloadStore } from "@/features/preload-session/store/store.ts";

export const PreloadStoreProvider: FC<{children: ReactNode}> = ({children}) => {
    const store = useLocalStore(() => new PreloadStore());

    return (
        <PreloadStoreContext.Provider value={store}>{children}</PreloadStoreContext.Provider>
    )
}