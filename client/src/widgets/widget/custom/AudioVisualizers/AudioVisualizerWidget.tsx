import { useAnalyzer } from "@/shared/hooks/useAnalyzer.ts";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useResizeHandle from "@/shared/hooks/useResizeHandle.ts";
import { ensureElement } from "../../../../shared/utils.ts";

interface AudioVisualizerWidgetProps {
    spaceId: string;
}

const fftSize = 256
export const AudioVisualizerWidget = (props: AudioVisualizerWidgetProps) => {
    const { spaceId } = props;
    const { analyser } = useAnalyzer({spaceId, fftSize: 256});

    const [dimensions, setDimensions] = useState({ width: 200, height: 200 });

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

    const dataArray = useRef(new Uint8Array(fftSize / 2))
    const timeArray = useRef(new Uint8Array(fftSize));


    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);


    const drawVisualizer = useCallback((width: number, height: number) => {
        if (!canvasRef.current || !canvasContextRef.current) return;
        // Clear canvas with fade effect
        canvasContextRef.current.fillStyle = "rgba(15, 23, 42, 0.2)";
        canvasContextRef.current.fillRect(0, 0, width, height);
        canvasRef.current.width = width;
        canvasRef.current.height = height;

        let totalAmplitude = 0;
        for (let i = 0; i < timeArray.current.length; i++) {
            // Переводим из 0..255 в отклонение от центра (128)
            totalAmplitude += Math.abs(timeArray.current[i] - 128);
        }
        const rms = totalAmplitude / timeArray.current.length; // Средняя "сила" удара


        const k = 0.5;

        const barWidth = (width / dataArray.current.length) * 2.5;
        let x = 0;

        for (let i = 0; i < dataArray.current.length; i++) {
            let value = dataArray.current[i];
            value = value * (1 - k) + rms * k;
            value *= 1.4;
            const barHeight = (value / 255) * height;

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
    }, [canvasRef.current, canvasContextRef.current, dataArray.current, dimensions.width, dimensions.height, timeArray.current]);


    useEffect(() => {
        let requestId: number | undefined;
        const draw = (width: number, height: number) => {
            if (!canvasRef.current || !analyser.current) return;
            requestId = requestAnimationFrame(() => draw(width, height));
            analyser.current.getByteFrequencyData(dataArray.current);
            analyser.current.getByteTimeDomainData(timeArray.current);
            drawVisualizer(width, height);
        };
        draw(dimensions.width, dimensions.height);
        return () => {
            if (requestId) {
                cancelAnimationFrame(requestId);
            }
        }
    }, [dimensions, analyser.current]);


    return (
        <div className="audio-visualizer" ref={resizeRef}>
            <div className="visualizer-container">
                <canvas ref={(c) => {
                    canvasRef.current = c;
                    canvasContextRef.current = c?.getContext("2d") || null;
                }} className="visualizer-canvas"></canvas>
            </div>
        </div>
    )
}