import React, { type FC } from "react";
import { PlayerButton } from "./PlayerButton";

interface PlayerNavigationProps {
    isPlaying: boolean;
    onPrev: () => void;
    onRewind: () => void;
    onToggle: () => void;
    onForward: () => void;
    onNext: () => void;
}

export const PlayerNavigation: FC<PlayerNavigationProps> = ({
                                                                isPlaying,
                                                                onPrev,
                                                                onRewind,
                                                                onToggle,
                                                                onForward,
                                                                onNext,
                                                            }) => {
    return (
        <div className="flex justify-center px-4 py-3 gap-1">
            <PlayerButton
                label="[prev]"
                onClick={onPrev}
                color="navigation"
                ariaLabel="Previous track"
            />
            <PlayerButton
                label="[-30]"
                onClick={onRewind}
                color="navigation"
            />
            <PlayerButton
                label={isPlaying ? "[stop]" : "[play]"}
                onClick={onToggle}
                color="navigation"
            />
            <PlayerButton
                label="[+30]"
                onClick={onForward}
                color="navigation"
            />
            <PlayerButton
                label="[next]"
                onClick={onNext}
                color="navigation"
                ariaLabel="Next track"
            />
        </div>
    );
};

export default PlayerNavigation;