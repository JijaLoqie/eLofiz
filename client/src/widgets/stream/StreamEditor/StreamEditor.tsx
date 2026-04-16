import React, { useCallback, type FC, useState, use } from "react";
import type { IStream } from "@/shared/types.ts";
import { EditorContext } from "@/features/Modal/EditorProvider.tsx";
import { StreamMetadataSettings } from "@/widgets/stream/StreamEditor/StreamMetadataSettings.tsx";
import { StreamTimelineSettings } from "@/widgets/stream/StreamEditor/StreamTimelineSettings.tsx";
import { StreamPlaylistSettings } from "@/widgets/stream/StreamEditor/StreamPlaylist/StreamPlaylistSettings.tsx";

interface StreamEditorProps {
}

type TabType = "metadata" | "timeline" | "playlist";

export const StreamEditor: FC<StreamEditorProps> = () => {
    const editorContext = use(EditorContext);
    const changedItem = editorContext?.stream;
    const [activeTab, setActiveTab] = useState<TabType>("playlist");

    const handleCoverChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target?.result as string;
                    editorContext?.handleUpdate({cover: dataUrl});
                };
                reader.readAsDataURL(file);
            }
        },
        [editorContext]
    );

    const tabs: { id: TabType; label: string; icon: string }[] = [
        { id: "metadata", label: "Metadata", icon: "fas fa-info-circle" },
        { id: "timeline", label: "Timeline", icon: "fas fa-bars" },
        { id: "playlist", label: "Playlist", icon: "fas fa-music" },
    ];

    return (
        <div className="h-full space-y-6">
            {/* Cover Image Settings */}
            {changedItem?.cover && (
                <div className="relative group">
                    <img
                        className="group rounded-lg w-full h-48 object-cover"
                        src={changedItem.cover}
                        alt="Stream cover"
                    />
                    <label className="absolute bottom-2 right-2 aspect-square bg-black/60 group-hover:bg-black/80 p-3 transition-all cursor-pointer hover:scale-105 rounded-lg flex items-center justify-center">
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleCoverChange}
                        />
                        <i className="fas fa-pen text-white"></i>
                    </label>
                </div>
            )}

            {/* Tab Navigation */}
            <div className="flex gap-1 border-b border-white/10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-3 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-300 border-b-2 ${
                            activeTab === tab.id
                                ? "text-white border-blue-500/50"
                                : "text-white/50 border-transparent hover:text-white/70"
                        }`}
                    >
                        <i className={tab.icon}></i>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
                {activeTab === "metadata" && <StreamMetadataSettings />}
                {activeTab === "timeline" && <StreamTimelineSettings />}
                {activeTab === "playlist" && <StreamPlaylistSettings />}
            </div>
        </div>
    );
};

export default StreamEditor;