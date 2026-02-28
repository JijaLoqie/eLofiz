import { createContext, type ReactNode, useCallback, useEffect, useEffectEvent, useState } from "react";
import { EntityType, type ISpace } from "@/types.ts";
import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { selectSpaces } from "@/slices/SpaceSlice.ts";

interface ModalContextType {
    value: EntityType | "";
    setValue: (value: EntityType | "") => void;
}



export const ModalContext = createContext<ModalContextType | undefined>(undefined);



export const ModalProvider = (props: {children: ReactNode}) => {
    const spaces = useSelector((state: RootState): ISpace[] => selectSpaces(state))
    const [type, setType] = useState<EntityType | "">("");

    const toggleItemsList = useEffectEvent((newType: EntityType) => {
        if (type !== newType && spaces.length !== 0) {
            setType(newType)
        } else {
            setType("");
        }
    });

    {/* Keybindings */}
    useEffect(() => {
        const openActions: Record<string, () => void> = {
            "1": () => toggleItemsList(EntityType.WIDGETS),
            "2": () => toggleItemsList(EntityType.PRESETS),
            "3": () => toggleItemsList(EntityType.STREAMS),
        };

        const handleKeyPress = (e: KeyboardEvent) => {
            const handlePress = openActions[e.key];
            if (handlePress) {
                handlePress();
            }

        };

        document.body.addEventListener("keypress", handleKeyPress);
        return () => {
            document.body.removeEventListener("keypress", handleKeyPress);
        }
    }, [type, spaces]);



    return (
        <ModalContext.Provider value={{value: type, setValue: setType}}>
            {props.children}
        </ModalContext.Provider>
    );
}