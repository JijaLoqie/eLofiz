import React from "react";
import { Spaces } from "@/pages/spaces/Spaces.tsx";
import { NotificationContainer } from "@/shared/Notifications/NotificationContainer.tsx";
import { NotificationProvider } from "@/shared/Notifications/NotificationProvider.tsx";
import { EditorProvider } from "@/features/Modal/EditorProvider.tsx";

import { model as sessionModel } from "@/features/spaces-session"
import { model as preloadModel } from "@/features/preload-session";


export const AppEntry = () => {
    return (
        <div style={{
            scrollbarWidth: "none",
        }}>
            <sessionModel.SpacesSessionProvider>
                <preloadModel.PreloadStoreProvider>
                    <NotificationProvider>
                        <EditorProvider>
                            <Spaces />
                        </EditorProvider>
                    </NotificationProvider>
                </preloadModel.PreloadStoreProvider>
            </sessionModel.SpacesSessionProvider>
            <NotificationContainer />
        </div>
    );
};