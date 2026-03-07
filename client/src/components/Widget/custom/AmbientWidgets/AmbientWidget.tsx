import { type FC, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";

interface AmbientWidgetProps {
    spaceId: string;
    soundUrl: string;
    title: string;
    icon: string;
}

export const AmbientWidget: FC<AmbientWidgetProps> = ({ spaceId, soundUrl, title, icon }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isExpanded, setIsExpanded] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(() => {});
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    return (
        <div className="w-16 h-16 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:w-48 hover:h-24 group relative overflow-hidden">
            <audio ref={audioRef} src={soundUrl} loop />
            
            <div className="flex items-center gap-3">
                <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                >
                    <span className="text-2xl">{isPlaying ? "⏸" : "▶"}</span>
                </button>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                    <span className="text-white text-sm whitespace-nowrap">{title}</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                    />
                </div>
            </div>

            {isPlaying && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </div>
            )}
        </div>
    );
};
