import { type FC, useState, useEffect, useRef } from "react";

interface BinauralBeatsWidgetProps {
    spaceId: string;
}

const frequencies = [
    { name: "Focus", hz: 40, color: "#4f46e5" },
    { name: "Deep Focus", hz: 60, color: "#7c3aed" },
    { name: "Relax", hz: 100, color: "#0891b2" },
];

export const BinauralBeatsWidget: FC<BinauralBeatsWidgetProps> = ({ spaceId }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedFreq, setSelectedFreq] = useState(frequencies[0]);
    const [volume, setVolume] = useState(0.5);
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);

    useEffect(() => {
        if (isPlaying) {
            const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            audioContextRef.current = audioContext;

            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();

            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(selectedFreq.hz, audioContext.currentTime);
            
            gain.gain.setValueAtTime(volume * 0.1, audioContext.currentTime);

            oscillator.connect(gain);
            gain.connect(audioContext.destination);
            oscillator.start();

            oscillatorRef.current = oscillator;
            gainRef.current = gain;
        } else {
            oscillatorRef.current?.stop();
            audioContextRef.current?.close();
        }

        return () => {
            oscillatorRef.current?.stop();
            audioContextRef.current?.close();
        };
    }, [isPlaying]);

    useEffect(() => {
        if (gainRef.current && audioContextRef.current) {
            gainRef.current.gain.setValueAtTime(volume * 0.1, audioContextRef.current.currentTime);
        }
    }, [volume]);

    return (
        <div className="w-72 bg-black/50 backdrop-blur-md rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Binaural Beats</h3>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isPlaying ? "bg-green-500/30" : "bg-white/20"
                    }`}
                >
                    {isPlaying ? "⏸" : "▶"}
                </button>
            </div>

            <div className="flex gap-2 mb-4">
                {frequencies.map((freq) => (
                    <button
                        key={freq.name}
                        onClick={() => setSelectedFreq(freq)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                            selectedFreq.name === freq.name
                                ? "bg-white/20 text-white"
                                : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                    >
                        {freq.name}
                    </button>
                ))}
            </div>

            <div className="text-center mb-3">
                <span className="text-2xl font-bold" style={{ color: selectedFreq.color }}>
                    {selectedFreq.hz}Hz
                </span>
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
    );
};
