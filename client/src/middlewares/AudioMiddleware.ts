import { createAction, type Middleware, type MiddlewareAPI, type UnknownAction } from "@reduxjs/toolkit";
import { playBeep, registerAudio } from "@/actions.ts";
import { ensureElement } from "@/utils";


type AudioItem = {
    mediaElement: MediaElementAudioSourceNode,
    gainNode: GainNode,
    analyzer: AnalyserNode

}

interface AudioSliceState {
    audioContext: AudioContext;
    items: Record<string, AudioItem>
}

const initialState: AudioSliceState = {
    audioContext: new (window.AudioContext || (window as any).webkitAudioContext)(),
    items: {},
}


export const AudioMiddleware: Middleware = (store) => {
    const state = {...initialState}


    return (next) => (action) => {
        if (registerAudio.match(action)) {
            const {spaceId} = action.payload;
            const htmlAudio = ensureElement<HTMLAudioElement>(`#${spaceId} audio`);
            if (state.items[spaceId]) return;

            // Create new source
            const mediaElementSource = state.audioContext.createMediaElementSource(htmlAudio);
            const gainNode = state.audioContext.createGain();
            const analyser = state.audioContext.createAnalyser();
            analyser.fftSize = 256;

            // Connect audio graph: source -> gainNode -> analyser -> destination
            mediaElementSource.connect(gainNode);
            gainNode.connect(analyser);
            analyser.connect(state.audioContext.destination);

            // Store in maps
            state.items[spaceId] = {
                mediaElement: mediaElementSource,
                gainNode: gainNode,
                analyzer: analyser,
            }
        }
        if (setVolume.match(action)) {
            const {spaceId, volume} = action.payload;
            if (!state.items[spaceId]) return;

            const gainNode = state.items[spaceId].gainNode;
            if (gainNode) {
                gainNode.gain.setValueAtTime(volume, state.audioContext.currentTime);
            }
        }
        if (playBeep.match(action)) {
            const oscillator = state.audioContext.createOscillator();
            const gainNode = state.audioContext.createGain();

            oscillator.frequency.value = 800;
            oscillator.type = "sine";

            oscillator.connect(gainNode);
            gainNode.connect(state.audioContext.destination);

            const now = state.audioContext.currentTime;

            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

            oscillator.start(now);
            oscillator.stop(now + 0.1);
        }


        return next(action)
    }
}

export const setVolume = createAction<{spaceId: string, volume: number}>("setVolume")