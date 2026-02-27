import React, { use } from "react";
import { ModalListWidget } from "@/components/Modal/ModalListWidget.tsx";
import { ModalContext } from "@/components/Modal/ModalProvider.tsx";

export const Modal = () => {
    const modalData = use(ModalContext);
    const isOpen = !!modalData?.value;
    return (
        <>
            {isOpen && <ModalListWidget />}
        </>
    );
}