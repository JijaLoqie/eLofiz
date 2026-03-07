import { useEffect, useRef, useCallback } from "react";
import { useAnalyzer } from "@/components/hooks/useAnalyzer.ts";

interface BarsVisualizerWidgetProps {
    spaceId: string;
}

export const BarsVisualizerWidget = ({ spaceId }: BarsVisualizerWidgetProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { analyser } = useAnalyzer({ spaceId, fftSize: 64 });
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const smoothedRef = useRef<number[]>([]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const bars = 24;
        const barWidth = 10;
        const gap = 2;
        canvas.width = bars * (barWidth + gap);
        canvas.height = 140;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!analyser.current || !dataArrayRef.current) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < bars; i++) {
                const barHeight = 20 + Math.sin(i * 0.3) * 10;
                ctx.fillStyle = "rgba(102, 126, 234, 0.3)";
                ctx.fillRect(i * (barWidth + gap), canvas.height - barHeight, barWidth, barHeight);
            }
            return;
        }

        analyser.current.getByteFrequencyData(dataArrayRef.current);

        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (smoothedRef.current.length !== bars) {
            smoothedRef.current = new Array(bars).fill(0);
        }

        const binSize = Math.floor(dataArrayRef.current.length / bars);

        for (let i = 0; i < bars; i++) {
            let sum = 0;
            for (let j = 0; j < binSize; j++) {
                sum += dataArrayRef.current[i * binSize + j];
            }
            const avg = sum / binSize;
            
            smoothedRef.current[i] = smoothedRef.current[i] * 0.7 + avg * 0.3;
            
            const barHeight = Math.max(4, (smoothedRef.current[i] / 255) * canvas.height * 0.9);

            const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
            gradient.addColorStop(0, `hsl(${(i / bars) * 60 + 180}, 80%, 60%)`);
            gradient.addColorStop(1, `hsl(${(i / bars) * 60 + 180}, 80%, 35%)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(
                i * (barWidth + gap),
                canvas.height - barHeight,
                barWidth,
                barHeight
            );

            ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
            ctx.fillRect(
                i * (barWidth + gap),
                canvas.height - barHeight,
                barWidth / 2,
                barHeight
            );
        }
    }, [analyser]);

    useEffect(() => {
        if (analyser.current) {
            dataArrayRef.current = new Uint8Array(analyser.current.frequencyBinCount);
        }
    }, [analyser.current]);

    useEffect(() => {
        let animationId: number;

        const animate = () => {
            draw();
            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [draw]);

    return (
        <div className="w-full h-full flex items-center justify-center p-2">
            <canvas ref={canvasRef} className="rounded-xl w-full" />
        </div>
    );
};
