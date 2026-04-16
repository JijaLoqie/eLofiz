import React, { use } from "react";
import { ModalListWidget } from "@/features/Modal/ModalListWidget.tsx";
import { ModalContext } from "@/features/Modal/ModalProvider.tsx";
import ModalEditWidget from "@/features/Modal/ModalEditWidget.tsx";
import { EditorContext } from "@/features/Modal/EditorProvider.tsx";

export const Modal = () => {
    const modalData = use(ModalContext);
    const editorData = use(EditorContext);
    const isOpenList = !!modalData?.value;
    const isOpenEditor = !!editorData?.stream;
    return (
        <>
            {isOpenList && <ModalListWidget />}
            {isOpenEditor && <ModalEditWidget /> }
        </>
    );
}