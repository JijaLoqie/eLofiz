import { createContext, type ReactNode, useCallback, useState } from "react";


interface NotificationContextType {
    value: string;
    setValue: (value: string) => void;
}


export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);


export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notification, setNotification] = useState<string>("");
    const [counter, setCounter] = useState<number>(0);


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
    }, [notification, counter]);
    return (
        <NotificationContext.Provider value={{value: notification, setValue: handleNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}