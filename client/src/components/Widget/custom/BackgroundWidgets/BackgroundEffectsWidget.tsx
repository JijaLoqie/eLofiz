import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { updateSpaceEffects, clearSpaceEffects } from "@/slices/SpaceSlice.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff, faCloud } from "@fortawesome/free-solid-svg-icons";

interface BackgroundEffectsWidgetProps {
    spaceId: string;
    effectKey: 'aurora' | 'gradient' | 'particles' | 'starfield';
    label: string;
    icon: string;
    gradientColors?: string[];
}

export const BackgroundEffectsWidget = ({ 
    spaceId, 
    effectKey, 
    label, 
    icon,
    gradientColors 
}: BackgroundEffectsWidgetProps) => {
    const dispatch = useDispatch();
    const space = useSelector((state: RootState) => 
        state.spaces.items.find(s => s.id === spaceId)
    );
    const isActive = space?.effects?.[effectKey] !== undefined && space?.effects?.[effectKey] !== false;
    const [selectedGradient, setSelectedGradient] = useState(gradientColors?.[0] || '#667eea');

    const gradients = [
        { name: "Sunset", colors: ["#ff9a9e", "#fecfef"] },
        { name: "Ocean", colors: ["#667eea", "#764ba2"] },
        { name: "Forest", colors: ["#134e5e", "#71b280"] },
        { name: "Fire", colors: ["#f12711", "#f5af19"] },
        { name: "Night", colors: ["#0f0c29", "#302b63"] },
    ];

    useEffect(() => {
        if (isActive && effectKey === 'gradient' && selectedGradient) {
            const gradient = gradients.find(g => g.name === selectedGradient);
            if (gradient) {
                dispatch(updateSpaceEffects({
                    spaceId,
                    effects: { gradient: gradient.colors }
                }));
            }
        }
    }, [selectedGradient, isActive, effectKey, spaceId, dispatch]);

    const handleToggle = () => {
        if (isActive) {
            dispatch(clearSpaceEffects({
                spaceId,
                effectKeys: [effectKey]
            }));
        } else {
            dispatch(updateSpaceEffects({
                spaceId,
                effects: { [effectKey]: gradientColors ?? true }
            }));
        }
    };

    return (
        <div className="w-56 bg-black/40 backdrop-blur-md rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-xl">{icon}</span>
                    <span className="text-white font-medium">{label}</span>
                </div>
                <button
                    onClick={handleToggle}
                    className={`text-2xl transition-colors ${isActive ? 'text-green-400' : 'text-white/30'}`}
                >
                    <FontAwesomeIcon icon={isActive ? faToggleOn : faToggleOff} />
                </button>
            </div>

            {isActive && effectKey === 'gradient' && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {gradients.map((g) => (
                        <button
                            key={g.name}
                            onClick={() => setSelectedGradient(g.name)}
                            className={`w-8 h-8 rounded-full transition-all hover:scale-110 ${
                                selectedGradient === g.name ? 'ring-2 ring-white' : ''
                            }`}
                            style={{ background: `linear-gradient(135deg, ${g.colors.join(', ')})` }}
                        />
                    ))}
                </div>
            )}

            <div className="mt-2 text-xs text-white/40">
                Status: {isActive ? 'Active' : 'Inactive'}
            </div>
        </div>
    );
};
