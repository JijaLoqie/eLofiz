import { SpacePreviewCard } from "@/components/Pages/EntrySpace/SpacePreviewCard.tsx";
import { useBackgroundTransition } from "@/components/Pages/EntrySpace/useBackgroundTransition.ts";
import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { selectPresets } from "@/slices/PresetSlice.ts";

export const SpacePreviewCardsList= () => {
    const { background, opacity, handleSetBackground, clearBackground } = useBackgroundTransition();
    const presets = useSelector((state: RootState) => selectPresets(state));

    return (<>
            <div
                className="absolute inset-0 z-0 transition-opacity duration-300"
                style={{
                    backgroundImage: background ? `url(${background})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    opacity: opacity,
                }}
            ></div>
            <div className="fixed top-0 w-[100%] h-screen p-10 overflow-y-scroll z-11">
                <div className={`float-end mr-20 flex flex-col gap-16 items-center`}>
                    {Object.values(presets).map((preset, index) => (<SpacePreviewCard
                        key={index}
                        card={preset}
                        onMouseEnter={() => handleSetBackground(preset.spaceProps.images[0])}
                        onMouseLeave={() => clearBackground(preset.spaceProps.images[0])}
                    />))}
                </div>
            </div>
        </>);
}