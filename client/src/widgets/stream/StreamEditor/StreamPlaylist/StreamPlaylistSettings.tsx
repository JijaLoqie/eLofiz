import React, { type FC, use } from "react";
import type { IStream } from "@/shared/types.ts";
import { EditorContext } from "@/features/Modal/EditorProvider.tsx";
import { PlaylistHeader } from "./PlaylistHeader.tsx";
import { PlaylistAddButton } from "./PlaylistAddButton.tsx";
import { PlaylistList } from "./PlaylistList.tsx";
import { PlaylistEmpty } from "./PlaylistEmpty.tsx";
import PlaylistError from "@/widgets/stream/StreamEditor/StreamPlaylist/PlaylistErrorMessage.tsx";
import { useResolveAudioTracks } from "@/shared/hooks/useResolveAudioTracks.ts";

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