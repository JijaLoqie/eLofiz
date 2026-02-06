import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface AudioSliceState {
}

const initialState: AudioSliceState = {
}



export const AudioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        registerAudio: (state, action: PayloadAction<{spaceId: string}>) => {}
    }
})