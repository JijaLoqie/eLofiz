import React, { use, useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { selectStream } from "@/entities/stream/model/StreamSlice.ts";
import StreamEditor from "@/widgets/stream/StreamEditor/StreamEditor.tsx";
import { EditorContext } from "@/features/Modal/EditorProvider.tsx";

interface ModalEditWidgetProps {
}

export const ModalEditWidget: React.FC<ModalEditWidgetProps> = () => {
    const editorContext = use(EditorContext);
    const stream = useSelector((state: RootState) => selectStream(state, editorContext?.stream?.id || ""));

    const handleCloseClick = useCallback(() => {
        editorContext?.handleClose();
    }, [editorContext]);

    const handleSave = useCallback(() => {
        if (!editorContext?.stream) return;
        if (!editorContext.stream.name.trim()) {
            alert("Please enter a stream name");
            return;
        }

        if (editorContext.stream.audios.length === 0) {
            alert("Please add at least one audio file");
            return;
        }

        editorContext?.handleSave();
    }, [editorContext]);

    const handleCancel = useCallback(() => {
        editorContext?.handleClose();
    }, [editorContext]);

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 z-[99]"
                onClick={handleCloseClick}
            />

            {/* Modal */}
            <div className="fixed top-0 right-0 w-[500px] h-screen bg-black/95 backdrop-blur-md border-l border-white/10 z-[100] flex flex-col"
                 style={{
                     animation: "slideIn 0.3s ease-out",
                 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-white/80">
                        {stream?.name || "Stream Name"}
                    </h2>
                    <button
                        onClick={handleCloseClick}
                        className="h-8 w-8 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300 hover:bg-white/10 rounded-lg"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {editorContext?.stream && <StreamEditor />}
                </div>

                {/* Action Buttons */}
                <div className="border-t border-white/10 px-6 py-4 flex gap-3">
                    <button
                        onClick={handleSave}
                        disabled={!editorContext?.stream?.name.trim()}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-blue-600/50 disabled:to-blue-700/50 disabled:cursor-not-allowed text-white text-sm font-semibold uppercase tracking-widest rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 disabled:shadow-none"
                    >
                        <i className="fas fa-check mr-2"></i>
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold uppercase tracking-widest rounded-lg transition-all duration-300 border border-white/20 hover:border-white/30"
                    >
                        <i className="fas fa-times mr-2"></i>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default ModalEditWidget;