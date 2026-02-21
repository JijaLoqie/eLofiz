import { SpacePreviewCard } from "@/components/Pages/EntrySpace/SpacePreviewCard.tsx";
import { useBackgroundTransition } from "@/components/Pages/EntrySpace/useBackgroundTransition.ts";
import { useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { selectPresets } from "@/slices/PresetSlice.ts";

const spacePreviewCards: any[] = [
    {
        title: "eLofiz Studio",
        description: "Explore our creative space and innovative projects",
        type: "Classic",
        image: "images/startBackground.jpeg",
        color: "#9333ea"
    },
    {
        title: "Dead house",
        description: "Explore our creative space and innovative projects",
        type: "Dark Lo-Fi",
        image: "images/back6.png",
        color: "#ff0000"
    },
    {
        title: "Snowy weather",
        description: "Explore our creative space and innovative projects",
        type: "Ambient",
        image: "images/back7.jpeg",
        color: "#ff0000"
    },
    {
        title: "Knights welcome",
        description: "Explore our creative space and innovative projects",
        type: "Knights",
        image: "images/back3.jpg",
        color: "#9333ea"
    },
    {
        title: "Electronic Hip Hop",
        description: "Explore our creative space and innovative projects",
        type: "Electronic Music",
        image: "images/back4.gif",
        color: "#fff000"
    },
    {
        title: "Snowy town",
        description: "Explore our creative space and innovative projects",
        type: "Hip-Hop",
        image: "images/back8.jpeg",
        color: "#fff000"
    },
]

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
                    {Object.values(presets).map((card, index) => (<SpacePreviewCard
                        key={index}
                        card={card}
                        onMouseEnter={() => handleSetBackground(card.spaceProps.images[0])}
                        onMouseLeave={() => clearBackground(card.spaceProps.images[0])}
                    />))}
                </div>
            </div>
        </>);
}