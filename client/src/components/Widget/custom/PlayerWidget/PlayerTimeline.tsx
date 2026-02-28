import React, { type FC, useCallback } from "react";

interface PlayerTimelineProps {
    currentTime: number;
    duration: number;
    breakpoints?: number[];
    onBreakpointClick?: (time: number) => void;
}

export const PlayerTimeline: FC<PlayerTimelineProps> = ({
                                                            currentTime,
                                                            duration,
                                                            breakpoints = [],
                                                            onBreakpointClick
                                                        }) => {
    const progressPercent = duration > 0 ? (currentTime / (duration / 1000)) * 100 : 0;

    const getBreakpointPercent = (breakpointMs: number): number => {
        return duration > 0 ? (breakpointMs / duration) * 100 : 0;
    };

    const handleBreakpointClick = useCallback((breakpointMs: number) => {
        onBreakpointClick?.(breakpointMs / 1000);
    }, [onBreakpointClick]);

    return (
        <div className="px-4 py-3 border-t border-[#b462ff]/20">
            <div className="relative h-1 bg-[#1a1a1a] border border-dashed border-[#b462ff]/40 rounded-full overflow-hidden">
                {/* Breakpoints */}
                {breakpoints.map((breakpoint, idx) => {
                    const breakpointPercent = getBreakpointPercent(breakpoint);
                    return (
                        <div
                            key={`breakpoint-${idx}`}
                            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1beb9e] rounded-full"
                            style={{
                                left: `${breakpointPercent}%`,
                                transform: "translate(-50%, -50%)"
                            }}
                        />
                    );
                })}

                {/* Progress Fill */}
                <div
                    className="absolute h-full bg-gradient-to-r from-[#b462ff]/60 to-[#b462ff] transition-all duration-100"
                    style={{ width: `${progressPercent}%` }}
                />

                {/* Progress Dot */}
                {progressPercent > 0 && (
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#b462ff] rounded-full shadow-lg shadow-[#b462ff]/50"
                        style={{ left: `${progressPercent}%`, transform: "translate(-50%, -50%)" }}
                    />
                )}
            </div>
        </div>
    );
};

export default PlayerTimeline;