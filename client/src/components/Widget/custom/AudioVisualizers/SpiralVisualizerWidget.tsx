import { type FC, useEffect, useRef } from "react";

interface SpiralVisualizerWidgetProps {
    spaceId: string;
}

export const SpiralVisualizerWidget: FC<SpiralVisualizerWidgetProps> = ({ spaceId }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const resize = () => {
            canvas.width = 300;
            canvas.height = 300;
        };
        resize();

        const draw = () => {
            time += 0.03;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const maxRadius = 120;

            for (let i = 0; i < 360; i += 3) {
                const angle = (i * Math.PI) / 180;
                const radius = maxRadius + 
                    Math.sin(angle * 3 + time) * 20 +
                    Math.sin(angle * 5 + time * 1.5) * 15;

                const x = centerX + Math.cos(angle + time * 0.5) * radius;
                const y = centerY + Math.sin(angle + time * 0.5) * radius;

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
                gradient.addColorStop(0, `hsla(${(i / 360) * 60 + 180}, 80%, 70%, 0.9)`);
                gradient.addColorStop(1, "transparent");

                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(centerX, centerY, maxRadius * 0.3, 0, Math.PI * 2);
            const innerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius * 0.3);
            innerGradient.addColorStop(0, "rgba(102, 126, 234, 0.8)");
            innerGradient.addColorStop(1, "rgba(102, 126, 234, 0.1)");
            ctx.fillStyle = innerGradient;
            ctx.fill();

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="w-[300px] h-[300px] rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};
