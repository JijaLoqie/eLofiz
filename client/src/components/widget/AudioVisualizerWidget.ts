import { Component } from "../../base";
import { cloneTemplate, ensureElement } from "../../utils";
import type { IAudioVisualizerWidget } from "../../types.ts";
import { webAudioApi } from "../../modules/WebAudioApi.ts";
import {ResizeHandler} from "../../utils/ResizeHandler.ts";

export class AudioVisualizerWidget extends Component<IAudioVisualizerWidget> {
    private analyser: AnalyserNode;
    private dataArray: Uint8Array<ArrayBuffer>;
    private animationId: number | null = null;
    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;


    private resizeHandler: ResizeHandler;

    constructor(spaceId: string) {
        super(cloneTemplate("#widget-audio-visualizer-template"));

        // Get canvas and context
        this.canvas = ensureElement<HTMLCanvasElement>("canvas", this.container);
        this.canvasContext = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.resizeCanvas();

        // Setup Web Audio API
        this.analyser = webAudioApi.getAnalyser(spaceId);

        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

        // Handle window resize
        window.addEventListener("resize", () => this.resizeCanvas());
        this.resizeHandler = new ResizeHandler(this.container, {
            minWidth: 300,
            minHeight: 100,
            onResize: (e, width, height) => {
                console.log("Resize", width, height);
                this.resizeCanvas(width, height);
            },
        });

        // Start animation loop
        this.startVisualization();
    }

    private startVisualization(): void {
        const draw = () => {
            this.animationId = requestAnimationFrame(draw);
            this.analyser.getByteFrequencyData(this.dataArray);
            this.drawVisualizer();
        };
        draw();
    }

    private drawVisualizer(): void {
        const width = this.canvas.width;
        const height = this.canvas.height;

        // Clear canvas with fade effect
        this.canvasContext.fillStyle = "rgba(15, 23, 42, 0.2)";
        this.canvasContext.fillRect(0, 0, width, height);

        const barWidth = (width / this.dataArray.length) * 2.5;
        let x = 0;

        for (let i = 0; i < this.dataArray.length; i++) {
            const barHeight = (this.dataArray[i] / 255) * height;

            // Create gradient
            const gradient = this.canvasContext.createLinearGradient(0, height - barHeight, 0, height);
            gradient.addColorStop(0, "#00ff88");
            gradient.addColorStop(0.5, "#00ccff");
            gradient.addColorStop(1, "#0088ff");

            this.canvasContext.fillStyle = gradient;
            this.canvasContext.fillRect(x, height - barHeight, barWidth - 2, barHeight);

            // Add glow effect
            this.canvasContext.strokeStyle = "rgba(0, 255, 136, 0.5)";
            this.canvasContext.lineWidth = 1;
            this.canvasContext.strokeRect(x, height - barHeight, barWidth - 2, barHeight);

            x += barWidth;
        }
    }

    private resizeCanvas(newWidth: number = 300, newHeight: number = 100): void {
        if (!this.canvas) return;

        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
    }
}