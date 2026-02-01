import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { ModalType } from "@/types.ts";
import ModalEditWidget from "@/components/Modal/ModalEditWidget.tsx";
import React from "react";
import { ModalListWidget } from "@/components/Modal/ModalListWidget.tsx";

export const Modal = () => {
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const currentEntityId = useSelector((state: RootState) => state.modal.currentEntityId);
    return (
        <>
            {isOpen && <ModalListWidget />}
            {currentEntityId && <ModalEditWidget />}
        </>
    );
}