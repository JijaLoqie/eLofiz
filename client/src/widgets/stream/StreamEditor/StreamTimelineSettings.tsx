import { StreamTimeline } from "@/widgets/stream/StreamEditor/StreamTimeline.tsx";
import { type FC, use } from "react";

export const StreamTimelineSettings: FC = () => {
    return (
        <div className="space-y-6">
            {/* Timeline with breakpoints */}
            <div className="stream-editor__timeline-section editor-section">
                <div className="stream-editor__timeline-label">
                    Timeline & Breakpoints
                </div>
                <StreamTimeline />
                <div className="stream-editor__timeline-hint">
                    Left click to add • Right click to remove • Drag to move
                </div>
            </div>
        </div>
    );
};

export default StreamTimelineSettings;