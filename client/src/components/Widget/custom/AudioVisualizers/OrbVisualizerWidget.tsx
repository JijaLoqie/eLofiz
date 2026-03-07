import { useEffect, useRef, useCallback } from "react";
import { useAnalyzer } from "@/components/hooks/useAnalyzer.ts";

interface OrbVisualizerWidgetProps {
    spaceId: string;
}

export const OrbVisualizerWidget = ({ spaceId }: OrbVisualizerWidgetProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { analyser } = useAnalyzer({ spaceId, fftSize: 64 });
    const dataArrayRef = useRef<Uint8Array | null>(null);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 180;
        canvas.height = 180;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        let audioLevel = 0;
        let bassLevel = 0;

        if (analyser.current && dataArrayRef.current) {
            analyser.current.getByteFrequencyData(dataArrayRef.current);
            const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
            audioLevel = sum / dataArrayRef.current.length / 255;
            
            let bassSum = 0;
            const bassCount = Math.min(8, dataArrayRef.current.length);
            for (let i = 0; i < bassCount; i++) {
                bassSum += dataArrayRef.current[i];
            }
            bassLevel = bassSum / bassCount / 255;
        }

        const baseRadius = 35 + bassLevel * 30;
        const pulseRadius = baseRadius + bassLevel * 20;

        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, pulseRadius * 2
        );
        gradient.addColorStop(0, `rgba(167, 139, 250, ${0.6 + audioLevel * 0.4})`);
        gradient.addColorStop(0.3, `rgba(139, 92, 246, ${0.3 + audioLevel * 0.3})`);
        gradient.addColorStop(0.6, `rgba(99, 102, 241, ${0.1 + audioLevel * 0.2})`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        const innerGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, baseRadius
        );
        innerGradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        innerGradient.addColorStop(0.4, "rgba(196, 181, 253, 0.8)");
        innerGradient.addColorStop(1, "rgba(167, 139, 250, 0.6)");

        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = innerGradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX - baseRadius * 0.3, centerY - baseRadius * 0.3, baseRadius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();

        const orbitCount = 4 + Math.floor(audioLevel * 4);
        for (let i = 0; i < orbitCount; i++) {
            const angle = (i / orbitCount) * Math.PI * 2 + performance.now() * 0.001;
            const orbitRadius = baseRadius * 1.5 + Math.sin(performance.now() * 0.002 + i) * 10 * audioLevel;
            const x = centerX + Math.cos(angle) * orbitRadius;
            const y = centerY + Math.sin(angle) * orbitRadius;

            const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 3 + audioLevel * 3);
            particleGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
            particleGradient.addColorStop(1, "transparent");

            ctx.beginPath();
            ctx.arc(x, y, 3 + audioLevel * 3, 0, Math.PI * 2);
            ctx.fillStyle = particleGradient;
            ctx.fill();
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
            <canvas ref={canvasRef} className="rounded-full w-full aspect-square" />
        </div>
    );
};
