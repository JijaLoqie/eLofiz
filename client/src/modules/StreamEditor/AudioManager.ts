import { formatDuration, getAudioDuration, getFileNameFromPath } from "./AudioUtils.ts";

export class AudioManager {
    private audioFiles: string[] = [];
    private audioDurations: Map<string, number> = new Map();
    private audioListElement: HTMLElement | null = null;

    constructor(
        private onAudioChange: (audios: string[]) => void,
        private onAudioRemove: (audio: string) => void
    ) {}

    setAudioListElement(element: HTMLElement) {
        this.audioListElement = element;
    }

    setAudioFiles(files: string[]) {
        this.audioFiles = [...files];
        this.loadDurationsForFiles(files);
    }

    addAudioFile(filePath: string) {
        if (!this.audioFiles.includes(filePath)) {
            this.audioFiles.push(filePath);
            this.loadAudioDuration(filePath);
            this.onAudioChange(this.audioFiles);
        }
    }

    removeAudioFile(filePath: string) {
        const index = this.audioFiles.indexOf(filePath);
        if (index !== -1) {
            this.audioFiles.splice(index, 1);
            this.audioDurations.delete(filePath);
            this.onAudioRemove(filePath);
            this.onAudioChange(this.audioFiles);
            this.render();
        }
    }

    private async loadDurationsForFiles(files: string[]) {
        for (const file of files) {
            if (!this.audioDurations.has(file)) {
                await this.loadAudioDuration(file);
            }
        }
        this.render();
    }

    private async loadAudioDuration(filePath: string) {
        try {
            const duration = await getAudioDuration(filePath);
            this.audioDurations.set(filePath, duration);
            this.render();
        } catch (error) {
            console.warn(`Failed to load duration for ${filePath}:`, error);
            this.audioDurations.set(filePath, 10000); // Fallback
            this.render();
        }
    }

    getTotalDuration(): number {
        let total = 0;
        this.audioFiles.forEach((audio) => {
            total += this.audioDurations.get(audio) || 0;
        });
        return total;
    }

    private render() {
        if (!this.audioListElement) return;

        this.audioListElement.innerHTML = "";

        if (this.audioFiles.length === 0) {
            const emptyMessage = document.createElement("div");
            emptyMessage.style.color = "rgba(255, 255, 255, 0.5)";
            emptyMessage.style.textAlign = "center";
            emptyMessage.style.padding = "1rem";
            emptyMessage.textContent = "No audio files added yet";
            this.audioListElement.appendChild(emptyMessage);
            return;
        }

        this.audioFiles.forEach((audio) => {
            const itemEl = document.createElement("div");
            itemEl.className = "stream-card-part";

            const fileName = getFileNameFromPath(audio);
            const duration = this.audioDurations.get(audio) || 0;
            const formattedDuration = formatDuration(duration);

            const nameEl = document.createElement("span");
            nameEl.className = "stream-editor__audio-item-name";
            nameEl.textContent = fileName;
            nameEl.title = fileName; // Show full name on hover

            const durationEl = document.createElement("span");
            durationEl.className = "stream-editor__audio-item-duration";
            durationEl.textContent = formattedDuration;

            const removeBtn = document.createElement("button");
            removeBtn.className = "button stream-editor__audio-item-remove";
            removeBtn.textContent = "X";
            removeBtn.addEventListener("click", () => this.removeAudioFile(audio));

            itemEl.appendChild(nameEl);
            itemEl.appendChild(durationEl);
            itemEl.appendChild(removeBtn);
            this.audioListElement!.appendChild(itemEl);
        });
    }
}