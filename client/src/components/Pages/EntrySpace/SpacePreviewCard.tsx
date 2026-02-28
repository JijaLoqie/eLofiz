import { type FC, useCallback } from "react";
import type { IPreset } from "@/types.ts";
import { createSpace } from "@/slices/SpaceSlice.ts";
import { useDispatch } from "react-redux";
import { useFloatAnimation } from "@/components/hooks/useFloatAnimation.ts";

interface SpacePreviewCardProps {
    card: IPreset
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const SpacePreviewCard: FC<SpacePreviewCardProps> = ({
                                                                card,
                                                                onMouseEnter,
                                                                onMouseLeave,
                                                            }) => {
    const { tags, spaceProps, color } = card;
    const { images, name } = spaceProps;
    const dispatch = useDispatch();
    const floatAnimation = useFloatAnimation();

    const handleClick = useCallback(() => {
        dispatch(createSpace(spaceProps));
    }, [dispatch, spaceProps]);

    return (
        <div
            className={`relative w-[300px] flex flex-row rounded-lg overflow-hidden border border-white/15 backdrop-blur-md transition-all duration-300 cursor-pointer hover:border-white/30 h-16`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={handleClick}
            style={{
                boxShadow: `0 0 20px ${color}33, 0 8px 32px ${color}1a`,
                animation: floatAnimation,
            }}
        >
            <div className="z-20 bg-gradient-to-r from-black via-black/30 via-50% to-transparent flex flex-col gap-1.5 p-4 flex-1 justify-center">
                <span
                    className="text-base font-semibold text-white/60 uppercase tracking-wider transition-colors duration-300 group-hover:text-white/80">
                    {tags[0]}
                </span>
            </div>
            <img
                src={images[0]}
                alt={name}
                className="absolute w-full h-full object-cover"
            />
        </div>
    );
};