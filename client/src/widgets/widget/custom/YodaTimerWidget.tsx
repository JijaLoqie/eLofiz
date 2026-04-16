import { type FC, useEffect, useEffectEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { playBeep } from "@/shared/actions.ts";

interface YodaTimerWidgetProps {
    spaceId: string;
}

const defaultTime = 60 * 5;

export const YodaTimerWidget: FC<YodaTimerWidgetProps> = () => {
    const dispatch = useDispatch();
    const [hover, setHover] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(defaultTime);
    const [ringing, setRinging] = useState(false);

    useEffect(() => {
        if (!isPlaying) return;
        const id = setInterval(() => {
            setTimeLeft(old => old - 1)
        }, 1000);
        return () => {
            clearInterval(id);
        }
    }, [isPlaying]);

    useEffect(() => {
        if (timeLeft <= 0 && isPlaying) {
            setRinging(true);
        } else {
            setRinging(false);
        }
    }, [timeLeft, isPlaying]);

    useEffect(() => {
        if (!ringing) return;
        const id = setInterval(() => {
            dispatch(playBeep());
        }, 500);
        return () => {
            clearInterval(id);
        }
    }, [ringing, dispatch])


    const handleReset = useEffectEvent(() => {
        setIsPlaying(false);
        setTimeLeft(defaultTime);
    });

    return (<div onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} className={`
        w-[330px] h-[330px] 
        bg-transparent 
        transition-all
        rounded-2xl
        flex justify-center
        items-center
        text-center
        ${!isPlaying ? "hover:bg-black/40" : ""}
        flex-col
        text-white
        overflow-hidden
        `}
    >
        <div className={`
        backdrop-blur-sm
            w-[80%] aspect-square
            flex justify-center
            flex-col
            rounded-full
            border-4 
            text-6xl
            text-amber
            border-peacock
            border-dotted
            outline-8
            outline-midnight
            animate-spin
            [animation-duration:60s]
            after:content-[''] after:absolute after:top-[-7px] after:left-1/2 after:w-2.5 after:h-2.5 ${isPlaying ? "after:bg-red-400" : "after:bg-white"} after:rounded-full after:shadow-[0_0_15px_#f00] after:-translate-x-1/2
            `}
        >
            <span className={`
            `} style={{
                animation: "no-spin 60s linear infinite",
                textShadow: "0 0 5px var(--color-amber), 0 0 10px var(--color-midnight), 0 0 20px var(--color-midnight)"
            }}>
                {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:{(timeLeft % 60).toString().padStart(2, "0")}
                <p className={`
                text-lg
                    `}
                >
                    Do, or do not. <br/>There is no try
                </p>
                <div className="flex justify-center h-0">
                {hover && (<div
                    onClick={!isPlaying ? () => setIsPlaying(true) : handleReset}
                    className="relative top-[12px] text-[24px] font-semibold text-amber px-2 py-1 my-auto rounded-lg transition-all duration-300 hover:text-white hover:bg-peacock/30 active:scale-95 cursor-pointer hover:shadow-[0_0_15px_rgba(0,255,200,0.3)]"
                >
                    {isPlaying ? "Reset" : "Start"}
                </div>)}
            </div>
            </span>
        </div>
    </div>);


};