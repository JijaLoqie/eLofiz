import React, { type FC } from "react";

export const PlaylistEmpty: FC = () => {
    return (
        <div className="text-center py-8 text-white/50">
            <i className="fas fa-music text-2xl mb-2 block"></i>
            <p className="text-sm">No audio files added yet</p>
        </div>
    );
};

export default PlaylistEmpty;