import { createContext, type FC, type ReactNode, use, useCallback, useRef, useState } from "react";
import type { IStream } from "@/shared/types.ts";
import { NotificationContext } from "@/shared/Notifications/NotificationProvider.tsx";
import { useStreamStore } from "@/features/preload-session/store";

export interface EditorContextType {
    stream: IStream | null;
    handleUpdate: (item: Partial<IStream>) => void,
    handleOpen: (item: IStream) => void,
    handleClose: () => void,
    handleSave: () => void,
}
export const EditorContext = createContext<EditorContextType | undefined>(undefined);



export const EditorProvider: FC<{children: ReactNode}> = ({children}) => {
    const streamStore = useStreamStore();
    const notificationContext = use(NotificationContext);
    const [editorItem, setEditorItem] = useState<IStream | null>(null);

    const handleUpdate = (item: Partial<IStream>) => {
        setEditorItem(old => old ? ({
            ...old,
            ...item,
        }) : null);
    }

    const handleClose = useCallback(() => {
        setEditorItem(null);
    }, []);

    const handleSave = useCallback(() => {
        if (!editorItem) return;
        streamStore.saveStream(editorItem);
        notificationContext?.setValue?.("Успешно сохранено");
        handleClose();
    }, [handleClose, editorItem]);

    const handleOpen = (item: IStream) => {
        // todo: need to write normal logic here
        setEditorItem(item);
    }

    return (
        <EditorContext.Provider value={{
            handleUpdate,
            handleOpen,
            handleClose,
            handleSave,
            stream: editorItem,
        }}>
            {children}
        </EditorContext.Provider>
    )
}