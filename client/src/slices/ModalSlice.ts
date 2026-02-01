import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { EntityType, ModalType } from "@/types.ts";

interface ModalSliceType {
    isOpen: boolean;
    modalType: ModalType | "";
    entityType: EntityType | "";
    currentEntityId: string;
}

const initialState: ModalSliceType = {
    isOpen: false,
    modalType: "",
    entityType: "",
    currentEntityId: "",
};


export const ModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openEditor: (state, action: PayloadAction<{entityType: EntityType, entityId: string}>) => {
            state.modalType = ModalType.EDITOR
            state.currentEntityId = action.payload.entityId;
            state.entityType = action.payload.entityType;
            state.isOpen = true;
        },
        closeEditor: (state) => {
            state.currentEntityId = "";
            // state.entityType = "";
            state.modalType = ModalType.LIST;
        },
        toggleItemsList: (state, action: PayloadAction<EntityType>) => {
            if (state.currentEntityId) return;
            const newType = action.payload;
            if (state.entityType !== newType) {
                state.entityType = newType;
                state.modalType = ModalType.LIST;
                state.isOpen = true;
            } else {
                state.entityType = "";
                state.modalType = "";
                state.isOpen = false;
            }
        }
    }
});

export const {toggleItemsList, openEditor, closeEditor} = ModalSlice.actions;