import React, { type FC } from "react";
import type { IStream, IAudio } from "@/types.ts";
import type { EditorContextType } from "@/components/Modal/EditorProvider.tsx";
import { PlaylistItem } from "./PlaylistItem";

interface PlaylistListProps {
    tracks: IAudio[];
    isLoading: boolean;
    changedItem: IStream | undefined;
    editorContext: EditorContextType | undefined;
}

export const PlaylistList: FC<PlaylistListProps> = ({
                                                        tracks,
                                                        isLoading,
                                                        changedItem,
                                                        editorContext,
                                                    }) => {
    return (
        <div className="space-y-2">
            {tracks.map((audio: IAudio, index: number) => (
                <PlaylistItem
                    key={`${index}-${audio.id}`}
                    audio={audio}
                    index={index}
                    isLoading={isLoading}
                    totalItems={tracks.length}
                    changedItem={changedItem}
                    editorContext={editorContext}
                />
            ))}
        </div>
    );
};

export default PlaylistList;