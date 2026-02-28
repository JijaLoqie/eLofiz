import React, { type FC } from "react";
import type { IAudio } from "@/types.ts";
import { formatDuration } from "@/modules/StreamEditor";

interface PlaylistHeaderProps {
    tracks: IAudio[];
    totalDuration: number;
}

export const PlaylistHeader: FC<PlaylistHeaderProps> = ({ tracks, totalDuration }) => {
    return (
        <div className="flex items-center justify-between px-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                Playlist ({tracks.length})
            </p>
            {totalDuration > 0 && (
                <p className="text-xs text-white/40">
                    Total: {formatDuration(totalDuration)}
                </p>
            )}
        </div>
    );
};

export default PlaylistHeader;