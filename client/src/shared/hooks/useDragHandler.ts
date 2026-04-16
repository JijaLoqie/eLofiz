import { useEffect, useCallback, type RefObject, useState, useEffectEvent, useRef, useMemo } from 'react';

const minMax = (value: number, minValue: number, maxValue: number) =>
    Math.max(minValue, Math.min(value, maxValue))

export interface IDraggableOptions {
    onDragStart?: (e: PointerEvent) => void;
    onDrag?: (e: PointerEvent, offsetX: number, offsetY: number) => void;
    onDragEnd?: (e: PointerEvent) => void;
    manual?: boolean;
}

export const useDragHandler = (data: {selectElementRef: RefObject<HTMLElement>, dragElementRef: RefObject<HTMLElement>, dragContainer: RefObject<HTMLElement>, options: IDraggableOptions}) => {
    const { selectElementRef, dragElementRef, options } = data;
    const { manual = false } = options;
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handlePointerMove = useEffectEvent((e: PointerEvent) => {
        if (!dragging || !dragElementRef.current) return;

        const parent = dragElementRef.current.parentElement;
        if (!parent) return;

        const parentRect = parent.getBoundingClientRect();
        const draggedRect = dragElementRef.current.getBoundingClientRect();

        let x = e.clientX - parentRect.left - offset.x;
        let y = e.clientY - parentRect.top - offset.y;

        const draggedWidth = draggedRect.width;
        const draggedHeight = draggedRect.height;

        const parentWidth = parent.clientWidth;
        const parentHeight = parent.clientHeight;

        x = minMax(x, 0, parentWidth - draggedWidth);
        y = minMax(y, 0, parentHeight - draggedHeight);

        if (!manual) {
            dragElementRef.current.style.setProperty('left', `${x}px`);
            dragElementRef.current.style.setProperty('top', `${y}px`);
        }

        options.onDrag?.(e, minMax(e.clientX - parentRect.left, 0, parentWidth), minMax(e.clientY - parentRect.top, 0, parentHeight));
    });

    const handlePointerUp = useEffectEvent((e: PointerEvent) => {
        setDragging(false);
        if (e.target === dragElementRef.current) {
            options.onDragEnd?.(e);
        }
    });

    const handlePointerDown = useEffectEvent((e: PointerEvent) => {
        if (e.target !== selectElementRef.current) return;

        setDragging(true);
        const selectRect = (e.target as HTMLElement).getBoundingClientRect();
        setOffset({
            x: e.clientX - selectRect.left,
            y: e.clientY - selectRect.top,
        });

        options.onDragStart?.(e);
    });

    useEffect(() => {
        const selectElement = selectElementRef.current;
        if (!selectElement) return;
        const container = dragElementRef.current?.parentElement;
        if (!container) return;

        selectElement.addEventListener('pointerdown', handlePointerDown);
        container.addEventListener('pointermove', handlePointerMove);
        container.addEventListener('pointerup', handlePointerUp);

        return () => {
            selectElement.removeEventListener('pointerdown', handlePointerDown);
            if (!container) return;
            container.removeEventListener('pointermove', handlePointerMove);
            container.removeEventListener('pointerup', handlePointerUp);
        };
    }, [selectElementRef.current, dragElementRef.current]);
};