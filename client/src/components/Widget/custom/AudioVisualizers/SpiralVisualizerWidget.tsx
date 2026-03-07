import { useEffect, useRef, useCallback } from "react";
import { useAnalyzer } from "@/components/hooks/useAnalyzer.ts";

interface SpiralVisualizerWidgetProps {
    spaceId: string;
}

export const SpiralVisualizerWidget = ({ spaceId }: SpiralVisualizerWidgetProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { analyser } = useAnalyzer({ spaceId, fftSize: 128 });
    const dataArrayRef = useRef<Uint8Array | null>(null);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 200;
        canvas.height = 200;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = 80;

        let audioLevel = 0;

        if (analyser.current && dataArrayRef.current) {
            analyser.current.getByteFrequencyData(dataArrayRef.current);
            const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
            audioLevel = sum / dataArrayRef.current.length / 255;
        }

        const particleCount = 60 + Math.floor(audioLevel * 40);

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const radiusOffset = audioLevel * 30 * Math.sin(i * 0.2);
            const radius = maxRadius + radiusOffset;

            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            const hue = (i / particleCount) * 60 + 180 + audioLevel * 30;
            const alpha = 0.5 + audioLevel * 0.5;

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
            gradient.addColorStop(0, `hsla(${hue}, 80%, 70%, ${alpha})`);
            gradient.addColorStop(1, "transparent");

            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        const innerRadius = 20 + audioLevel * 15;
        const innerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, innerRadius);
        innerGradient.addColorStop(0, `rgba(255, 255, 255, ${0.7 + audioLevel * 0.3})`);
        innerGradient.addColorStop(0.5, `rgba(196, 181, 253, ${0.5 + audioLevel * 0.3})`);
        innerGradient.addColorStop(1, "rgba(167, 139, 250, 0.1)");

        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
        ctx.fillStyle = innerGradient;
        ctx.fill();

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
            <canvas ref={canvasRef} className="rounded-full w-full aspect-square" />
        </div>
    );
};
