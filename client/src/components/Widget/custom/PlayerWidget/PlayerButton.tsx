import React, { type FC } from "react";

interface PlayerButtonProps {
    label: string;
    onClick: () => void;
    color: "info" | "navigation" | "controls";
    ariaLabel?: string;
}

const getButtonColorClass = (color: "info" | "navigation" | "controls"): string => {
    const colorMap = {
        info: "text-[#898989] hover:bg-[#898989]",
        navigation: "text-[#1beb9e] hover:bg-[#1beb9e]",
        controls: "text-[#b462ff] hover:bg-[#b462ff]",
    };
    return colorMap[color];
};

export const PlayerButton: FC<PlayerButtonProps> = ({ label, onClick, color, ariaLabel }) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className={`px-0.5 py-0.5 font-semibold hover:text-black transition-all active:scale-95 cursor-pointer ${getButtonColorClass(color)}`}
    >
        {label}
    </button>
);

export default PlayerButton;