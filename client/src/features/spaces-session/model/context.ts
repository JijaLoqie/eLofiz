import { createContext } from "react";
import type { SpacesPageStore } from "@/features/spaces-session/model/store.ts";

export const SpacesStoreContext = createContext<null | SpacesPageStore>(null);