import { createContext, type ReactNode, useCallback, useEffect, useEffectEvent, useState } from "react";
import { EntityType } from "@/types.ts";

interface ModalContextType {
    value: EntityType | "";
    setValue: (value: EntityType | "") => void;
}



export const ModalContext = createContext<ModalContextType | undefined>(undefined);



export const ModalProvider = (props: {children: ReactNode}) => {
    const [type, setType] = useState<EntityType | "">("");

    const toggleItemsList = useEffectEvent((newType: EntityType) => {
        if (type !== newType) {
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
    }, [type]);



    return (
        <ModalContext.Provider value={{value: type, setValue: setType}}>
            {props.children}
        </ModalContext.Provider>
    );
}