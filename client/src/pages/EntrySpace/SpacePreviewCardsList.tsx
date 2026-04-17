import { SpacePreviewCard } from "@/pages/EntrySpace/SpacePreviewCard.tsx";
import { useBackgroundTransition } from "@/pages/EntrySpace/useBackgroundTransition.ts";
import { usePresetStore } from "@/features/preload-session/store";
import { observer } from "mobx-react-lite";

export const SpacePreviewCardsList= observer(() => {
    const { background, opacity, handleSetBackground, clearBackground } = useBackgroundTransition();
    const {items} = usePresetStore();

    return (
        <>
            <div
                className="absolute inset-0 transition-opacity duration-300 z-1023"
                style={{
                    backgroundImage: background ? `url(${background})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    opacity: opacity,
                }}
            ></div>
            <div className="fixed top-0 w-[100%] h-screen p-10 overflow-y-scroll z-1023">
                <div className={`float-end mr-20 flex flex-col gap-16 items-center`}>
                    {items.map((preset, index) => (<SpacePreviewCard
                        key={index}
                        card={preset}
                        onMouseEnter={() => handleSetBackground(preset.spaceProps.images[0])}
                        onMouseLeave={() => clearBackground(preset.spaceProps.images[0])}
                    />))}
                    {items.map((preset, index) => (<SpacePreviewCard
                        key={index}
                        card={preset}
                        onMouseEnter={() => handleSetBackground(preset.spaceProps.images[0])}
                        onMouseLeave={() => clearBackground(preset.spaceProps.images[0])}
                    />))}
                </div>
            </div>
        </>);
});