import React, { useEffect } from "react";
import { Spaces } from "@/pages/spaces/Spaces.tsx";
import { Modal } from "@/features/Modal/Modal.tsx";
import { NotificationContainer } from "@/shared/Notifications/NotificationContainer.tsx";
import { NotificationProvider } from "@/shared/Notifications/NotificationProvider.tsx";
import { EditorProvider } from "@/features/Modal/EditorProvider.tsx";

import { model } from "@/features/spaces-session"


export const AppEntry = () => {
    return (
        <div style={{
            scrollbarWidth: "none",
        }}>
            <NotificationProvider>
                <EditorProvider>
                    <model.SpacesSessionProvider>
                        <Spaces />
                    </model.SpacesSessionProvider>
                    <NotificationContainer />
                </EditorProvider>
            </NotificationProvider>
        </div>
    );
};