import { useIntersectionSpaceHandler } from "@/components/hooks/useIntersectionSpaceHandler.ts";
import React, { useEffect } from "react";
import { appStore } from "@/app/appStore.ts";
import { Spaces } from "@/components/Space/Spaces.tsx";
import { Modal } from "@/components/Modal/Modal.tsx";
import { Provider } from "react-redux";
import { setCurrentSpace } from "@/slices/IntersectionSlice.ts";

export const AppEntry = () => {
    const {
        currentSpaceName,
    } = useIntersectionSpaceHandler();


    useEffect(() => {
        appStore.dispatch(setCurrentSpace(currentSpaceName));

    }, [currentSpaceName]);

    return (
        <>
            <Spaces />
            <Modal />
        </>
    );
};