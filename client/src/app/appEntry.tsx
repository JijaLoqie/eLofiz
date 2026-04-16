import { useIntersectionSpaceHandler } from "@/shared/hooks/useIntersectionSpaceHandler.ts";
import React, { useEffect } from "react";
import { Spaces } from "@/pages/spaces/Spaces.tsx";
import { Modal } from "@/features/Modal/Modal.tsx";
import { useDispatch } from "react-redux";
import { setCurrentSpace, updateSpaceMetrics } from "@/pages/spaces/model/IntersectionSlice.ts";
import { ModalProvider } from "@/features/Modal/ModalProvider.tsx";
import { NotificationContainer } from "@/shared/Notifications/NotificationContainer.tsx";
import { NotificationProvider } from "@/shared/Notifications/NotificationProvider.tsx";
import { EditorProvider } from "@/features/Modal/EditorProvider.tsx";



export const AppEntry = () => {
    const dispatch = useDispatch();
    const {
        currentSpaceName,
        spaceMetrics,
    } = useIntersectionSpaceHandler();



    useEffect(() => {
        dispatch(setCurrentSpace(currentSpaceName));
    }, [currentSpaceName]);

    useEffect(() => {
        dispatch(updateSpaceMetrics(spaceMetrics));
    }, [spaceMetrics]);


    return (
        <div style={{
            scrollbarWidth: "none",
        }}>
            <ModalProvider>
                <NotificationProvider>
                    <EditorProvider>
                        <Spaces />
                        <Modal />
                        <NotificationContainer />
                    </EditorProvider>
                </NotificationProvider>
            </ModalProvider>
        </div>
    );
};