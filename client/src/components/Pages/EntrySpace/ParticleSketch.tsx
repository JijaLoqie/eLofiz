
import React, { useEffect, useState } from 'react';
import { useP5Particles } from '../../hooks/useP5Particles.ts';
import type { ParticleConfig } from "@/types.ts";

interface ParticleSketchProps {
    config?: Partial<ParticleConfig>;
    onSystemReady?: (system: any) => void;
}

export const ParticleSketch: React.FC<ParticleSketchProps> = ({
                                                                  config,
                                                                  onSystemReady,
                                                              }) => {
    const containerId = 'p5-container';

    useP5Particles(containerId, {
        config,
        onReady: onSystemReady,
    });

    return (
        <div
            id={containerId}
            style={{
                zIndex: 10,
                position: "absolute",
                top: 0,
                height: '80%',
                aspectRatio: "1/1",
                display: 'block',
                transform: 'translateY(-15%)',
            }}
        />
    );
};

export default ParticleSketch;