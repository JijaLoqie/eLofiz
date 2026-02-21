import { createAction } from "@reduxjs/toolkit";


export const registerAudio = createAction<{
    spaceId: string,
}>("registerAudio");

export const playBeep = createAction("playBeep");