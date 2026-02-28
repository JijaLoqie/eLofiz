import React, { type FC, use } from "react";
import type { IStream } from "@/types.ts";
import { EditorContext } from "@/components/Modal/EditorProvider.tsx";
import { PlaylistHeader } from "./PlaylistHeader";
import { PlaylistAddButton } from "./PlaylistAddButton";
import { PlaylistList } from "./PlaylistList";
import { PlaylistEmpty } from "./PlaylistEmpty";
import PlaylistError from "@/components/Stream/StreamEditor/StreamPlaylist/PlaylistErrorMessage.tsx";
import { useResolveAudioTracks } from "@/components/hooks/useResolveAudioTracks.ts";

export const StreamPlaylistSettings: FC = () => {
    const editorContext = use(EditorContext);
    const changedItem = editorContext?.stream ?? undefined;
    const { tracks, totalDuration, isLoading, error } = useResolveAudioTracks(changedItem?.audios);

    return (
        <div className="space-y-6">
            <PlaylistAddButton changedItem={changedItem} editorContext={editorContext} />
            <PlaylistError error={error} />
            {tracks && tracks.length > 0 ? (
                <>
                    <PlaylistHeader tracks={tracks} totalDuration={totalDuration} />
                    <PlaylistList
                        tracks={tracks}
                        isLoading={isLoading}
                        changedItem={changedItem}
                        editorContext={editorContext}
                    />
                </>
            ) : (
                <PlaylistEmpty />
            )}
        </div>
    );
};

export default StreamPlaylistSettings;