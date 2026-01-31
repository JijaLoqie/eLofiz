import { useStreamData } from "@/components/hooks/useStreamData.ts";
import { useAudioFileUtils } from "@/components/hooks/useAudioFileUtils.ts";
import { useResolveAudioTracks } from "@/components/hooks/useResolveAudioTracks.ts";

interface StreamCardProps {
    streamId: string;
}

export const StreamCard: React.FC<StreamCardProps> = ({ streamId }) => {
    const { stream, handleOpenEditor } = useStreamData(streamId);
    const { isAudioFile, extractFileName, formatDuration } =
        useAudioFileUtils();
    const { tracks, totalDuration } = useResolveAudioTracks(
        stream?.audios || [],
        isAudioFile
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
                                            {extractFileName(track.path)}
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
};

export default StreamCard;