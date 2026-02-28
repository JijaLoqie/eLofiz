import React, { type FC } from "react";
import { PlayerButton } from "./PlayerButton";

interface PlayerInfoProps {
    streamName: string | undefined;
    titleOffset: number;
    onPlaylistClick: () => void;
}

const getSlicedTitle = (title: string, maxLength: number = 20, offset: number = 0): string => {
    let newTitle = title + " | " + title
    if (title.length <= maxLength) return title;
    offset %= newTitle.length
    return newTitle.slice(offset, offset + maxLength + 2);
};

export const PlayerInfo: FC<PlayerInfoProps> = ({ streamName, titleOffset, onPlaylistClick }) => {
    return (
        <div className="flex justify-between items-center border-b border-[#898989]/20 px-4 py-3 mb-1">
            <div className="w-[20ch] text-left text-base font-semibold truncate">
                {streamName ? getSlicedTitle(streamName, 20, titleOffset) : "Loading..."}
            </div>
            <PlayerButton
                label="[playlist]"
                onClick={onPlaylistClick}
                color="info"
            />
        </div>
    );
};

export default PlayerInfo;