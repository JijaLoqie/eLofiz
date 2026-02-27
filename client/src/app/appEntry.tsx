import { useIntersectionSpaceHandler } from "@/components/hooks/useIntersectionSpaceHandler.ts";
import React, { createContext, useEffect } from "react";
import { Spaces } from "@/components/Space/Spaces.tsx";
import { Modal } from "@/components/Modal/Modal.tsx";
import { useDispatch } from "react-redux";
import { setCurrentSpace, updateSpaceMetrics } from "@/slices/IntersectionSlice.ts";
import { ModalProvider } from "@/components/Modal/ModalProvider.tsx";



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
                <Spaces />
                <Modal />
            </ModalProvider>
        </div>
    );
};