import { useEffect, useState } from "react";
import { uuid } from "../utils";

interface UseFloatAnimationOptions {
    minDuration?: number;
    maxDuration?: number;
    minDelay?: number;
    maxDelay?: number;
    minOffset?: number;
    maxOffset?: number;
}

const getRandomOffset = (min: number, max: number): number => {
    const offset = min + Math.random() * (max - min);
    const sign = Math.random() > 0.5 ? 1 : -1;
    return offset * sign;
};

export const useFloatAnimation = ({
                                      minDuration = 6,
                                      maxDuration = 10,
                                      minDelay = 0,
                                      maxDelay = 2,
                                      minOffset = 10,
                                      maxOffset = 20,
                                  }: UseFloatAnimationOptions = {}) => {
    const [floatAnimation, setFloatAnimation] = useState<string>("");

    useEffect(() => {
        // Generate random animation values
        const randomDuration = minDuration + Math.random() * (maxDuration - minDuration);
        const randomDelay = minDelay + Math.random() * (maxDelay - minDelay);
        const randomOffset1 = getRandomOffset(minOffset, maxOffset);
        const randomOffset2 = getRandomOffset(minOffset, maxOffset);

        const animationName = `float-${uuid()}`;

        const keyframes = `
        @keyframes ${animationName} {
            0%, 100% {
                transform: translate(0px, 0px);
            }
            50% {
                transform: translate(${randomOffset1}px, ${randomOffset2}px);
            }
        }
    `;

        // Inject the keyframes into the document
        const style = document.createElement("style");
        style.textContent = keyframes;
        document.head.appendChild(style);

        setFloatAnimation(`${animationName} ${randomDuration}s ease-in-out infinite ${randomDelay}s`);

        return () => {
            style.remove();
        };
    }, [minDuration, maxDuration, minDelay, maxDelay, minOffset, maxOffset]);

    return floatAnimation;
};