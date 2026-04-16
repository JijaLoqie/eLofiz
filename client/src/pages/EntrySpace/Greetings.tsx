import { useState } from "react";

export const Greetings = () => {
    const [guestMode, setGuestMode] = useState(false);


    const handleLogin = () => {
        alert("This feature is not yet implemented");
    };

    const handleGuest = () => {
        setGuestMode(true);
    };


    return (<>
        {guestMode ? (
            <div onClick={() => setGuestMode(false)}
                className="absolute inset-0 bg-black z-1020 pointer-events-none"/>
        ) : (
            <div className="z-1023 greetings absolute bottom-14 left-14 gap-6 w-[60%]">
                {/* Greeting Text */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-5xl font-light text-gray-200">Welcome, stranger</h2>
                    <p className="text-gray-400 text-xl leading-relaxed font-light">
                        You've entered the LoFi community. <br/>
                        Explore your secret place and immerse yourself in the vibe. <br/>
                        Choose to enter as a guest or login to access your personal space.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-6 pt-4">
                    <div className="button" onClick={handleGuest}>Enter as a Guest</div>
                    <div className="button" onClick={handleLogin}>Log in</div>
                </div>
            </div>
        )}

    </>)
}