import { type FC, memo } from "react";
import ParticleSketch from "./ParticleSketch.tsx";
import { Greetings } from "@/pages/EntrySpace/Greetings.tsx";
import { SpacePreviewCardsList } from "@/pages/EntrySpace/SpacePreviewCardsList.tsx";

const MemoizedParticleSketch = memo(ParticleSketch);

export const EntrySpace: FC<{}> = () => {
    return (
        <div className="italic font-bold font-mono relative w-full h-screen overflow-hidden code-grid-bg">
            {/* Accent wrapper for cards */}
            <SpacePreviewCardsList />

            <MemoizedParticleSketch />
            <Greetings />
        </div>
    );
}