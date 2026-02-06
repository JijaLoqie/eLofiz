import { useAnalyzer } from "@/components/hooks/useAnalyzer.ts";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useResizeHandle from "@/components/hooks/useResizeHandle.ts";
import { ensureElement } from "@/utils";

interface AudioVisualizerWidgetProps {
    spaceId: string;
}


export const AudioVisualizerWidget = (props: AudioVisualizerWidgetProps) => {
    const { spaceId } = props;
    const { analyzer } = useAnalyzer({spaceId});

    const [dimensions, setDimensions] = useState({ width: 300, height: 200 });

    const spaceContainer = useRef<HTMLElement>(ensureElement(`#${spaceId}`));
    const {
        resizeRef,
    } = useResizeHandle({
        container: spaceContainer,
        minWidth: 150,
        minHeight: 100,
        onResizeStart: (e) => {
            console.log('Resize started');
        },
        onResize: (e, width, height) => {
            setDimensions({ width, height });
        },
        onResizeEnd: (e) => {
            console.log('Resize ended');
        },
    });

    const dataArray = useRef(new Uint8Array(analyzer.frequencyBinCount))
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);


    const drawVisualizer = useCallback((width: number, height: number) => {
        if (!canvasRef.current || !canvasContextRef.current) return;
        // Clear canvas with fade effect
        canvasContextRef.current.fillStyle = "rgba(15, 23, 42, 0.2)";
        canvasContextRef.current.fillRect(0, 0, width, height);
        canvasRef.current.width = width;
        canvasRef.current.height = height;

        const barWidth = (width / dataArray.current.length) * 2.5;
        let x = 0;

        for (let i = 0; i < dataArray.current.length; i++) {
            const barHeight = (dataArray.current[i] / 255) * height;

            // Create gradient
            const gradient = canvasContextRef.current.createLinearGradient(0, height - barHeight, 0, height);
            gradient.addColorStop(0, "#00ff88");
            gradient.addColorStop(0.5, "#00ccff");
            gradient.addColorStop(1, "#0088ff");
            canvasContextRef.current.fillStyle = gradient;
            canvasContextRef.current.fillRect(x, height - barHeight, barWidth - 2, barHeight);

            // Add glow effect
            canvasContextRef.current.strokeStyle = "rgba(0, 255, 136, 0.5)";
            canvasContextRef.current.lineWidth = 1;
            canvasContextRef.current.strokeRect(x, height - barHeight, barWidth - 2, barHeight);

            x += barWidth;
        }
    }, [canvasRef.current, canvasContextRef.current, dataArray.current, dimensions.width, dimensions.height]);


    useEffect(() => {
        let requestId: number | undefined;
        const draw = (width: number, height: number) => {
            if (!canvasRef.current) return;
            requestId = requestAnimationFrame(() => draw(width, height));
            analyzer.getByteFrequencyData(dataArray.current);
            drawVisualizer(width, height);
        };
        draw(dimensions.width, dimensions.height);
        return () => {
            if (requestId) {
                cancelAnimationFrame(requestId);
            }
        }
    }, [dimensions]);


    return (
        <div className="audio-visualizer resizable" ref={resizeRef}>
            <div className="visualizer-container">
                <canvas ref={(c) => {
                    canvasRef.current = c;
                    canvasContextRef.current = c?.getContext("2d") || null;
                }} className="visualizer-canvas"></canvas>
            </div>
        </div>
    )
}