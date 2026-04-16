import { use, useEffect, useState } from "react";
import { uuid } from "@/shared/utils.ts";
import { Notification } from "./Notification.tsx";
import { NotificationContext } from "./NotificationProvider.tsx";

interface QueuedNotification {
    id: string;
    message: string;
}

export const NotificationContainer = () => {
    const context = use(NotificationContext);
    const [queue, setQueue] = useState<QueuedNotification[]>([]);


    const notificationMessage = context?.value;

    useEffect(() => {
        if (notificationMessage && notificationMessage !== "") {
            const id = uuid();
            setQueue((prev) => [...prev, { id, message: notificationMessage }]);
        }
    }, [notificationMessage]);

    const removeNotification = (id: string) => {
        context?.setValue("");
        setQueue((prev) => prev.filter((notif) => notif.id !== id));
    };

    return (
        <div className="fixed bottom-6 right-6 space-y-3 pointer-events-none z-[200]">
            {queue.map((notif) => (
                <div key={notif.id} className="pointer-events-auto">
                    <Notification
                        message={notif.message}
                        duration={2000}
                        onClose={() => removeNotification(notif.id)}
                    />
                </div>
            ))}
        </div>
    );
};