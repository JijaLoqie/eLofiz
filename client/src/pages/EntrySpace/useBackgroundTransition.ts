import { useCallback, useEffect, useState } from "react";

interface UseBackgroundTransitionReturn {
    background: string;
    opacity: number;
    handleSetBackground: (newBack: string) => void;
    clearBackground: (clearedBackground: string) => void;
}

export const useBackgroundTransition = (): UseBackgroundTransitionReturn => {
    const [background, setBackground] = useState("");
    const [busy, setBusy] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const [pendingBackground, setPendingBackground] = useState<string | null>(null);

    // Watch for when busy becomes false, then apply pending background
    useEffect(() => {
        if (!busy && pendingBackground) {
            setBusy(true);
            setBackground(pendingBackground);
            setOpacity(1);
            setPendingBackground(null);
        }
    }, [busy, pendingBackground]);

    const clearBackground = useCallback((clearedBackground: string) => {
        if (clearedBackground === pendingBackground) {
            setPendingBackground(null);
        }
        setBusy(true);
        setOpacity(0);
        setTimeout(() => {
            setBackground("");
            setBusy(false);
        }, 300);
    }, [pendingBackground]);

    const handleSetBackground = useCallback((newBack: string) => {
        if (busy) {
            // Queue the background change
            setPendingBackground(newBack);
            return;
        }

        setBusy(true);
        setBackground(newBack);
        setOpacity(1);
    }, [busy]);

    return {
        background,
        opacity,
        handleSetBackground,
        clearBackground,
    };
};