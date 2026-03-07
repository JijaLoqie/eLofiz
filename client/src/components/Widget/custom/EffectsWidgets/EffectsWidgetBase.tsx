import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { updateSpaceEffects, clearSpaceEffects } from "@/slices/SpaceSlice.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff, faMagic } from "@fortawesome/free-solid-svg-icons";

interface EffectsWidgetBaseProps {
    spaceId: string;
    effectKey: 'aurora' | 'blur' | 'vignette' | 'noise';
    label: string;
    icon: string;
    defaultValue?: unknown;
}

export const EffectsWidgetBase = ({ spaceId, effectKey, label, icon, defaultValue }: EffectsWidgetBaseProps) => {
    const dispatch = useDispatch();
    const space = useSelector((state: RootState) => 
        state.spaces.items.find(s => s.id === spaceId)
    );
    const isActive = space?.effects?.[effectKey] !== undefined && space?.effects?.[effectKey] !== false;
    const [intensity, setIntensity] = useState(50);

    useEffect(() => {
        if (isActive && effectKey === 'blur') {
            dispatch(updateSpaceEffects({
                spaceId,
                effects: { blur: intensity / 10 }
            }));
        }
    }, [intensity, isActive, effectKey, spaceId, dispatch]);

    const handleToggle = () => {
        if (isActive) {
            dispatch(clearSpaceEffects({
                spaceId,
                effectKeys: [effectKey]
            }));
        } else {
            dispatch(updateSpaceEffects({
                spaceId,
                effects: { [effectKey]: defaultValue ?? true }
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

            {isActive && effectKey === 'blur' && (
                <div className="mt-3">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={intensity}
                        onChange={(e) => setIntensity(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="text-white/50 text-xs mt-1 text-center">
                        Intensity: {intensity}%
                    </div>
                </div>
            )}

            <div className="mt-2 text-xs text-white/40">
                Status: {isActive ? 'Active' : 'Inactive'}
            </div>
        </div>
    );
};
