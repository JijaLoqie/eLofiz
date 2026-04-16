import { type FC, useCallback, useEffect, useEffectEvent, useState } from "react";

interface PomodoroTimerWidgetProps {
    spaceId: string;
}

type PomodotoMode = "Session" | "Break";

const defaultSessionTime = 60 //25 * 60;
const defaultBreakTime = 60 //* 60;

export const PomodoroTimerWidget: FC<PomodoroTimerWidgetProps> = ({spaceId}) => {
    const [sessionTime, setSessionTime] = useState(defaultSessionTime);
    const [breakTime, setBreakTime] = useState(defaultBreakTime);
    const [timeLeft, setTimeLeft] = useState(sessionTime);
    const [mode, setMode] = useState<PomodotoMode>("Session");
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleMode = useCallback(() => {
        setTimeLeft(mode === "Session" ? breakTime : sessionTime);
        setMode(mode === "Session" ? "Break" : "Session");
    }, [mode]);

    useEffect(() => {
        if (timeLeft <= 0) {
            toggleMode();
        }
    }, [timeLeft, toggleMode]);

    useEffect(() => {
        if (!isPlaying) return;
        const id = setInterval(() => {
            setTimeLeft(old => old - 1)
        }, 1000);
        return () => {
            clearInterval(id);
        }
    }, [isPlaying]);

    const setDefaultTime = useEffectEvent(() => {
        if (!isPlaying) {
            if (mode === "Session") {
                setTimeLeft(sessionTime);
            } else {
                setTimeLeft(breakTime);
            }
        }
    })
    useEffect(() => {
        setDefaultTime();
    }, [sessionTime, breakTime]);

    const handleStart = useCallback(() => {
        setIsPlaying(true);
    }, []);
    const handleReset = useCallback(() => {
        setTimeLeft(sessionTime);
        setIsPlaying(false);
    }, []);

    return (
        <div className={`
        relative
        w-[300px] h-[400px] bg-lampblack
        flex justify-between items-center flex-col
        text-white
        
        `}>
            <span className={`
            p-4
            `}>
                Pomodoro Clock
            </span>
            <div className={`
            aspect-square w-[60%] rounded-full
            border-[10px] 
            ${!isPlaying ? "border-white" : mode==="Session" ? "border-red-600" : "border-blue-300"} 
            border-double border-t-0 border-b-0

            animate-spin
            [animation-duration:30s]
            flex justify-center items-center
            text-4xl
            after:content-['']
            `}>
                <span style={{
                    animation: "no-spin 30s linear infinite",
                }}>
                {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:{(timeLeft % 60).toString().padStart(2, "0")}
                </span>
            </div>

            <div className={`
            w-full p-1
            flex justify-around
            `}>
                <div className={`flex flex-col text-center w-full ps-10 pe-5`}>
                    <span className={`text-[12px] ${mode === "Session" ? "text-red-600": ""}`}>Session</span>
                    <span>{Math.floor(sessionTime / 60)} min</span>
                    <div className={`w-full flex justify-between`}>
                        <button onClick={() => setSessionTime(old => old + 60)}>[+]</button>
                        <button onClick={() => setSessionTime(old => Math.max(old - 60, 60))}>[-]</button>
                    </div>
                </div>
                <div className={`flex flex-col text-center w-full ps-5 pe-10`}>
                    <span className={`text-[12px] ${mode === "Break" ? "text-blue-300": ""}`}>Break</span>
                    <span>{Math.floor(breakTime / 60)} min</span>
                    <div className={`w-full flex justify-between`}>
                        <button onClick={() => setBreakTime(old => old + 60)}>[+]</button>
                        <button onClick={() => setBreakTime(old => Math.max(old - 60, 60))}>[-]</button>
                    </div>
                </div>
            </div>

            <div className={`
            button
            w-full
            p-4
            justify-center
            `}
                 onClick={!isPlaying ? handleStart : handleReset}
            >{!isPlaying ? "Start" : "Reset"}</div>
        </div>
    );
}