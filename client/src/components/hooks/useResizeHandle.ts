import { useRef, useEffect, useCallback, useState, type RefObject } from 'react';

interface IResizeOptions {
    container: RefObject<HTMLElement>;
    onResizeStart?: (e: PointerEvent) => void;
    onResize?: (e: PointerEvent, width: number, height: number) => void;
    onResizeEnd?: (e: PointerEvent) => void;
    minWidth?: number;
    minHeight?: number;
}

type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const useResizeHandler = (options: IResizeOptions) => {
    const {container} = options;
    const resizeRef = useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [currentEdge, setCurrentEdge] = useState<ResizeEdge | null>(null);

    // Store state in refs to avoid closure issues
    const stateRef = useRef({
        isResizing: false,
        currentEdge: null as ResizeEdge | null,
        startX: 0,
        startY: 0,
        startWidth: 0,
        startHeight: 0,
        startLeft: 0,
        startTop: 0,
    });

    const handleSize = 10;
    const minWidth = options.minWidth || 200;
    const minHeight = options.minHeight || 100;

    const getResizeEdge = useCallback((e: PointerEvent): ResizeEdge | null => {
        if (!resizeRef.current) return null;

        const rect = resizeRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const isLeft = x < handleSize;
        const isRight = x > rect.width - handleSize;
        const isTop = y < handleSize;
        const isBottom = y > rect.height - handleSize;

        if (isTop && isLeft) return 'nw';
        if (isTop && isRight) return 'ne';
        if (isBottom && isLeft) return 'sw';
        if (isBottom && isRight) return 'se';
        if (isBottom) return 's';
        if (isRight) return 'e';

        return null;
    }, [handleSize]);

    const updateCursor = useCallback((edge: ResizeEdge | null = null): void => {
        if (!resizeRef.current) return;

        const cursorMap: Record<ResizeEdge, string> = {
            'n': 'ns-resize',
            's': 'ns-resize',
            'e': 'ew-resize',
            'w': 'ew-resize',
            'ne': 'nesw-resize',
            'nw': 'nwse-resize',
            'se': 'nwse-resize',
            'sw': 'nesw-resize',
        };
        resizeRef.current.style.cursor = edge ? cursorMap[edge] : 'auto';
    }, []);

    const handlePointerMove = useCallback((e: PointerEvent): void => {
        const edge = getResizeEdge(e);
        updateCursor(edge);
    }, [getResizeEdge, updateCursor]);

    const handlePointerMove_global = useCallback((e: PointerEvent): void => {
        const state = stateRef.current;
        if (!state.isResizing || !state.currentEdge) return;

        const deltaX = e.clientX - state.startX;
        const deltaY = e.clientY - state.startY;

        let newWidth = state.startWidth;
        let newHeight = state.startHeight;
        let newLeft = state.startLeft;
        let newTop = state.startTop;

        const edge = state.currentEdge;

        // Handle width changes
        if (edge.includes('e')) {
            newWidth = Math.max(minWidth, state.startWidth + deltaX);
        }
        if (edge.includes('w')) {
            newWidth = Math.max(minWidth, state.startWidth - deltaX);
            if (newWidth >= minWidth) {
                newLeft = state.startLeft + deltaX;
            }
        }

        // Handle height changes
        if (edge.includes('s')) {
            newHeight = Math.max(minHeight, state.startHeight + deltaY);
        }
        if (edge.includes('n')) {
            newHeight = Math.max(minHeight, state.startHeight - deltaY);
            if (newHeight >= minHeight) {
                newTop = state.startTop + deltaY;
            }
        }

        // Apply width and height changes
        if (resizeRef.current) {
            resizeRef.current.style.width = `${newWidth}px`;
            resizeRef.current.style.height = `${newHeight}px`;
        }

        options.onResize?.(e, newWidth, newHeight);
    }, [minWidth, minHeight, options]);

    const handlePointerUp_global = useCallback((e: PointerEvent): void => {
        stateRef.current.isResizing = false;
        stateRef.current.currentEdge = null;
        setIsResizing(false);
        setCurrentEdge(null);

        container.current.removeEventListener("pointermove", handlePointerMove_global);
        document.removeEventListener("pointerup", handlePointerUp_global);

        options.onResizeEnd?.(e);
    }, [options]);

    const handlePointerDown = useCallback((e: PointerEvent): void => {
        const edge = getResizeEdge(e);
        if (!edge) return;

        if (!resizeRef.current) return;

        const rect = resizeRef.current.getBoundingClientRect();

        stateRef.current = {
            isResizing: true,
            currentEdge: edge,
            startX: e.clientX,
            startY: e.clientY,
            startWidth: rect.width,
            startHeight: rect.height,
            startLeft: rect.left,
            startTop: rect.top,
        };

        setIsResizing(true);
        setCurrentEdge(edge);

        e.preventDefault();

        container.current.addEventListener("pointermove", handlePointerMove_global as EventListener);
        document.addEventListener("pointerup", handlePointerUp_global as EventListener);

        options.onResizeStart?.(e);
    }, [getResizeEdge, handlePointerMove_global, handlePointerUp_global, options]);

    // Initialize resize element
    useEffect(() => {
        if (!resizeRef.current) return;

        const rect = resizeRef.current.getBoundingClientRect();
        if (!resizeRef.current.style.width) {
            resizeRef.current.style.width = `${rect.width}px`;
        }
        if (!resizeRef.current.style.height) {
            resizeRef.current.style.height = `${rect.height}px`;
        }

        resizeRef.current.style.maxWidth = 'none';
        resizeRef.current.style.maxHeight = 'none';

        resizeRef.current.addEventListener("pointermove", handlePointerMove as EventListener);
        resizeRef.current.addEventListener("pointerdown", handlePointerDown as EventListener);

        return () => {
            if (resizeRef.current) {
                resizeRef.current.removeEventListener("pointermove", handlePointerMove as EventListener);
                resizeRef.current.removeEventListener("pointerdown", handlePointerDown as EventListener);
            }
        };
    }, [handlePointerMove, handlePointerDown]);

    return { resizeRef, isResizing, currentEdge };
};

export default useResizeHandler;