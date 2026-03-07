import { type FC, useEffect, useState, useEffectEvent } from "react";
import { useDispatch } from "react-redux";
import { playBeep } from "@/actions.ts";

interface MeditationTimerWidgetProps {
    spaceId: string;
}

const durations = [3, 5, 10, 15, 20];
const defaultDuration = 5 * 60;

export const MeditationTimerWidget: FC<MeditationTimerWidgetProps> = ({ spaceId }) => {
    const dispatch = useDispatch();
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(defaultDuration);
    const [selectedDuration, setSelectedDuration] = useState(defaultDuration);

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
        setTimeLeft(selectedDuration);
    });

    const handleDurationChange = (duration: number) => {
        setSelectedDuration(duration);
        setTimeLeft(duration);
        setIsPlaying(false);
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const progress = ((selectedDuration - timeLeft) / selectedDuration) * 100;

    return (
        <div className="w-64 bg-gradient-to-b from-purple-900/50 to-black/50 backdrop-blur-md rounded-3xl p-6">
            <h3 className="text-white text-center mb-4 font-medium">Meditation</h3>

            <div className="flex justify-center gap-2 mb-4">
                {durations.map((d) => (
                    <button
                        key={d}
                        onClick={() => handleDurationChange(d * 60)}
                        className={`px-3 py-1 rounded-lg text-sm transition-all ${
                            selectedDuration === d * 60
                                ? "bg-purple-500/50 text-white"
                                : "bg-white/10 text-white/60 hover:bg-white/20"
                        }`}
                    >
                        {d}m
                    </button>
                ))}
            </div>

            <div className="relative w-44 h-44 mx-auto mb-4">
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `conic-gradient(#a855f7 ${progress}%, transparent ${progress}%)`,
                        opacity: 0.3,
                    }}
                />
                <div className="absolute inset-2 rounded-full bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                        <span className="text-3xl font-bold text-white">
                            {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
                        </span>
                        <p className="text-xs text-white/50 mt-1">breathe...</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-3">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-purple-500/30 hover:bg-purple-500/50 flex items-center justify-center text-xl transition-all"
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
