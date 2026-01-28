import { type IEvents, View } from "../../base";
import { cloneTemplate, ensureElement } from "../../utils";
import type { IStream } from "../../types.ts";
import { app } from "../../app/LofiApp.ts";

interface IModalEditWidget {
    open: boolean;
}

const template = ensureElement<HTMLTemplateElement>("#modal-edit-template");

export class ModalEditWidget extends View<IModalEditWidget> {
    private currentStream: IStream | null = null;
    private tracks: Array<{ path: string; duration: number }> = [];

    constructor(events: IEvents) {
        super(cloneTemplate(template), events);
        this.setupCloseButton();
    }

    private setupCloseButton() {
        const closeButton = ensureElement(".modal-close", this.container);
        closeButton.addEventListener("click", () => this.close());
    }

    set open(value: boolean) {
        this.toggleClass(this.container, "active", value);
    }

    async openStream(streamId: string) {
        this.currentStream = app.store.getAudioStats(streamId);

        if (!this.currentStream) {
            console.error(`Stream not found: ${streamId}`);
            return;
        }

        this.renderStreamInfo();
        await this.loadAndRenderTracks();
        this.open = true;
    }

    private close() {
        this.open = false;
    }

    private renderStreamInfo() {
        if (!this.currentStream) return;

        const titleElement = ensureElement(".modal-title", this.container);
        this.setText(titleElement, this.currentStream.name);

        const coverElement = ensureElement(".stream-cover", this.container);
        coverElement.innerHTML = "";
        coverElement.style.backgroundImage = `url('${this.currentStream.cover}.jpg')`;
    }

    private async loadAndRenderTracks() {
        try {
            if (!this.currentStream) return;

            this.tracks = await this.resolveAudioTracks(this.currentStream.audios);
            this.renderTracks();
        } catch (error) {
            console.error("Error loading tracks:", error);
        }
    }

    private async resolveAudioTracks(
        audioPaths: string[],
        visited: Set<string> = new Set()
    ): Promise<Array<{ path: string; duration: number }>> {
        const tracks: Array<{ path: string; duration: number }> = [];

        for (const audioPath of audioPaths) {
            if (visited.has(audioPath)) continue;
            visited.add(audioPath);

            if (this.isAudioFile(audioPath)) {
                tracks.push({ path: audioPath, duration: await this.getAudioDuration(audioPath) });
            } else {
                const audioStats = app.store.getAudioStats(audioPath);
                if (audioStats?.audios) {
                    tracks.push(...await this.resolveAudioTracks(audioStats.audios, visited));
                }
            }
        }

        return tracks;
    }

    private renderTracks() {
        const listElement = ensureElement(".tracks-list", this.container);
        listElement.innerHTML = "";

        if (this.tracks.length === 0) {
            this.setText(listElement, "No tracks");
            return;
        }

        const tracksContainer = document.createElement("div");
        tracksContainer.className = "tracks-container";

        this.tracks.forEach((track, index) => {
            const trackItem = document.createElement("div");
            trackItem.className = "track-item-edit";

            const trackNumber = document.createElement("span");
            trackNumber.className = "track-number";
            this.setText(trackNumber, (index + 1).toString());

            const trackName = document.createElement("span");
            trackName.className = "track-name-edit";
            this.setText(trackName, this.extractFileName(track.path));

            const trackDuration = document.createElement("span");
            trackDuration.className = "track-duration-edit";
            this.setText(trackDuration, this.formatDuration(track.duration));

            trackItem.append(trackNumber, trackName, trackDuration);
            tracksContainer.appendChild(trackItem);
        });

        listElement.appendChild(tracksContainer);
    }

    private isAudioFile(path: string): boolean {
        return [".mp3", ".m4a", ".wav", ".ogg", ".flac", ".aac"].some(ext =>
            path.toLowerCase().endsWith(ext)
        );
    }

    private async getAudioDuration(filePath: string): Promise<number> {
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

    private extractFileName(path: string): string {
        return path.split("/").pop()?.replace(/\.[^/.]+$/, "") || path;
    }

    private formatDuration(ms: number): string {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    }
}