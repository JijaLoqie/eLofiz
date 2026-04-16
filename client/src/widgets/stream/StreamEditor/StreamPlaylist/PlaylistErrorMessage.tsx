import React, { type FC } from "react";

interface PlaylistErrorProps {
    error: Error | null;
}

export const PlaylistError: FC<PlaylistErrorProps> = ({ error }) => {
    if (!error) return null;

    return (
        <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-xs text-red-400 flex items-center gap-2">
                <i className="fas fa-exclamation-circle"></i>
                {error.message}
            </p>
        </div>
    );
};

export default PlaylistError;