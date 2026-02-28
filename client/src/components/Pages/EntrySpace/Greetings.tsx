import { createSpace } from "@/slices/SpaceSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { useMemo } from "react";

export const Greetings = () => {
    const dispatch = useDispatch();
    const presetsRecord = useSelector((state: RootState) => state.presets.items);
    const presets = useMemo(() => Object.values(presetsRecord), [presetsRecord]);


    const {spaceProps: randomSpaceProps} = presets[Math.floor(Math.random()*presets.length)];


    // const handleLogin = () => {
    //     console.log("Login");
    //     // Add your login logic here
    // };

    const handleGuest = () => {
        dispatch(createSpace(randomSpaceProps));
    };


    return (
        <div className="z-12 greetings absolute bottom-14 left-14 gap-6 w-[60%]">
            {/* Greeting Text */}
            <div className="flex flex-col gap-3">
                <h2 className="text-5xl font-light text-gray-200 ">Welcome, stranger</h2>
                <p className="text-gray-400 text-xl leading-relaxed font-light">
                    You've entered the LoFi community. <br/>
                    Explore your secret place and immerse yourself in the vibe. <br/>
                    Choose to enter as a guest or login to access your personal space.
                </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-6 pt-4">
                <div className="button" onClick={handleGuest}>Enter as a Guest</div>
                <div className="button">Log in</div>
            </div>
        </div>)
}