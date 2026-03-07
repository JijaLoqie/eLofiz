import { type FC, useEffect, useRef } from "react";

interface AuroraBackgroundWidgetProps {
    spaceId: string;
}

export const AuroraBackgroundWidget: FC<AuroraBackgroundWidgetProps> = ({ spaceId }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            time += 0.005;
            
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, `hsl(${180 + Math.sin(time) * 30}, 70%, 15%)`);
            gradient.addColorStop(0.5, `hsl(${220 + Math.cos(time) * 20}, 60%, 10%)`);
            gradient.addColorStop(1, `hsl(${280 + Math.sin(time) * 30}, 50%, 8%)`);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < 3; i++) {
                const waveY = canvas.height * 0.4 + Math.sin(time + i) * 50;
                const gradient2 = ctx.createLinearGradient(0, waveY - 100, 0, waveY + 100);
                gradient2.addColorStop(0, "transparent");
                gradient2.addColorStop(0.5, `hsla(${160 + i * 40 + Math.sin(time) * 30}, 80%, 50%, 0.15)`);
                gradient2.addColorStop(1, "transparent");
                
                ctx.fillStyle = gradient2;
                ctx.beginPath();
                ctx.moveTo(0, waveY);
                
                for (let x = 0; x <= canvas.width; x += 10) {
                    const y = waveY + Math.sin(x * 0.01 + time + i) * 40;
                    ctx.lineTo(x, y);
                }
                
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();
                ctx.fill();
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};
