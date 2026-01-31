export function getAudioDuration(filePath: string): Promise<number> {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.src = filePath;

        const cleanup = () => {
            audio.removeEventListener("loadedmetadata", handleMetadata);
            audio.removeEventListener("error", handleError);
        };

        const handleMetadata = () => {
            cleanup();
            resolve(Math.round(audio.duration * 1000));
        };

        const handleError = () => {
            cleanup();
            reject(new Error(`Failed to load audio: ${filePath}`));
        };

        audio.addEventListener("loadedmetadata", handleMetadata);
        audio.addEventListener("error", handleError);
    });
}

export function formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function getFileNameFromPath(filePath: string): string {
    console.log("GETTING FILENAME:", filePath);
    if (filePath) {
        const startIndex = (filePath.indexOf('\\') >= 0 ? filePath.lastIndexOf('\\') : filePath.lastIndexOf('/'));
        let filename = filePath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            return filename.substring(1);
        }
        return filePath
    }
    return "unknown"
}