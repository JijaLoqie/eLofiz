import React, { useCallback, type FC, useEffect, createContext, useState, use } from "react";
import type { IStream } from "@/types.ts";
import { EditorContext } from "@/components/Modal/EditorProvider.tsx";
import { StreamTimeline } from "@/components/Stream/StreamEditor/StreamTimeline.tsx";

const defaultItem: IStream = {
    id: "",
    name: "",
    audios: [],
    breakpoints: [],
    cover: "",
    description: "",
};

interface StreamEditorProps {
    streamId: string;
}


export const StreamEditor: FC<StreamEditorProps> = ({streamId}) => {
    const editorContext = use(EditorContext);
    const changedItem = editorContext?.stream;




    const setStreamProperty = useCallback(<K extends keyof IStream>(key: K, value: IStream[K]) => {
        editorContext?.handleUpdate({[key]: value});
    }, []);


    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setStreamProperty("name", e.target.value);
    }, []);


    const handleCoverChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target?.result as string;
                    setStreamProperty("cover", dataUrl);
                };
                reader.readAsDataURL(file);
            }
        },
        []
    );

    const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setStreamProperty("description", e.target.value);
    }, [])

    const handleSave = useCallback(() => {
        if (!changedItem) return;
        if (!changedItem.name.trim()) {
            alert("Please enter a stream name");
            return;
        }

        if (changedItem.audios.length === 0) {
            alert("Please add at least one audio file");
            return;
        }

        editorContext?.handleSave();
    }, [changedItem]);

    const handleCancel = useCallback(() => {
        editorContext?.handleClose();
    }, []);

    return (
        <div className="stream-editor">
            <div className="main_control">
                <div data-type="main-view">
                    {changedItem?.cover && (
                    <div className="image-cover">
                        <img
                            className="shadow-"
                            src={changedItem.cover}
                            alt="Stream cover"
                        />
                    </div>
                    )}
                </div>
            </div>
            <div className="stream_control">
                {/* Timeline with breakpoints */}
                <div className="stream-editor__timeline-section editor-section">
                    <div className="stream-editor__timeline-label">
                        Timeline & Breakpoints
                    </div>
                    <StreamTimeline />
                    <div className="stream-editor__timeline-hint">
                        Left click to add • Right click to remove • Drag to move
                    </div>
                </div>
            </div>
            <div>
                <div className="button" onClick={handleSave}>Save</div>
                <div className="button" onClick={handleCancel}>Close</div>
            </div>
        </div>);
};

export default StreamEditor;