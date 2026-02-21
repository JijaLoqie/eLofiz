import { useEffect, useRef } from 'react';
import p5 from 'p5';
import type { ParticleConfig } from "@/types.ts";
import { ParticleSystem } from "@/modules/Particles/ParticleSystem.ts";
import { ensureElement } from "@/utils";

interface UseP5ParticlesOptions {
    config?: Partial<ParticleConfig>;
    onReady?: (particleSystem: ParticleSystem) => void;
}

export const useP5Particles = (
    containerId: string,
    options: UseP5ParticlesOptions = {}
) => {
    const p5InstanceRef = useRef<p5 | null>(null);
    const particleSystemRef = useRef<ParticleSystem | null>(null);

    useEffect(() => {
        const sketch = (p: p5) => {
            let particleSystem: ParticleSystem;

            p.setup = () => {
                const container = document.getElementById(containerId);
                if (container) {
                    p.createCanvas(container.clientWidth, container.clientHeight);
                }
                p.clear();

                particleSystem = new ParticleSystem(p, options.config);
                particleSystemRef.current = particleSystem;

                if (options.onReady) {
                    options.onReady(particleSystem);
                }
            };

            p.draw = () => {
                p.clear();
                particleSystem.update(p.mouseX, p.mouseY);
                particleSystem.draw();
            };

            p.windowResized = () => {
                const container = document.getElementById(containerId);
                if (container) {
                    p.resizeCanvas(container.clientWidth, container.clientHeight);
                    particleSystem.reset();
                }
            };
        };

        // Create p5 instance
        p5InstanceRef.current = new p5(sketch, ensureElement(`#${containerId}`));

        // Cleanup
        return () => {
            if (p5InstanceRef.current) {
                p5InstanceRef.current.remove();
            }
        };
    }, [containerId, options]);

    return {
        p5Instance: p5InstanceRef.current,
        particleSystem: particleSystemRef.current,
    };
};