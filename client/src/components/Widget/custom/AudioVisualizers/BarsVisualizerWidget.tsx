import { type FC, useEffect, useRef } from "react";

interface BarsVisualizerWidgetProps {
    spaceId: string;
}

export const BarsVisualizerWidget: FC<BarsVisualizerWidgetProps> = ({ spaceId }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;
        const bars = 32;
        const barWidth = 8;
        const gap = 2;

        const resize = () => {
            canvas.width = bars * (barWidth + gap);
            canvas.height = 150;
        };
        resize();

        const draw = () => {
            time += 0.08;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < bars; i++) {
                const barHeight = Math.abs(
                    Math.sin(time + i * 0.2) * 60 +
                    Math.sin(time * 1.5 + i * 0.3) * 40 +
                    Math.sin(time * 0.5 + i * 0.1) * 30
                ) + 10;

                const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
                gradient.addColorStop(0, `hsl(${(i / bars) * 60 + 180}, 80%, 60%)`);
                gradient.addColorStop(1, `hsl(${(i / bars) * 60 + 180}, 80%, 40%)`);

                ctx.fillStyle = gradient;
                ctx.fillRect(
                    i * (barWidth + gap),
                    canvas.height - barHeight,
                    barWidth,
                    barHeight
                );

                ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                ctx.fillRect(
                    i * (barWidth + gap),
                    canvas.height - barHeight,
                    barWidth / 2,
                    barHeight
                );
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md">
            <canvas ref={canvasRef} className="w-full h-[150px]" />
        </div>
    );
};
