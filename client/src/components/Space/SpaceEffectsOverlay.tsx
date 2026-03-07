import { useEffect, useRef } from "react";
import type { SpaceEffects } from "@/types.ts";

interface SpaceEffectsOverlayProps {
    effects?: SpaceEffects;
}

export const SpaceEffectsOverlay = ({ effects }: SpaceEffectsOverlayProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Array<{
        x: number; y: number; vx: number; vy: number; 
        size: number; alpha: number; life: number; maxLife: number;
    }>>([]);

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

        const initParticles = (count: number) => {
            particlesRef.current = [];
            for (let i = 0; i < count; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 2,
                    vy: Math.random() * 2 + 1,
                    size: Math.random() * 3 + 1,
                    alpha: Math.random() * 0.5 + 0.3,
                    life: Math.random() * 100,
                    maxLife: 100,
                });
            }
        };

        const draw = () => {
            time += 0.016;
            
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
                if (particlesRef.current.length !== 50) initParticles(50);
                
                particlesRef.current.forEach((p) => {
                    p.x += p.vx;
                    p.y += p.vy;
                    
                    if (p.y > canvas.height) {
                        p.y = -10;
                        p.x = Math.random() * canvas.width;
                    }
                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    
                    const pulse = Math.sin(time * 3 + p.life) * 0.3 + 0.7;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * pulse})`;
                    ctx.fill();
                });
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

            if (effects.flame) {
                if (particlesRef.current.length !== 100) initParticles(100);
                
                particlesRef.current.forEach((p, i) => {
                    p.x += p.vx + Math.sin(time * 5 + i) * 0.5;
                    p.y -= p.vy * 1.5;
                    p.life -= 1;
                    
                    if (p.life <= 0 || p.y < 0) {
                        p.y = canvas.height + 10;
                        p.x = canvas.width / 2 + (Math.random() - 0.5) * 200;
                        p.life = p.maxLife;
                        p.vy = Math.random() * 2 + 2;
                    }
                    
                    const alpha = (p.life / p.maxLife) * 0.8;
                    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                    gradient.addColorStop(0, `rgba(255, 200, 50, ${alpha})`);
                    gradient.addColorStop(0.3, `rgba(255, 100, 0, ${alpha * 0.7})`);
                    gradient.addColorStop(1, "transparent");
                    
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                });
            }

            if (effects.snow) {
                if (particlesRef.current.length !== 150) initParticles(150);
                
                particlesRef.current.forEach((p) => {
                    p.x += p.vx * 0.5 + Math.sin(time + p.y * 0.01) * 0.5;
                    p.y += p.vy * 0.8;
                    
                    if (p.y > canvas.height) {
                        p.y = -10;
                        p.x = Math.random() * canvas.width;
                    }
                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                    ctx.fill();
                });
            }

            if (effects.rain) {
                if (particlesRef.current.length !== 200) initParticles(200);
                
                particlesRef.current.forEach((p) => {
                    p.x += p.vx;
                    p.y += p.vy * 3;
                    
                    if (p.y > canvas.height) {
                        p.y = -10;
                        p.x = Math.random() * canvas.width;
                    }
                    
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x - p.vx * 2, p.y + p.size * 10);
                    ctx.strokeStyle = `rgba(150, 180, 220, ${p.alpha * 0.6})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                });
            }

            if (effects.snowyWind) {
                if (particlesRef.current.length !== 120) initParticles(120);
                
                particlesRef.current.forEach((p) => {
                    p.x += p.vx * 3 + Math.sin(time * 2 + p.y * 0.01) * 2;
                    p.y += p.vy * 0.5;
                    
                    if (p.y > canvas.height || p.x > canvas.width) {
                        p.y = Math.random() * canvas.height;
                        p.x = -10;
                    }
                    
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(220, 235, 255, ${p.alpha * 0.7})`;
                    ctx.fill();
                });
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
