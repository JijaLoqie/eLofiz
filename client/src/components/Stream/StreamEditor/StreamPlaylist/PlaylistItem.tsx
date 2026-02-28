import React, { useCallback, type FC } from "react";
import type { IStream, IAudio } from "@/types.ts";
import { formatDuration } from "@/modules/StreamEditor";
import type { EditorContextType } from "@/components/Modal/EditorProvider.tsx";

interface PlaylistItemProps {
    audio: IAudio;
    index: number;
    isLoading: boolean;
    totalItems: number;
    changedItem: IStream | undefined;
    editorContext: EditorContextType | undefined;
}

export const PlaylistItem: FC<PlaylistItemProps> = ({
                                                        audio,
                                                        index,
                                                        isLoading,
                                                        totalItems,
                                                        changedItem,
                                                        editorContext,
                                                    }) => {
    const handleRemoveAudio = useCallback(() => {
        const updatedAudios = changedItem?.audios.filter((a: IAudio) => a.id !== audio.id) || [];
        editorContext?.handleUpdate({ audios: updatedAudios });
    }, [audio.id, changedItem?.audios, editorContext]);

    const handleMoveAudio = useCallback((direction: "up" | "down") => {
        if (!changedItem?.audios) return;
        const newIndex = direction === "up" ? index - 1 : index + 1;
        const newAudios = [...changedItem.audios];
        const [movedAudio] = newAudios.splice(index, 1);
        newAudios.splice(newIndex, 0, movedAudio);
        editorContext?.handleUpdate({ audios: newAudios });
    }, [index, changedItem?.audios, editorContext]);

    const isFirst = index === 0;
    const isLast = index === totalItems - 1;

    return (
        <div className="group/item flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20">
            {/* Order Number */}
            <div className="text-white/40 text-xs font-semibold w-6 text-center">
                {index + 1}
            </div>

            {/* Audio Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">
                    {audio.name}
                </p>
                <p className="text-xs text-white/40 mt-1">
                    {isLoading && audio.duration === 0 ? (
                        <span className="flex items-center gap-1">
                            <i className="fas fa-spinner animate-spin"></i>
                            Loading...
                        </span>
                    ) : audio.duration > 0 ? (
                        formatDuration(audio.duration)
                    ) : (
                        "Unknown"
                    )}
                </p>
            </div>

            {/* Move Buttons */}
            <div className="flex gap-1">
                <button
                    onClick={() => handleMoveAudio("up")}
                    disabled={isFirst}
                    className="p-2 text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    title="Move up"
                >
                    <i className="fas fa-chevron-up"></i>
                </button>
                <button
                    onClick={() => handleMoveAudio("down")}
                    disabled={isLast}
                    className="p-2 text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    title="Move down"
                >
                    <i className="fas fa-chevron-down"></i>
                </button>
            </div>

            {/* Remove Button */}
            <button
                onClick={handleRemoveAudio}
                className="p-2 text-white/40 hover:text-red-400 transition-colors opacity-0 group-hover/item:opacity-100"
                title="Remove"
            >
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
};

export default PlaylistItem;