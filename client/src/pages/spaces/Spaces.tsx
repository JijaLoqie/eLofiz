import { Space } from "@/pages/spaces/Space.tsx";

import { EntrySpace } from "@/pages/EntrySpace/EntrySpace.tsx";
import { observer } from "mobx-react-lite";
import { model } from "@/features/spaces-session"
import { useDispatch } from "react-redux";
import { useIntersectionSpaceHandler } from "@/shared/hooks/useIntersectionSpaceHandler.ts";
import React, { useEffect } from "react";
import { setCurrentSpace, updateSpaceMetrics } from "@/pages/spaces/model/IntersectionSlice.ts";
import { ModalProvider } from "@/features/Modal/ModalProvider.tsx";
import { Modal } from "@/features/Modal/Modal.tsx";


export const Spaces = observer(() => {
    const dispatch = useDispatch();

    const { spaces } = model.useSpaceListStore();
    const {
        currentSpaceName,
        spaceMetrics,
    } = useIntersectionSpaceHandler(spaces);



    useEffect(() => {
        dispatch(setCurrentSpace(currentSpaceName));
    }, [currentSpaceName]);

    useEffect(() => {
        dispatch(updateSpaceMetrics(spaceMetrics));
    }, [spaceMetrics]);

    return (
        <>
            {spaces.length === 0 ? (
                <EntrySpace />
            ) : (
                <ModalProvider>
                    {spaces.map((space) => <Space spaceId={space.id} key={space.id}/>)}
                    <Modal />
                </ModalProvider> )
            }
        </>
    )
})