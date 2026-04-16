import React, { useCallback, type FC, use, useRef, useEffect } from "react";
import type { IStream } from "@/shared/types.ts";
import { EditorContext } from "@/features/Modal/EditorProvider.tsx";

const MAX_TITLE_LENGTH = 60;

export const StreamMetadataSettings: FC = () => {
    const editorContext = use(EditorContext);
    const changedItem = editorContext?.stream;
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const setStreamProperty = useCallback(<K extends keyof IStream>(key: K, value: IStream[K]) => {
        editorContext?.handleUpdate({[key]: value});
    }, [editorContext]);

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_TITLE_LENGTH) {
            setStreamProperty("name", value);
        }
    }, [setStreamProperty]);

    const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setStreamProperty("description", e.target.value);
        resizeTextarea();
    }, [setStreamProperty]);

    const resizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        resizeTextarea();
    }, [changedItem?.description]);

    const isTitleEmpty = !changedItem?.name.trim();

    return (
        <div className="space-y-6 h-full">
            {/* Title Input */}
            <div className="group">
                <div className="flex items-center justify-between mb-3">
                    <label className={`block text-xs font-semibold uppercase tracking-widest transition-colors group-hover:text-white group-focus-within:text-white ${
                        isTitleEmpty ? "text-red-400/70" : "text-white/70"
                    }`}>
                        Stream Title
                    </label>
                    <span className={`text-xs ${
                        isTitleEmpty ? "text-red-400/70" : "text-white/50"
                    }`}>
                        {changedItem?.name.length || 0}/{MAX_TITLE_LENGTH}
                    </span>
                </div>
                <div className={`px-4 py-3 bg-white/0 group-hover:bg-white/5 group-focus-within:bg-white/[0.08] transition-all duration-300 rounded-lg border ${
                    isTitleEmpty ? "border-red-500/30" : "border-transparent"
                }`}>
                    <input
                        type="text"
                        className="w-full bg-transparent text-white text-sm placeholder-white/40 transition-all duration-300 focus:outline-none break-words"
                        placeholder="Enter your stream title..."
                        value={changedItem?.name || ""}
                        onChange={handleNameChange}
                        maxLength={MAX_TITLE_LENGTH}
                    />
                </div>
                <div className={`h-px w-0 transition-all duration-300 ${
                    isTitleEmpty
                        ? "bg-gradient-to-r from-red-500/50 to-transparent group-focus-within:w-full"
                        : "bg-gradient-to-r from-blue-500/50 to-transparent group-focus-within:w-full"
                }`}></div>
                {isTitleEmpty && (
                    <p className="text-xs text-red-400/70 mt-2 flex items-center gap-1">
                        <i className="fas fa-exclamation-circle"></i>
                        Title cannot be empty
                    </p>
                )}
            </div>

            {/* Description Input */}
            <div className="group">
                <label className="block text-xs font-semibold uppercase tracking-widest text-white/70 mb-3 transition-colors group-hover:text-white group-focus-within:text-white">
                    Description
                </label>
                <div className="px-4 py-3 bg-white/0 group-hover:bg-white/5 group-focus-within:bg-white/[0.08] transition-all duration-300 rounded-lg">
                    <textarea
                        ref={textareaRef}
                        className="w-full h-full inset-0 bg-transparent text-white text-sm placeholder-white/40 resize-none transition-all duration-300 focus:outline-none break-words overflow-hidden"
                        placeholder="Enter your stream description..."
                        value={changedItem?.description || ""}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className="h-px w-0 bg-gradient-to-r from-blue-500/50 to-transparent group-focus-within:w-full transition-all duration-300"></div>
            </div>
        </div>
    );
};

export default StreamMetadataSettings;