export interface IResizeOptions {
    onResizeStart?: (e: PointerEvent) => void;
    onResize?: (e: PointerEvent, width: number, height: number) => void;
    onResizeEnd?: (e: PointerEvent) => void;
    minWidth?: number;
    minHeight?: number;
}

type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export class ResizeHandler {
    private isResizing = false;
    private resizeElement: HTMLElement;
    private options: IResizeOptions;
    private currentEdge: ResizeEdge | null = null;

    private startX = 0;
    private startY = 0;
    private startWidth = 0;
    private startHeight = 0;
    private startLeft = 0;
    private startTop = 0;

    private boundHandlePointerDown: (e: PointerEvent) => void;
    private boundHandlePointerMove: (e: PointerEvent) => void;
    private boundHandlePointerMove_global: (e: PointerEvent) => void;
    private boundHandlePointerUp_global: (e: PointerEvent) => void;

    private readonly handleSize = 10;
    private readonly minWidth: number;
    private readonly minHeight: number;

    constructor(resizeElement: HTMLElement, options: IResizeOptions = {}) {
        this.resizeElement = resizeElement;
        this.options = options;
        this.minWidth = options.minWidth || 200;
        this.minHeight = options.minHeight || 100;

        this.boundHandlePointerDown = (e) => this.handlePointerDown(e);
        this.boundHandlePointerMove = (e) => this.handlePointerMove(e);
        this.boundHandlePointerMove_global = (e) => this.handlePointerMove_global(e);
        this.boundHandlePointerUp_global = (e) => this.handlePointerUp_global(e);

        this.init();
    }

    private init(): void {
        // Set initial dimensions if not already set
        const rect = this.resizeElement.getBoundingClientRect();
        if (!this.resizeElement.style.width) {
            this.resizeElement.style.width = `${rect.width}px`;
        }
        if (!this.resizeElement.style.height) {
            this.resizeElement.style.height = `${rect.height}px`;
        }

        // Remove max-width/max-height that might constrain resizing
        this.resizeElement.style.maxWidth = 'none';
        this.resizeElement.style.maxHeight = 'none';

        this.resizeElement.addEventListener("pointermove", this.boundHandlePointerMove);
        this.resizeElement.addEventListener("pointerdown", this.boundHandlePointerDown);
    }

    private getResizeEdge(e: PointerEvent): ResizeEdge | null {
        const rect = this.resizeElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const isLeft = x < this.handleSize;
        const isRight = x > rect.width - this.handleSize;
        const isTop = y < this.handleSize;
        const isBottom = y > rect.height - this.handleSize;

        if (isTop && isLeft) return 'nw';
        if (isTop && isRight) return 'ne';
        if (isBottom && isLeft) return 'sw';
        if (isBottom && isRight) return 'se';
        if (isBottom) return 's';
        if (isRight) return 'e';

        return null;
    }

    private updateCursor(edge: ResizeEdge | null = null): void {
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
        this.resizeElement.style.cursor = edge ? cursorMap[edge] : 'auto';
    }

    private handlePointerDown(e: PointerEvent): void {
        const edge = this.getResizeEdge(e);
        if (!edge) return;

        this.isResizing = true;
        this.currentEdge = edge;

        const rect = this.resizeElement.getBoundingClientRect();
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.startWidth = rect.width;
        this.startHeight = rect.height;
        this.startLeft = rect.left;
        this.startTop = rect.top;

        e.preventDefault();

        document.addEventListener("pointermove", this.boundHandlePointerMove_global);
        document.addEventListener("pointerup", this.boundHandlePointerUp_global);
    }

    private handlePointerMove(e: PointerEvent): void {
        const edge = this.getResizeEdge(e);
        this.updateCursor(edge);
    }

    private handlePointerMove_global(e: PointerEvent): void {
        if (!this.isResizing || !this.currentEdge) return;

        const deltaX = e.clientX - this.startX;
        const deltaY = e.clientY - this.startY;

        let newWidth = this.startWidth;
        let newHeight = this.startHeight;
        let newLeft = this.startLeft;
        let newTop = this.startTop;

        const edge = this.currentEdge;

        // Handle width changes
        if (edge.includes('e')) {
            newWidth = Math.max(this.minWidth, this.startWidth + deltaX);
        }
        if (edge.includes('w')) {
            newWidth = Math.max(this.minWidth, this.startWidth - deltaX);
            if (newWidth >= this.minWidth) {
                newLeft = this.startLeft + deltaX;
            }
        }

        // Handle height changes
        if (edge.includes('s')) {
            newHeight = Math.max(this.minHeight, this.startHeight + deltaY);
        }
        if (edge.includes('n')) {
            newHeight = Math.max(this.minHeight, this.startHeight - deltaY);
            if (newHeight >= this.minHeight) {
                newTop = this.startTop + deltaY;
            }
        }

        // Apply width and height changes
        this.resizeElement.style.width = `${newWidth}px`;
        this.resizeElement.style.height = `${newHeight}px`;


        this.options.onResize?.(e, newWidth, newHeight);
    }

    private handlePointerUp_global(e: PointerEvent): void {
        this.isResizing = false;
        this.currentEdge = null;

        document.removeEventListener("pointermove", this.boundHandlePointerMove_global);
        document.removeEventListener("pointerup", this.boundHandlePointerUp_global);

        this.options.onResizeEnd?.(e);
    }
}