import { type FC, useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faMusic, faCloud, faTree, faWater, faFire, faWind, faBrain, faCloudRain, faDove, faMoon, faVolumeUp, faCoffee } from "@fortawesome/free-solid-svg-icons";

interface SoundWidgetProps {
    spaceId: string;
    soundUrl: string;
    title: string;
    icon?: string;
}

const iconMap: Record<string, typeof faMusic> = {
    rain: faCloudRain,
    forest: faTree,
    ocean: faWater,
    fireplace: faFire,
    wind: faWind,
    binaural: faBrain,
    thunder: faCloudRain,
    birds: faDove,
    night: faMoon,
    ambient: faVolumeUp,
    cafe: faCoffee,
};

export const SoundWidget: FC<SoundWidgetProps> = ({ spaceId, soundUrl, title, icon }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(soundUrl);
            audioRef.current.loop = true;
        }
        return () => {
            audioRef.current?.pause();
        };
    }, [soundUrl]);

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
    const faIcon = icon ? (iconMap[icon] || faMusic) : faMusic;

    return (
        <div className="flex flex-col items-center gap-2">
            <button
                onClick={togglePlay}
                className={`
                    w-14 h-14 rounded-full flex items-center justify-center 
                    transition-all duration-300 shadow-lg
                    ${isPlaying 
                        ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white scale-110' 
                        : 'bg-white/10 hover:bg-white/20 text-white/70'
                    }
                `}
            >
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-lg ml-0.5" />
            </button>
            <span className={`text-xs text-center ${isPlaying ? 'text-white' : 'text-white/50'}`}>
                {title}
            </span>
        </div>
    );
};
