import { useAudioFileUtils } from "@/shared/hooks/useAudioFileUtils.ts";
import { useResolveAudioTracks } from "@/shared/hooks/useResolveAudioTracks.ts";
import { observer } from "mobx-react-lite";
import { use, useCallback } from "react";
import { EditorContext } from "@/features/Modal/EditorProvider.tsx";
import { useStreamStore } from "@/features/preload-session/store";

interface StreamCardProps {
    streamId: string;
}

export const StreamCard: React.FC<StreamCardProps> = observer(({ streamId }) => {
    const editorContext = use(EditorContext);
    const streamStore = useStreamStore();
    const stream = streamStore.getItem(streamId);
    const handleOpenEditor = useCallback(() => {
        if (stream) {
            editorContext?.handleOpen(stream);
        }
    }, [stream]);

    const { formatDuration } =
        useAudioFileUtils();
    const { tracks, totalDuration } = useResolveAudioTracks(
        stream?.audios || [],
    );

    if (!stream) {
        return null;
    }

    return (
        <div
            className="stream-card"
            data-id={stream.id}
            onClick={handleOpenEditor}
            style={{ cursor: "pointer" }}
        >
            <div className="cover-image">
                <div
                    className="disk"
                    style={{
                        backgroundImage: stream.cover
                            ? `url('${stream.cover}')`
                            : "none",
                    }}
                ></div>
            </div>
            <div className="card-content">
                <div className="name">{stream.name}</div>
                <div className="description">
                    {tracks.length === 0 ? (
                        <span>No tracks</span>
                    ) : (
                        <>
                            <div className="tracks-header">
                                <span className="track-count">
                                    {tracks.length === 1
                                        ? "1 track"
                                        : `${tracks.length} tracks`}
                                </span>
                                <span className="total-duration">
                                    {formatDuration(totalDuration)}
                                </span>
                            </div>
                            <div className="tracks-view">
                                {tracks.map((track, index) => (
                                    <div key={index} className="track-item">
                                        <span className="track-name">
                                            {track.name}
                                        </span>
                                        <span className="track-duration">
                                            {formatDuration(track.duration)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
});

export default StreamCard;