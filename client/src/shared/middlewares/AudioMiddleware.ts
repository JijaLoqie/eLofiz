import { createAction, type Middleware } from "@reduxjs/toolkit";
import { playBeep, registerAudio } from "@/shared/actions.ts";
import { ensureElement } from "@/shared/utils";


type AudioItem = {
    mediaElement: MediaElementAudioSourceNode,
    gainNode: GainNode,

}

interface AudioSliceState {
    audioContext: AudioContext;
    items: Record<string, AudioItem>
}

const initialState: AudioSliceState = {
    audioContext: new (window.AudioContext || (window as any).webkitAudioContext)(),
    items: {},
}

export const audioState = {...initialState}

export const AudioMiddleware: Middleware = (store) => {



    return (next) => (action) => {
        if (registerAudio.match(action)) {
            const {spaceId} = action.payload;
            const htmlAudio = ensureElement<HTMLAudioElement>(`#${spaceId} audio`);
            if (audioState.items[spaceId]) return;

            // Create new source
            const mediaElementSource = audioState.audioContext.createMediaElementSource(htmlAudio);
            const gainNode = audioState.audioContext.createGain();

            // Connect audio graph: source -> gainNode -> destination
            mediaElementSource.connect(gainNode);
            gainNode.connect(audioState.audioContext.destination)

            // Store in maps
            audioState.items[spaceId] = {
                mediaElement: mediaElementSource,
                gainNode: gainNode,
            }
        }
        if (setVolume.match(action)) {
            const {spaceId, volume} = action.payload;
            if (!audioState.items[spaceId]) return;

            const gainNode = audioState.items[spaceId].gainNode;
            if (gainNode) {
                gainNode.gain.setValueAtTime(volume, audioState.audioContext.currentTime);
            }
        }
        if (playBeep.match(action)) {
            const oscillator = audioState.audioContext.createOscillator();
            const gainNode = audioState.audioContext.createGain();

            oscillator.frequency.value = 800;
            oscillator.type = "sine";

            oscillator.connect(gainNode);
            gainNode.connect(audioState.audioContext.destination);

            const now = audioState.audioContext.currentTime;

            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

            oscillator.start(now);
            oscillator.stop(now + 0.1);
        }


        return next(action)
    }
}

export const setVolume = createAction<{spaceId: string, volume: number}>("setVolume")