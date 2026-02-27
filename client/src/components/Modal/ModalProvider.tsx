import { createContext, type ReactNode, useCallback, useEffect, useEffectEvent, useState } from "react";
import { EntityType } from "@/types.ts";

interface ModalContextType {
    value: EntityType | "";
    setValue: (value: EntityType | "") => void;
}

interface NotificationContextType {
    value: string;
    setValue: (value: string) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);
export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
// export const NotificationContext = createContext<EntityType | "">("");







export const ModalProvider = (props: {children: ReactNode}) => {
    const [type, setType] = useState<EntityType | "">("");
    const [notification, setNotification] = useState<string>("");
    const [counter, setCounter] = useState<number>(0);

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

    const handleNotification = useCallback((value: string) => {
        if (value === "") {
            setNotification(value);
        }
        if (value !== notification) {
            setCounter(0);
            setNotification(value);
        } else {
            setNotification(`${value} (${counter + 1})`);
            setCounter(counter + 1);
        }
    }, [notification, counter])

    return (
        <NotificationContext.Provider value={{value: "", setValue: handleNotification}}>
            <ModalContext.Provider value={{value: type, setValue: setType}}>
                {props.children}
            </ModalContext.Provider>
        </NotificationContext.Provider>
    );
}