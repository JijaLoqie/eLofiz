import { useEffect, useRef, useCallback } from "react";
import { useAnalyzer } from "@/components/hooks/useAnalyzer.ts";

interface WaveVisualizerWidgetProps {
    spaceId: string;
}

export const WaveVisualizerWidget = ({ spaceId }: WaveVisualizerWidgetProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { analyser } = useAnalyzer({ spaceId, fftSize: 256 });
    const dataArrayRef = useRef<Uint8Array | null>(null);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!analyser.current || !dataArrayRef.current) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            for (let x = 0; x < canvas.width; x++) {
                const y = canvas.height / 2 + Math.sin(x * 0.03) * 10;
                ctx.lineTo(x, y);
            }
            ctx.strokeStyle = "rgba(102, 126, 234, 0.3)";
            ctx.lineWidth = 2;
            ctx.stroke();
            return;
        }

        analyser.current.getByteTimeDomainData(dataArrayRef.current);

        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "#667eea");
        gradient.addColorStop(0.5, "#764ba2");
        gradient.addColorStop(1, "#667eea");

        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        const sliceWidth = canvas.width / dataArrayRef.current.length;
        let x = 0;

        for (let i = 0; i < dataArrayRef.current.length; i++) {
            const v = dataArrayRef.current[i] / 128.0;
            const y = (v * canvas.height) / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();
    }, [analyser]);

    useEffect(() => {
        if (analyser.current) {
            dataArrayRef.current = new Uint8Array(analyser.current.frequencyBinCount);
        }
    }, [analyser.current]);

    useEffect(() => {
        let animationId: number;

        const animate = () => {
            draw();
            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [draw]);

    return (
        <div className="w-full h-full flex items-center justify-center p-2">
            <canvas 
                ref={canvasRef} 
                width={260} 
                height={130} 
                className="rounded-xl w-full"
            />
        </div>
    );
};
