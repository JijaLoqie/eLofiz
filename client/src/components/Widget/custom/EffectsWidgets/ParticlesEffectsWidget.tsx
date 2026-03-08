import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { updateSpaceEffects, clearSpaceEffects } from "@/slices/SpaceSlice.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff, faAsterisk } from "@fortawesome/free-solid-svg-icons";

interface ParticlesEffectsWidgetProps {
    spaceId: string;
}

export const ParticlesEffectsWidget = ({ spaceId }: ParticlesEffectsWidgetProps) => {
    const dispatch = useDispatch();
    const space = useSelector((state: RootState) => 
        state.spaces.items.find(s => s.id === spaceId)
    );
    const isActive = space?.effects?.particles === true;

    const handleToggle = () => {
        if (isActive) {
            dispatch(clearSpaceEffects({ spaceId, effectKeys: ['particles'] }));
        } else {
            dispatch(updateSpaceEffects({ spaceId, effects: { particles: true } }));
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleToggle}
                className={`
                    px-3 py-2 rounded-xl text-sm font-medium transition-all
                    ${isActive 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : 'bg-black/30 text-white/50 hover:bg-black/50'
                    }
                `}
            >
                <FontAwesomeIcon icon={faAsterisk} className="mr-2" />
                Частицы
            </button>
        </div>
    );
};
