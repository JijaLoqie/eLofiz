import { formatDuration } from "./AudioUtils.ts";

export class TimelineManager {
    private breakpoints: number[] = [];
    private timelineElement: HTMLElement | null = null;
    private maxDuration: number = 100000;
    private draggedIndex: number | null = null;

    constructor(
        private onBreakpointChange: (breakpoints: number[]) => void
    ) {}

    setTimelineElement(element: HTMLElement) {
        this.timelineElement = element;
        this.attachEventListeners();
    }

    setBreakpoints(breakpoints: number[]) {
        this.breakpoints = [...breakpoints].sort((a, b) => a - b);
        this.render();
    }

    setMaxDuration(duration: number) {
        this.maxDuration = duration;
    }

    private attachEventListeners() {
        if (!this.timelineElement) return;

        // Left click to add breakpoint
        this.timelineElement.addEventListener("click", (e) => {
            if (this.draggedIndex !== null) return; // Ignore if we were dragging

            const rect = this.timelineElement!.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const newBreakpoint = Math.round(percentage * this.maxDuration);

            this.breakpoints.push(newBreakpoint);
            this.breakpoints.sort((a, b) => a - b);
            this.onBreakpointChange(this.breakpoints);
            this.render();
        });

        // Right click to remove breakpoint
        this.timelineElement.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            const target = e.target as HTMLElement;

            // Check if clicking on a breakpoint
            const breakpointEl = target.closest(".stream-editor__breakpoint");
            if (breakpointEl) {
                const index = Array.from(
                    this.timelineElement!.querySelectorAll(".stream-editor__breakpoint")
                ).indexOf(breakpointEl);

                if (index !== -1) {
                    this.breakpoints.splice(index, 1);
                    this.onBreakpointChange(this.breakpoints);
                    this.render();
                }
            }
        });
    }

    private render() {
        if (!this.timelineElement) return;

        // Clear existing breakpoints
        const existingBreakpoints = this.timelineElement.querySelectorAll(
            ".stream-editor__breakpoint"
        );
        existingBreakpoints.forEach((bp) => bp.remove());

        // Render new breakpoints
        this.breakpoints.forEach((bp, index) => {
            const percentage = (bp / this.maxDuration) * 100;
            const breakpointEl = document.createElement("div");
            breakpointEl.className = "stream-editor__breakpoint";
            breakpointEl.style.left = `${percentage}%`;
            breakpointEl.dataset.index = String(index);

            const labelEl = document.createElement("div");
            labelEl.className = "stream-editor__breakpoint-label";
            labelEl.textContent = formatDuration(Math.round(bp));

            breakpointEl.appendChild(labelEl);

            this.attachDragListener(breakpointEl, index);

            this.timelineElement!.appendChild(breakpointEl);
        });
    }

    private attachDragListener(element: HTMLElement, index: number) {
        element.addEventListener("mousedown", (e) => {
            if (e.button !== 0) return; // Left click only
            e.preventDefault();
            this.draggedIndex = index;

            const onMouseMove = (moveEvent: MouseEvent) => {
                if (!this.timelineElement) return;

                const rect = this.timelineElement.getBoundingClientRect();
                const currentX = moveEvent.clientX - rect.left;
                const newPercentage = Math.max(
                    0,
                    Math.min(100, (currentX / rect.width) * 100)
                );

                this.breakpoints[index] = Math.round(
                    (newPercentage / 100) * this.maxDuration
                );
                this.breakpoints.sort((a, b) => a - b);
                this.onBreakpointChange(this.breakpoints);
                this.render();
            };

            const onMouseUp = () => {
                this.draggedIndex = null;
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    }
}