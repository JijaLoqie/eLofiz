import React, { use } from "react";
import { ModalListWidget } from "@/components/Modal/ModalListWidget.tsx";
import { ModalContext } from "@/components/Modal/ModalProvider.tsx";
import ModalEditWidget from "@/components/Modal/ModalEditWidget.tsx";
import { EditorContext } from "@/components/Modal/EditorProvider.tsx";
import * as stream from "node:stream";

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