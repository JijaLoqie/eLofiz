import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { updateSpaceEffects, clearSpaceEffects } from "@/slices/SpaceSlice.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff, faCloudRain } from "@fortawesome/free-solid-svg-icons";

interface RainEffectsWidgetProps {
    spaceId: string;
}

export const RainEffectsWidget = ({ spaceId }: RainEffectsWidgetProps) => {
    const dispatch = useDispatch();
    const space = useSelector((state: RootState) => 
        state.spaces.items.find(s => s.id === spaceId)
    );
    const isActive = space?.effects?.rain === true;
    const [intensity, setIntensity] = useState(50);

    const handleToggle = () => {
        if (isActive) {
            dispatch(clearSpaceEffects({ spaceId, effectKeys: ['rain'] }));
        } else {
            dispatch(updateSpaceEffects({ spaceId, effects: { rain: true, flame: false, snow: false, snowyWind: false } }));
        }
    };

    return (
        <div className="w-40 bg-black/40 backdrop-blur-md rounded-2xl p-3">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCloudRain} className="text-blue-400" />
                    <span className="text-white text-sm font-medium">Дождь</span>
                </div>
                <button
                    onClick={handleToggle}
                    className={`text-lg transition-colors ${isActive ? 'text-green-400' : 'text-white/30'}`}
                >
                    <FontAwesomeIcon icon={isActive ? faToggleOn : faToggleOff} />
                </button>
            </div>
            {isActive && (
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={intensity}
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                />
            )}
        </div>
    );
};
