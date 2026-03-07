import { type FC, useEffect, useState, useEffectEvent } from "react";
import { useDispatch } from "react-redux";
import { playBeep } from "@/actions.ts";

interface ForestTimerWidgetProps {
    spaceId: string;
}

const defaultTime = 25 * 60;

export const ForestTimerWidget: FC<ForestTimerWidgetProps> = ({ spaceId }) => {
    const dispatch = useDispatch();
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(defaultTime);
    const [ringing, setRinging] = useState(false);

    useEffect(() => {
        if (!isPlaying) return;
        const id = setInterval(() => setTimeLeft((old) => old - 1), 1000);
        return () => clearInterval(id);
    }, [isPlaying]);

    useEffect(() => {
        if (timeLeft <= 0 && isPlaying) {
            setRinging(true);
            setIsPlaying(false);
        }
    }, [timeLeft, isPlaying]);

    useEffect(() => {
        if (!ringing) return;
        const id = setInterval(() => dispatch(playBeep()), 1000);
        return () => clearInterval(id);
    }, [ringing, dispatch]);

    const handleReset = useEffectEvent(() => {
        setIsPlaying(false);
        setTimeLeft(defaultTime);
        setRinging(false);
    });

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const progress = ((defaultTime - timeLeft) / defaultTime) * 100;

    return (
        <div className="w-64 bg-black/50 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center">
            <div className="relative w-40 h-40 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                    />
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="url(#forestGradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={440}
                        strokeDashoffset={440 - (progress / 100) * 440}
                        className="transition-all duration-1000"
                    />
                    <defs>
                        <linearGradient id="forestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>
                    </defs>
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
                    </span>
                    <span className="text-xs text-white/60 mt-1">Forest Focus</span>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-green-500/30 hover:bg-green-500/50 flex items-center justify-center text-xl transition-all"
                >
                    {isPlaying ? "⏸" : "▶"}
                </button>
                <button
                    onClick={handleReset}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all"
                >
                    ↺
                </button>
            </div>
        </div>
    );
};
