import { type FC, useState, useEffect, useRef } from "react";

interface MusicPlayerWidgetProps {
    spaceId: string;
    title: string;
    coverColor: string;
}

export const MusicPlayerWidget: FC<MusicPlayerWidgetProps> = ({ spaceId, title, coverColor }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="w-64 h-32 bg-black/50 backdrop-blur-md rounded-2xl p-4 flex gap-4 items-center">
            <div 
                className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl"
                style={{ backgroundColor: coverColor }}
            >
                🎵
            </div>
            
            <div className="flex-1">
                <h3 className="text-white font-medium text-sm mb-2">{title}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                    <button 
                        onClick={togglePlay}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                    >
                        {isPlaying ? "⏸" : "▶"}
                    </button>
                    
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-white/60 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                />
            </div>

            <audio ref={audioRef} loop />
        </div>
    );
};
