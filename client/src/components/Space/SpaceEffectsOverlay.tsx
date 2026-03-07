import { useEffect, useRef } from "react";
import type { SpaceEffects } from "@/types.ts";

interface SpaceEffectsOverlayProps {
    effects?: SpaceEffects;
}

export const SpaceEffectsOverlay = ({ effects }: SpaceEffectsOverlayProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!effects) return;

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
            time += 0.01;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (effects.vignette) {
                const gradient = ctx.createRadialGradient(
                    canvas.width / 2, canvas.height / 2, 0,
                    canvas.width / 2, canvas.height / 2, canvas.width * 0.7
                );
                gradient.addColorStop(0, "transparent");
                gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.3)");
                gradient.addColorStop(1, "rgba(0, 0, 0, 0.8)");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            if (effects.noise) {
                const imageData = ctx.createImageData(canvas.width, canvas.height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const noise = (Math.random() - 0.5) * 30;
                    data[i] = noise;
                    data[i + 1] = noise;
                    data[i + 2] = noise;
                    data[i + 3] = 15;
                }
                ctx.putImageData(imageData, 0, 0);
            }

            if (effects.aurora) {
                for (let i = 0; i < 3; i++) {
                    const waveY = canvas.height * 0.4 + Math.sin(time + i) * 50;
                    const gradient2 = ctx.createLinearGradient(0, waveY - 100, 0, waveY + 100);
                    gradient2.addColorStop(0, "transparent");
                    gradient2.addColorStop(0.5, `hsla(${160 + i * 40 + Math.sin(time) * 30}, 80%, 50%, 0.1)`);
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
            }

            if (effects.particles) {
                for (let i = 0; i < 50; i++) {
                    const x = (Math.sin(time + i * 0.5) * 0.5 + 0.5) * canvas.width;
                    const y = (Math.cos(time * 0.7 + i * 0.3) * 0.5 + 0.5) * canvas.height;
                    const size = Math.sin(time + i) * 1 + 2;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(time + i) * 0.2})`;
                    ctx.fill();
                }
            }

            if (effects.starfield) {
                for (let i = 0; i < 100; i++) {
                    const x = (Math.sin(i * 0.1 + time * 0.1) * 0.5 + 0.5) * canvas.width;
                    const y = (Math.cos(i * 0.15 + time * 0.05) * 0.5 + 0.5) * canvas.height;
                    const twinkle = Math.sin(time * 3 + i) * 0.3 + 0.7;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.6})`;
                    ctx.fill();
                }
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, [effects]);

    if (!effects) return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10"
        />
    );
};
