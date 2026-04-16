import React, { useCallback, type FC } from "react";
import type { IStream } from "@/shared/types.ts";
import { uuid } from "../../../../shared/utils.ts";
import type { IAudio } from "@/shared/types.ts";
import type { EditorContextType } from "@/features/Modal/EditorProvider.tsx";

interface PlaylistAddButtonProps {
    changedItem: IStream | undefined;
    editorContext: EditorContextType | undefined;
}

export const PlaylistAddButton: FC<PlaylistAddButtonProps> = ({ changedItem, editorContext }) => {
    const handleAddAudio = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
                const newAudios = Array.from(files).map((file) => ({
                    id: uuid(),
                    name: file.name,
                    url: URL.createObjectURL(file),
                    duration: 0,
                } as IAudio));

                editorContext?.handleUpdate({
                    audios: [...(changedItem?.audios || []), ...newAudios],
                });
            }
        },
        [changedItem?.audios, editorContext]
    );

    return (
        <div className="group">
            <label className="block px-4 py-3 bg-white/0 group-hover:bg-white/5 group-focus-within:bg-white/[0.08] transition-all duration-300 rounded-lg border border-dashed border-white/20 group-hover:border-white/40 cursor-pointer text-center">
                <input
                    type="file"
                    multiple
                    accept="audio/*"
                    className="hidden"
                    onChange={handleAddAudio}
                />
                <div className="flex flex-col items-center gap-2 text-white/70 group-hover:text-white transition-colors">
                    <i className="fas fa-plus text-lg"></i>
                    <span className="text-xs font-semibold uppercase tracking-widest">
                        Add Audio Files
                    </span>
                </div>
            </label>
        </div>
    );
};

export default PlaylistAddButton;