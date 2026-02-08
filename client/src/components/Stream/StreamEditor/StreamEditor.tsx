import React, { useCallback, type FC, useEffect, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectStream,
    selectEditingStream,
    updateEditingStream,
    saveStream, setEditingStream
} from "@/slices/StreamSlice.ts";
import { StreamCardPartList } from "@/components/Stream/StreamEditor/StreamCardPartList.tsx";
import type { RootState } from "@/index.tsx";
import type { IStream } from "@/types.ts";
import { StreamTimeline } from "@/components/Stream/StreamEditor/StreamTimeline.tsx";

const defaultItem: IStream = {
    id: "",
    name: "",
    audios: [],
    breakpoints: [],
    cover: "",
};

interface StreamEditorProps {
    streamId: string;
}


export const StreamEditor: FC<StreamEditorProps> = ({streamId}) => {
    const dispatch = useDispatch();
    const changedItem = useSelector((state: RootState) => selectEditingStream(state));



    const setStreamProperty = useCallback(<K extends keyof IStream>(key: K, value: IStream[K]) => {
        dispatch(updateEditingStream({[key]: value}));
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

        dispatch(saveStream());
    }, [changedItem, dispatch]);

    const handleCancel = useCallback(() => {
        dispatch(setEditingStream(null));
    }, []);

    return (
        <div className="stream-editor">
            <div className="main_control">
                <div className="editor-section" data-type="main-view">

                    {changedItem?.name && (<div className="text-field" data-type="title">
                        <label>
                            <input
                                type="text"
                                className="stream-editor__name-input"
                                placeholder="Stream name"
                                value={changedItem.name}
                                onChange={handleNameChange}
                            />
                        </label>
                    </div>)}

                    {changedItem?.cover && (<div className="image-cover">
                        <img
                            className="stream-editor__cover-preview"
                            src={changedItem.cover}
                            alt="Stream cover"
                        />
                        <label>
                            <input
                                type="file"
                                className="stream-editor__cover-input"
                                accept="image/*"
                                style={{display: "none"}}
                                onChange={handleCoverChange}
                            />
                            <div
                                className="button stream-editor__cover-button"
                                data-type="change-cover"
                            >
                                Change Cover
                            </div>
                        </label>
                    </div>)}

                    <div className="text-field" data-type="description">
                        <label>
                            <textarea placeholder="Добавьте описание"></textarea>
                        </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="stream-editor__actions">
                        <div
                            className="button stream-editor__action-save"
                            data-type="save"
                            onClick={handleSave}
                        >
                            Save
                        </div>
                        <div
                            className="button stream-editor__action-cancel"
                            data-type="cancel"
                            onClick={handleCancel}
                        >
                            Cancel
                        </div>
                    </div>
                </div>
            </div>

            <div className="stream_control">
                <div className="editor-section" data-type="stream-parts">
                    <div className="stream-editor__audio-label">
                        Составные части
                    </div>
                    <div
                        className="items-list-wrapper"
                        data-type="stream-parts"
                    >
                        {streamId && <StreamCardPartList streamId={streamId} />}
                    </div>
                </div>

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
        </div>
    );
};

export default StreamEditor;