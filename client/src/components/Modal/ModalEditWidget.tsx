import React, { use, useEffect } from "react";
import StreamEditor from "@/components/Stream/StreamEditor/StreamEditor.tsx";
import { EditorContext } from "@/components/Modal/EditorProvider.tsx";

interface ModalEditWidgetProps {
}

export const ModalEditWidget: React.FC<ModalEditWidgetProps> = () => {
    const editorContext = use(EditorContext);

    const handleCloseClick = () => {
        editorContext?.handleClose();
    };

    return (
        <div
            className={`
            absolute
            flex flex-col
            top-0 right-0
            max-w-[500px]
            bg-black
            z-[100]
            `}
        >
            <div className="relative h-fit min-h-12 flex">
                <div
                    className={
                    `h-12 aspect-square border-gray-500 text-white border-[1px] cursor-pointer flex justify-center items-center text-center`
                } onClick={handleCloseClick}
                >
                    &times;
                </div>
            </div>

            {editorContext?.stream && <StreamEditor streamId={editorContext?.stream.id} />}

            <div className="wrapper" data-type="modal-actions"></div>
        </div>
    );
};

export default ModalEditWidget;