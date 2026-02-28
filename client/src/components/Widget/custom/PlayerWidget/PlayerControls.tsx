import React, { type FC } from "react";
import { PlayerButton } from "./PlayerButton";

interface PlayerControlsProps {
    currentTime: string;
    duration: string;
    volume: number;
    onVolumeDown: () => void;
    onVolumeUp: () => void;
}

export const PlayerControls: FC<PlayerControlsProps> = ({
                                                            currentTime,
                                                            duration,
                                                            volume,
                                                            onVolumeDown,
                                                            onVolumeUp,
                                                        }) => {
    return (
        <div className="flex justify-between items-center border-t border-[#b462ff]/20 px-4 py-3 mt-1">
            <span className="text-sm font-semibold text-[#898989] whitespace-nowrap">
                {currentTime} / {duration}
            </span>
            <div className="flex items-center ml-2">
                <PlayerButton
                    label="[v-]"
                    onClick={onVolumeDown}
                    color="controls"
                    ariaLabel="Decrease volume"
                />
                <PlayerButton
                    label="[v+]"
                    onClick={onVolumeUp}
                    color="controls"
                    ariaLabel="Increase volume"
                />

                <span className="text-sm font-semibold text-[#b462ff] w-[5ch] text-right">
                    {volume}%
                </span>
            </div>
        </div>);
};

export default PlayerControls;