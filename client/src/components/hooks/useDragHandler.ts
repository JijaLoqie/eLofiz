import { useEffect, useRef, useCallback, type RefObject } from 'react';

export interface IDraggableOptions {
    onDragStart?: (e: PointerEvent) => void;
    onDrag?: (e: PointerEvent, offsetX: number, offsetY: number) => void;
    onDragEnd?: (e: PointerEvent) => void;
}

export const useDragHandler = (
    selectElementRef: RefObject<HTMLElement>,
    dragElementRef: RefObject<HTMLElement>,
    options: IDraggableOptions = {}
) => {
    const isDraggingRef = useRef(false);
    const offsetRef = useRef({ x: 0, y: 0 });

    const handlePointerDown = useCallback((e: PointerEvent) => {
        if (e.target !== selectElementRef.current) return;
        isDraggingRef.current = true;

        const selectRect = (e.target as HTMLElement).getBoundingClientRect();
        offsetRef.current.x = e.clientX - selectRect.left;
        offsetRef.current.y = e.clientY - selectRect.top;

        options.onDragStart?.(e);
    }, [options]);

    const handlePointerMove = useCallback((e: PointerEvent) => {
        if (!isDraggingRef.current || !dragElementRef.current) return;

        options.onDrag?.(e, offsetRef.current.x, offsetRef.current.y);

        const parent = dragElementRef.current.parentElement;
        if (!parent) return;

        const parentRect = parent.getBoundingClientRect();
        const draggedRect = dragElementRef.current.getBoundingClientRect();

        let x = e.clientX - parentRect.left - offsetRef.current.x;
        let y = e.clientY - parentRect.top - offsetRef.current.y;

        const draggedWidth = draggedRect.width;
        const draggedHeight = draggedRect.height;

        const parentWidth = parent.clientWidth;
        const parentHeight = parent.clientHeight;

        x = Math.max(0, Math.min(x, parentWidth - draggedWidth));
        y = Math.max(0, Math.min(y, parentHeight - draggedHeight));

        dragElementRef.current.style.setProperty('left', `${x}px`);
        dragElementRef.current.style.setProperty('top', `${y}px`);
    }, [options, dragElementRef]);

    const handlePointerUp = useCallback((e: PointerEvent) => {
        isDraggingRef.current = false;
        options.onDragEnd?.(e);
    }, [options]);

    useEffect(() => {
        const selectElement = selectElementRef.current;
        if (!selectElement) return;

        selectElement.addEventListener('pointerdown', handlePointerDown as EventListener);
        document.addEventListener('pointermove', handlePointerMove as EventListener);
        document.addEventListener('pointerup', handlePointerUp as EventListener);

        return () => {
            selectElement.removeEventListener('pointerdown', handlePointerDown as EventListener);
            document.removeEventListener('pointermove', handlePointerMove as EventListener);
            document.removeEventListener('pointerup', handlePointerUp as EventListener);
        };
    }, [selectElementRef, handlePointerDown, handlePointerMove, handlePointerUp]);
};