import type { FC } from "react";
import { useEffect } from "react";

interface NotificationProps {
    message: string;
    duration?: number;
    onClose?: () => void;
    type?: "success" | "error" | "info" | "warning";
}

const TYPE_COLORS = {
    success: "from-green-500 to-emerald-600",
    error: "from-red-500 to-red-600",
    info: "from-blue-500 to-blue-600",
    warning: "from-yellow-500 to-yellow-600",
};

const PROGRESS_COLORS = {
    success: "bg-emerald-400",
    error: "bg-red-400",
    info: "bg-blue-400",
    warning: "bg-yellow-400",
};

export const Notification: FC<NotificationProps> = ({
                                                        message,
                                                        duration = 2000,
                                                        onClose,
                                                        type = "success",
                                                    }) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose?.(), duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={`bg-gradient-to-r ${TYPE_COLORS[type]} text-white px-6 py-4 rounded-lg shadow-lg overflow-hidden`}
            style={{
                animation: `slideIn 0.3s ease-out, slideOut 0.3s ease-out ${duration - 300}ms forwards`,
            }}
        >
            <div className="flex items-center justify-between gap-4 mb-2">
                <span className="font-medium">{message}</span>
                <button
                    onClick={onClose}
                    className="text-white hover:text-gray-200 text-xl font-bold hover:scale-110"
                >
                    &times;
                </button>
            </div>

            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                    className={`h-full ${PROGRESS_COLORS[type]}`}
                    style={{
                        animation: `progress ${duration - 300}ms linear forwards`,
                    }}
                />
                <style>{`
                    @keyframes progress {
                        from {
                            width: 100%;
                        }
                        to {
                            width: 0%;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};