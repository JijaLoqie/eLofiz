import { type RefObject, useEffect, useState } from 'react';

interface UseSpaceNodeReturn {
    backgroundNode: HTMLElement | null;
    audioNode: HTMLAudioElement | null;
}

export const useSpaceNode = (ref: RefObject<HTMLDivElement>): UseSpaceNodeReturn => {
    const [backgroundNode, setBackgroundNode] = useState<HTMLElement | null>(null);
    const [audioNode, setAudioNode] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        // Find the nearest .space parent from the ref element
        const space = ref.current.closest('.space') as HTMLElement | null;
        setBackgroundNode(space);

        // Find audio element within the space
        if (space) {
            const audio = space.querySelector('audio') as HTMLAudioElement | null;
            setAudioNode(audio);
        } else {
            setAudioNode(null);
        }
    }, [ref]);

    return { backgroundNode, audioNode };
};