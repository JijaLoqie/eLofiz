import { Space } from "@/pages/spaces/Space.tsx";

import { EntrySpace } from "@/pages/EntrySpace/EntrySpace.tsx";
import { observer } from "mobx-react-lite";
import { model } from "@/features/spaces-session"
import React from "react";
import { ModalProvider } from "@/features/Modal/ModalProvider.tsx";
import { Modal } from "@/features/Modal/Modal.tsx";


export const Spaces = observer(() => {
    const { spaces } = model.useSpaceListStore();

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