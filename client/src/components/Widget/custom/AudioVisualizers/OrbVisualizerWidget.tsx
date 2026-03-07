import { type FC, useEffect, useRef } from "react";

interface OrbVisualizerWidgetProps {
    spaceId: string;
}

export const OrbVisualizerWidget: FC<OrbVisualizerWidgetProps> = ({ spaceId }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const resize = () => {
            canvas.width = 250;
            canvas.height = 250;
        };
        resize();

        const draw = () => {
            time += 0.04;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            const baseRadius = 60 + Math.sin(time) * 15;
            const pulseRadius = baseRadius + Math.sin(time * 2) * 10;

            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, pulseRadius * 2
            );
            gradient.addColorStop(0, "rgba(167, 139, 250, 0.8)");
            gradient.addColorStop(0.3, "rgba(139, 92, 246, 0.5)");
            gradient.addColorStop(0.6, "rgba(99, 102, 241, 0.2)");
            gradient.addColorStop(1, "transparent");

            ctx.beginPath();
            ctx.arc(centerX, centerY, pulseRadius * 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            const innerGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, baseRadius
            );
            innerGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
            innerGradient.addColorStop(0.5, "rgba(196, 181, 253, 0.8)");
            innerGradient.addColorStop(1, "rgba(167, 139, 250, 0.5)");

            ctx.beginPath();
            ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
            ctx.fillStyle = innerGradient;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(centerX - baseRadius * 0.3, centerY - baseRadius * 0.3, baseRadius * 0.15, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.fill();

            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2 + time;
                const orbitRadius = baseRadius * 1.8 + Math.sin(time + i) * 10;
                const x = centerX + Math.cos(angle) * orbitRadius;
                const y = centerY + Math.sin(angle) * orbitRadius;

                const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 4);
                particleGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
                particleGradient.addColorStop(1, "transparent");

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = particleGradient;
                ctx.fill();
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="w-[250px] h-[250px] rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};
