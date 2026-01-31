import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AudioManager,
    getAudioDuration,
    getFileNameFromPath,
    TimelineManager,
} from "@/modules/StreamEditor";
import { selectStream, updateStream } from "@/slices/StreamSlice.ts";
import { StreamCardPartList } from "@/components/Stream/StreamCardPartList.tsx";
import type { RootState } from "@/index.tsx";
import type { IStream } from "@/types.ts";

const defaultItem: IStream = {
    id: "",
    name: "",
    audios: [],
    breakpoints: [],
    cover: "",
};

interface StreamEditorProps {
    streamId?: string;
}

export const StreamEditor: React.FC<StreamEditorProps> = ({
                                                              streamId,
                                                          }) => {
    const dispatch = useDispatch();
    const timelineRef = useRef<HTMLDivElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);
    const coverPreviewRef = useRef<HTMLImageElement>(null);

    const [changedItem, setChangedItem] = useState<IStream>({ ...defaultItem });
    const [coverPreview, setCoverPreview] = useState<string>("");

    // Get stream from store if streamId provided
    const stream = useSelector((state: RootState) =>
        streamId ? selectStream(state, streamId) : null
    );

    // Initialize managers
    const timelineManagerRef = useRef<TimelineManager | null>(null);
    const audioManagerRef = useRef<AudioManager | null>(null);

    useEffect(() => {
        if (timelineRef.current && !timelineManagerRef.current) {
            timelineManagerRef.current = new TimelineManager(
                (breakpoints) => {
                    setChangedItem((prev) => ({
                        ...prev,
                        breakpoints,
                    }));
                }
            );
            timelineManagerRef.current.setTimelineElement(timelineRef.current);
        }
    }, []);

    useEffect(() => {
        if (!audioManagerRef.current) {
            audioManagerRef.current = new AudioManager(
                (audios) => {
                    setChangedItem((prev) => ({
                        ...prev,
                        audios,
                    }));
                },
                () => {
                    updateTimelineMaxDuration(changedItem.audios, changedItem.breakpoints);
                }
            );
        }
    }, []);

    // Initialize with stream data when streamId changes
    useEffect(() => {
        if (streamId && stream) {
            setChangedItem({ ...stream });
            setCoverPreview(stream.cover);
            updateUI(stream);
        } else if (!streamId) {
            reset();
        }
    }, [streamId, stream]);

    const updateTimelineMaxDuration = useCallback(
        async (audios: string[], breakpoints: number[]) => {
            try {
                let totalDuration = 0;

                for (const audioPath of audios) {
                    try {
                        const duration = await getAudioDuration(audioPath);
                        totalDuration += duration;
                    } catch (error) {
                        console.warn(
                            `Failed to get duration for ${getFileNameFromPath(
                                audioPath
                            )}, using default 10000ms`
                        );
                        totalDuration += 10000;
                    }
                }

                const maxDuration = totalDuration > 0 ? totalDuration : 10000;

                if (timelineManagerRef.current) {
                    timelineManagerRef.current.setMaxDuration(maxDuration);
                    timelineManagerRef.current.setBreakpoints(breakpoints);
                }
            } catch (error) {
                console.error("Error updating timeline max duration:", error);
            }
        },
        []
    );

    const updateUI = useCallback((item: IStream) => {
        if (nameInputRef.current) {
            nameInputRef.current.value = item.name;
        }

        if (item.cover && coverPreviewRef.current) {
            coverPreviewRef.current.src = item.cover;
        }

        if (audioManagerRef.current) {
            audioManagerRef.current.setAudioFiles(item.audios);
        }

        updateTimelineMaxDuration(item.audios, item.breakpoints);
    }, [updateTimelineMaxDuration]);

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setChangedItem((prev) => ({
            ...prev,
            name: e.target.value,
        }));
    }, []);

    const handleCoverButtonClick = useCallback(() => {
        coverInputRef.current?.click();
    }, []);

    const handleCoverChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target?.result as string;
                    setChangedItem((prev) => ({
                        ...prev,
                        cover: dataUrl,
                    }));
                    setCoverPreview(dataUrl);
                    if (coverPreviewRef.current) {
                        coverPreviewRef.current.src = dataUrl;
                    }
                };
                reader.readAsDataURL(file);
            }
        },
        []
    );

    const handleSave = useCallback(() => {
        if (!changedItem.name.trim()) {
            alert("Please enter a stream name");
            return;
        }

        if (changedItem.audios.length === 0) {
            alert("Please add at least one audio file");
            return;
        }

        dispatch(updateStream(changedItem));
    }, [changedItem, dispatch]);

    const handleCancel = useCallback(() => {
        reset();
    }, []);

    const reset = useCallback(() => {
        setChangedItem({ ...defaultItem });
        setCoverPreview("");
        if (nameInputRef.current) {
            nameInputRef.current.value = "";
        }
        if (coverPreviewRef.current) {
            coverPreviewRef.current.src = "";
        }
        if (audioManagerRef.current) {
            audioManagerRef.current.setAudioFiles([]);
        }
        if (timelineManagerRef.current) {
            timelineManagerRef.current.setBreakpoints([]);
        }
    }, []);

    return (
        <div className="stream-editor">
            <div className="main_control">
                <div className="editor-section" data-type="main-view">
                    <div className="text-field" data-type="title">
                        <label>
                            <input
                                ref={nameInputRef}
                                type="text"
                                className="stream-editor__name-input"
                                placeholder="Stream name"
                                value={changedItem.name}
                                onChange={handleNameChange}
                            />
                        </label>
                    </div>

                    {/* Cover Image Section */}
                    <div className="image-cover">
                        <img
                            ref={coverPreviewRef}
                            className="stream-editor__cover-preview"
                            src={coverPreview}
                            alt="Stream cover"
                        />
                        <input
                            ref={coverInputRef}
                            type="file"
                            className="stream-editor__cover-input"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleCoverChange}
                        />
                        <div
                            className="button stream-editor__cover-button"
                            data-type="change-cover"
                            onClick={handleCoverButtonClick}
                        >
                            Change Cover
                        </div>
                    </div>

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
                    <div
                        ref={timelineRef}
                        className="stream-editor__timeline"
                        data-component="timeline"
                    ></div>
                    <div className="stream-editor__timeline-hint">
                        Left click to add • Right click to remove • Drag to move
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamEditor;