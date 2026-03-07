import { type FC, useEffect, useState, useEffectEvent } from "react";
import { useDispatch } from "react-redux";
import { playBeep } from "@/actions.ts";

interface ReadingTimerWidgetProps {
    spaceId: string;
}

const defaultTime = 30 * 60;

export const ReadingTimerWidget: FC<ReadingTimerWidgetProps> = ({ spaceId }) => {
    const dispatch = useDispatch();
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(defaultTime);
    const [pages, setPages] = useState(0);

    useEffect(() => {
        if (!isPlaying) return;
        const id = setInterval(() => setTimeLeft((old) => old - 1), 1000);
        return () => clearInterval(id);
    }, [isPlaying]);

    useEffect(() => {
        if (timeLeft <= 0 && isPlaying) {
            dispatch(playBeep());
            setIsPlaying(false);
        }
    }, [timeLeft, isPlaying, dispatch]);

    const handleReset = useEffectEvent(() => {
        setIsPlaying(false);
        setTimeLeft(defaultTime);
        setPages(0);
    });

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const progress = ((defaultTime - timeLeft) / defaultTime) * 100;

    return (
        <div className="w-60 bg-amber-900/20 backdrop-blur-md rounded-3xl p-5 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📖</span>
                <h3 className="text-white font-medium">Reading Time</h3>
            </div>

            <div className="relative w-40 h-40 mx-auto mb-4">
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
                        stroke="#f59e0b"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={440}
                        strokeDashoffset={440 - (progress / 100) * 440}
                        className="transition-all duration-1000"
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                        {minutes}:{seconds.toString().padStart(2, "0")}
                    </span>
                </div>
            </div>

            <div className="flex justify-center gap-2 mb-4">
                <button
                    onClick={() => setPages((p) => p - 1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                >
                    -
                </button>
                <div className="bg-white/10 px-4 py-1 rounded-lg">
                    <span className="text-white">{pages}</span>
                    <span className="text-white/50 text-xs ml-1">pages</span>
                </div>
                <button
                    onClick={() => setPages((p) => p + 1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                >
                    +
                </button>
            </div>

            <div className="flex justify-center gap-3">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-amber-500/30 hover:bg-amber-500/50 flex items-center justify-center text-xl transition-all"
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
