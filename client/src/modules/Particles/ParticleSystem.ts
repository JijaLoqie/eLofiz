import p5 from 'p5';
import { Particle } from "@/modules/Particles/Particle.ts";
import { type ParticleConfig } from "@/types.ts";

const defaultConfig: ParticleConfig = {
    particleNum: 100,
    particleSize: 1,
    walkForce: 1.52,
    attractRadius: 140,
    attractForce: 100,
    returnMaxSpeed: 10,
    returnMaxForce: 20,
    returnRange: 160,
    velocityDamping: 0.9,
    backgroundColor: [255, 255, 234],
    particleColor: [0, 0, 0],
    accentColor: "#9333ea",
};

export class ParticleSystem {
    private particles: Particle[] = [];
    private config: ParticleConfig;
    private sketch: p5;
    private glowTime: number = 0; // Добавляем это

    constructor(sketch: p5, config: Partial<ParticleConfig> = {}) {
        this.sketch = sketch;
        this.config = { ...defaultConfig, ...config };
        this.init();
    }

    private init(): void {
        this.particles = [];
        const radius = this.getCircleRadius();

        for (let i = 0; i < this.config.particleNum; i++) {
            const t = this.sketch.map(i, 0, this.config.particleNum, 0, this.sketch.TWO_PI);
            const x = this.sketch.cos(t) * radius + this.sketch.width / 2;
            const y = this.sketch.sin(t) * radius + this.sketch.height / 2;

            const pos = this.sketch.createVector(x, y);
            const v = this.sketch.createVector(0, 0);
            const color = this.sketch.color(...this.config.particleColor);

            const particle = new Particle(
                this.sketch,
                pos,
                v,
                this.config.particleSize,
                color
            );

            this.particles.push(particle);
        }
    }

    private getCircleRadius(): number {
        const size =
            this.sketch.width > this.sketch.height
                ? this.sketch.height
                : this.sketch.width;
        return size * 0.3;
    }

    update(mouseX: number, mouseY: number): void {
        const mouse = this.sketch.createVector(mouseX, mouseY);

        for (const particle of this.particles) {
            particle.walk(this.config.walkForce);
            particle.distract(mouse, this.config.attractRadius, this.config.attractForce);
            particle.returnPos(
                this.config.returnMaxSpeed,
                this.config.returnMaxForce,
                this.config.returnRange
            );
            particle.v.mult(this.config.velocityDamping);
            particle.update();
        }
    }

    draw(): void {
        this.glowTime += 0.02;

        const centerX = this.sketch.width / 2;
        const centerY = this.sketch.height / 2;
        // Получаем частицы на краю
        const edgeParticles = this.particles.filter((particle, index) => {
            return index % Math.ceil(this.particles.length / 60) === 0;
        });

        if (edgeParticles.length > 2) {
            const ctx = this.sketch.drawingContext as CanvasRenderingContext2D;

            const createPath = () => {
                ctx.beginPath();
                ctx.moveTo(edgeParticles[0].p.x, edgeParticles[0].p.y);

                for (let i = 1; i < edgeParticles.length; i++) {
                    const current = edgeParticles[i];
                    const next = edgeParticles[(i + 1) % edgeParticles.length];

                    const cpx = (current.p.x + next.p.x) / 2;
                    const cpy = (current.p.y + next.p.y) / 2;

                    ctx.quadraticCurveTo(current.p.x, current.p.y, cpx, cpy);
                }

                ctx.closePath();
            };

            // Анимирующееся свечение
            const glowIntensity = Math.sin(this.glowTime) * 0.5 + 0.5; // 0 to 1
            const glowAlpha = 0.4 + glowIntensity * 0.4; // 0.4 to 0.8

            ctx.shadowColor = `rgba(147, 51, 234, ${glowAlpha})`;
            ctx.shadowBlur = 40 + glowIntensity * 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            createPath();
            ctx.fillStyle = "#000000";
            ctx.fill();

            createPath();
            ctx.strokeStyle = `rgba(179, 142, 255, ${0.5 + glowIntensity * 0.5})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
        }

        // Рисуем текст в центре
        const ctx = this.sketch.drawingContext as CanvasRenderingContext2D;
        ctx.save();

        // Настройки текста
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Тень текста (свечение)
        ctx.shadowColor = "rgba(147, 51, 234, 0.8)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Основной текст
        ctx.fillStyle = "#b78eff";
        ctx.font = "italic bold 5vw 'Courier New', monospace";
        ctx.fillText("eLofiz", centerX, centerY);

        // Обводка текста для дополнительного эффекта
        ctx.strokeStyle = "rgba(147, 51, 234, 0.6)";
        ctx.lineWidth = 1;
        ctx.strokeText("eLofiz", centerX, centerY);

        ctx.restore();
    }

    reset(): void {
        this.init();
    }

    updateConfig(config: Partial<ParticleConfig>): void {
        this.config = { ...this.config, ...config };
        this.reset();
    }

    getConfig(): ParticleConfig {
        return this.config;
    }
}