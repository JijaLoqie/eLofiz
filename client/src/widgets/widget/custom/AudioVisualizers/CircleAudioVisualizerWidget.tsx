import { useAnalyzer } from "@/shared/hooks/useAnalyzer.ts";
import { useCallback, useEffect, useRef, useState } from "react";

interface AudioVisualizerWidgetProps {
    spaceId: string;
}
const fftSize = 256
export const CircleAudioVisualizerWidget = (props: AudioVisualizerWidgetProps) => {
    const { spaceId } = props;
    const { analyser } = useAnalyzer({ spaceId, fftSize });
    const [dimensions, setDimensions] = useState({ width: 300, height: 150 });
    const dataArray = useRef(new Uint8Array(fftSize));
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

    const [averageFrequency, setAverageFrequency] = useState(0); // State for smoothing frequency

    const drawVisualizer = useCallback((width: number, height: number) => {
        if (!canvasRef.current || !canvasContextRef.current) return;

        const ctx = canvasContextRef.current;
        const centerX = width / 2;
        const centerY = height / 2;

        // Clear the canvas
        ctx.clearRect(0, 0, width, height);
        ctx.save(); // Save the current state

        const currentAverageFrequency = dataArray.current.reduce((a, b) => a + b) / dataArray.current.length;
        setAverageFrequency(prev => prev + (currentAverageFrequency - prev) * 0.1); // Smooth frequency change

        const radius = -80; // Radius offset

        ctx.beginPath(); // Start a new path
        for (let i = 0; i < dataArray.current.length; i++) {
            const angleOffset = (i / dataArray.current.length) * (Math.PI * 2);
            const currentRadius = radius + dataArray.current[i];
            const x = centerX + currentRadius * Math.cos(angleOffset);
            const y = centerY + currentRadius * Math.sin(angleOffset);

            if (i === 0) {
                ctx.moveTo(x, y); // Move to the first point
            } else {
                ctx.lineTo(x, y); // Connect the points
            }
        }

        ctx.closePath();

        // Draw the shape
        ctx.fillStyle = `hsl(100, 100%, 50%)`;
        ctx.strokeStyle = ctx.fillStyle; // Use the same color for stroke
        ctx.lineWidth = 2; // Line width can be adjusted

        ctx.stroke();
        ctx.restore(); // Restore the canvas state
    }, []);

    useEffect(() => {
        let requestId: number | undefined;
        const draw = (width: number, height: number) => {
            if (!canvasRef.current || !analyser.current) return;
            analyser.current.getByteTimeDomainData(dataArray.current);

            requestId = requestAnimationFrame(() => draw(width, height));


            drawVisualizer(width, height);
        };
        draw(dimensions.width, dimensions.height);

        return () => {
            if (requestId) {
                cancelAnimationFrame(requestId);
            }
        }
    }, [dimensions, drawVisualizer, analyser.current]);

    return (
        <div className="audio-visualizer-circle">
            <canvas ref={(c) => {
                canvasRef.current = c;
                canvasContextRef.current = c?.getContext("2d") || null;
            }} className="visualizer-canvas"></canvas>
        </div>
    );
};
