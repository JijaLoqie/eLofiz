export interface IDraggableOptions {
    onDragStart?: (e: PointerEvent) => void;
    onDrag?: (e: PointerEvent, offsetX: number, offsetY: number) => void;
    onDragEnd?: (e: PointerEvent) => void;
}

export class DragHandler {
    private isDragging = false;
    private selectElement: HTMLElement;
    private draggedElement: HTMLElement;
    private options: IDraggableOptions;
    private offsetX = 0;
    private offsetY = 0;

    private boundHandlePointerDown: (e: PointerEvent) => void;
    private boundHandlePointerMove: (e: PointerEvent) => void;
    private boundHandlePointerUp: (e: PointerEvent) => void;

    constructor(selectElement: HTMLElement, dragElement: HTMLElement, options: IDraggableOptions = {}) {
        this.selectElement = selectElement;
        this.draggedElement = dragElement;
        this.options = options;

        this.boundHandlePointerDown = (e) => this.handlePointerDown(e);
        this.boundHandlePointerMove = (e) => this.handlePointerMove(e);
        this.boundHandlePointerUp = (e) => this.handlePointerUp(e);

        this.init();
    }

    private init(): void {
        this.selectElement.addEventListener("pointerdown", this.boundHandlePointerDown);
        document.addEventListener("pointermove", this.boundHandlePointerMove);
        document.addEventListener("pointerup", this.boundHandlePointerUp);
    }

    private handlePointerDown(e: PointerEvent): void {
        this.isDragging = true;

        const selectRect = this.selectElement.getBoundingClientRect();

        // Calculate offset between pointer and element position
        this.offsetX = e.clientX - selectRect.left;
        this.offsetY = e.clientY - selectRect.top;

        this.options.onDragStart?.(e);
    }

    private handlePointerMove(e: PointerEvent): void {
        if (!this.isDragging) return;

        this.options.onDrag?.(e, this.offsetX, this.offsetY);

        // Get parent element's position and dimensions
        const parent = this.draggedElement.parentElement;
        if (!parent) return;

        const parentRect = parent.getBoundingClientRect();
        const draggedRect = this.draggedElement.getBoundingClientRect();

        // Calculate unconstrained position
        let x = e.clientX - parentRect.left - this.offsetX;
        let y = e.clientY - parentRect.top - this.offsetY;

        // Get dragged element's dimensions
        const draggedWidth = draggedRect.width;
        const draggedHeight = draggedRect.height;

        // Get parent's dimensions
        const parentWidth = parent.clientWidth;
        const parentHeight = parent.clientHeight;

        // Apply boundary constraints
        // Minimum: 0, Maximum: parentSize - draggedSize
        x = Math.max(0, Math.min(x, parentWidth - draggedWidth));
        y = Math.max(0, Math.min(y, parentHeight - draggedHeight));

        this.draggedElement.style.setProperty("left", `${x}px`);
        this.draggedElement.style.setProperty("top", `${y}px`);
    }

    private handlePointerUp(e: PointerEvent): void {
        this.isDragging = false;
        this.options.onDragEnd?.(e);
    }

    public destroy(): void {
        this.selectElement.removeEventListener("pointerdown", this.boundHandlePointerDown);
        document.removeEventListener("pointermove", this.boundHandlePointerMove);
        document.removeEventListener("pointerup", this.boundHandlePointerUp);
    }
}