import { type FC, useEffect, useState, useEffectEvent } from "react";
import { useDispatch } from "react-redux";
import { playBeep } from "@/actions.ts";

interface DeepWorkTimerWidgetProps {
    spaceId: string;
}

const workTime = 50 * 60;
const breakTime = 10 * 60;

export const DeepWorkTimerWidget: FC<DeepWorkTimerWidgetProps> = ({ spaceId }) => {
    const dispatch = useDispatch();
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(workTime);
    const [isBreak, setIsBreak] = useState(false);
    const [sessions, setSessions] = useState(0);

    useEffect(() => {
        if (!isPlaying) return;
        const id = setInterval(() => setTimeLeft((old) => old - 1), 1000);
        return () => clearInterval(id);
    }, [isPlaying]);

    useEffect(() => {
        if (timeLeft <= 0 && isPlaying) {
            dispatch(playBeep());
            if (isBreak) {
                setTimeLeft(workTime);
                setIsBreak(false);
            } else {
                setSessions((s) => s + 1);
                setTimeLeft(breakTime);
                setIsBreak(true);
            }
        }
    }, [timeLeft, isPlaying, isBreak, dispatch]);

    const handleReset = useEffectEvent(() => {
        setIsPlaying(false);
        setTimeLeft(workTime);
        setIsBreak(false);
    });

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const totalTime = isBreak ? breakTime : workTime;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    return (
        <div className="w-72 bg-black/50 backdrop-blur-md rounded-3xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-medium">{isBreak ? "Break Time" : "Deep Work"}</h3>
                <span className="text-white/60 text-sm">Session {sessions + 1}</span>
            </div>

            <div className="relative w-48 h-48 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r="85"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="10"
                        fill="none"
                    />
                    <circle
                        cx="96"
                        cy="96"
                        r="85"
                        stroke={isBreak ? "#22d3ee" : "#f97316"}
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={534}
                        strokeDashoffset={534 - (progress / 100) * 534}
                        className="transition-all duration-1000"
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
                    </span>
                    <span className="text-sm text-white/60 mt-2">
                        {isBreak ? "Take a break" : "Stay focused"}
                    </span>
                </div>
            </div>

            <div className="flex justify-center gap-3">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
                        isBreak ? "bg-cyan-500/30 hover:bg-cyan-500/50" : "bg-orange-500/30 hover:bg-orange-500/50"
                    }`}
                >
                    {isPlaying ? "⏸" : "▶"}
                </button>
                <button
                    onClick={handleReset}
                    className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-2xl transition-all"
                >
                    ↺
                </button>
            </div>
        </div>
    );
};
