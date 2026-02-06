import { useIntersectionSpaceHandler } from "@/components/hooks/useIntersectionSpaceHandler.ts";
import React, { useEffect } from "react";
import { Spaces } from "@/components/Space/Spaces.tsx";
import { Modal } from "@/components/Modal/Modal.tsx";
import { Provider, useDispatch } from "react-redux";
import { setCurrentSpace, updateSpaceMetrics } from "@/slices/IntersectionSlice.ts";

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
        <>
            <Spaces />
            <Modal />
        </>
    );
};