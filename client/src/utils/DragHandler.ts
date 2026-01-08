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

    constructor(selectElement: HTMLElement, dragElement: HTMLElement, options: IDraggableOptions = {}) {
        this.selectElement = selectElement;
        this.draggedElement = dragElement;
        this.options = options;
        this.init();
    }

    private init(): void {
        this.selectElement.addEventListener("pointerdown", (e) => this.handlePointerDown(e));
        document.addEventListener("pointermove", (e) => this.handlePointerMove(e));
        document.addEventListener("pointerup", (e) => this.handlePointerUp(e));
    }

    private handlePointerDown(e: PointerEvent): void {
        this.isDragging = true;

        // Calculate offset between pointer and element
        const rect = this.selectElement.getBoundingClientRect();
        this.offsetX = e.clientX - rect.left;
        this.offsetY = e.clientY - rect.top;

        this.options.onDragStart?.(e);
    }

    private handlePointerMove(e: PointerEvent): void {
        if (!this.isDragging) return;

        this.options.onDrag?.(e, this.offsetX, this.offsetY);
        this.draggedElement.style.setProperty("left", `${e.clientX - this.offsetX}px`);
        this.draggedElement.style.setProperty("top", `${e.clientY - this.offsetY}px`);
    }

    private handlePointerUp(e: PointerEvent): void {
        this.isDragging = false;
        this.options.onDragEnd?.(e);
    }

    public destroy(): void {
        document.removeEventListener("pointermove", (e) => this.handlePointerMove(e));
        document.removeEventListener("pointerup", (e) => this.handlePointerUp(e));
    }
}