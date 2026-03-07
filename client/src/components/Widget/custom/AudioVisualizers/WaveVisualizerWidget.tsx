import { type FC, useEffect, useRef } from "react";

interface WaveVisualizerWidgetProps {
    spaceId: string;
}

export const WaveVisualizerWidget: FC<WaveVisualizerWidgetProps> = ({ spaceId }) => {
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
            canvas.height = 150;
        };
        resize();

        const draw = () => {
            time += 0.05;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop(0, "#667eea");
            gradient.addColorStop(0.5, "#764ba2");
            gradient.addColorStop(1, "#667eea");

            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);

            for (let x = 0; x < canvas.width; x++) {
                const y = canvas.height / 2 + 
                    Math.sin(x * 0.03 + time) * 30 +
                    Math.sin(x * 0.05 + time * 1.5) * 20 +
                    Math.sin(x * 0.01 + time * 0.5) * 40;
                ctx.lineTo(x, y);
            }

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            for (let x = 0; x < canvas.width; x++) {
                const y = canvas.height / 2 + 
                    Math.sin(x * 0.03 + time + Math.PI) * 30 +
                    Math.sin(x * 0.05 + time * 1.5 + Math.PI) * 20;
                ctx.lineTo(x, y);
            }
            ctx.strokeStyle = "rgba(102, 126, 234, 0.5)";
            ctx.lineWidth = 2;
            ctx.stroke();

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="w-[300px] h-[150px] rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};
