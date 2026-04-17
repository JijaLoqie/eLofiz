import { createContext } from "react";
import type { PreloadStore } from "@/features/preload-session/store/store.ts";

export const PreloadStoreContext = createContext<null | PreloadStore>(null);