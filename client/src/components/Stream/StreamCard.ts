import { EntityType, type IStream } from "@/types.ts";
import { type IEvents, View } from "@/base";
import { cloneTemplate, ensureElement } from "@/utils";
import { getAudioDuration } from "@/modules/StreamEditor";
import { selectStream } from "@/slices/StreamSlice.ts";
import { appStore } from "@/app/appStore.ts";
import { openEditor } from "@/slices/ModalSlice.ts";

const template = ensureElement<HTMLTemplateElement>("#stream-card-template");


export class StreamCard extends View<IStream> {
    private tracks: Array<{ path: string; duration: number }> = [];
    private totalDuration: number = 0;
    private description: HTMLElement;

    constructor(events: IEvents) {
        super(cloneTemplate(template), events);
        this.description = ensureElement(".description", this.container);
        this.container.addEventListener("click", () => {
            appStore.dispatch(openEditor(
                {
                    entityType: EntityType.STREAMS,
                    entityId: this.container.getAttribute("data-id") || ""
                }
            ));
        });
    }

    set id(value: string) {
        this.container.setAttribute("data-id", value);
    }

    set name(value: string) {
        this.setText(ensureElement(".name", this.container), value);
    }

    set cover(value: string) {
        ensureElement(".disk", this.container).style.backgroundImage = `url('${value}')`;
    }

    set audios(value: string[]) {
        this.loadAndRenderTracks(value);
    }

    set breakpoints(value: number[]) {
        this.container.setAttribute("data-breakpoints", value.join(","));
    }

    private async loadAndRenderTracks(audioPaths: string[]) {
        try {
            this.tracks = await this.resolveAudioTracks(audioPaths);
            this.calculateTotalDuration();
            this.renderTracks();
        } catch (error) {
            console.error("Error loading tracks:", error);
        }
    }

    private async resolveAudioTracks(audioPaths: string[], visited: Set<string> = new Set()): Promise<Array<{
        path: string;
        duration: number
    }>> {
        const tracks: Array<{ path: string; duration: number }> = [];

        for (const audioPath of audioPaths) {
            if (visited.has(audioPath)) continue;
            visited.add(audioPath);

            if (this.isAudioFile(audioPath)) {
                tracks.push({
                    path: audioPath,
                    duration: await getAudioDuration(audioPath)
                });
            } else {
                const streamInfo = selectStream(appStore.getState(), audioPath)
                if (streamInfo?.audios) {
                    tracks.push(...await this.resolveAudioTracks(streamInfo.audios, visited));
                }
            }
        }

        return tracks;
    }

    private calculateTotalDuration() {
        this.totalDuration = this.tracks.reduce((sum, track) => sum + track.duration, 0);
    }

    private renderTracks() {
        this.description.innerHTML = "";

        if (this.tracks.length === 0) {
            this.setText(this.description, "No tracks");
            return;
        }

        const header = document.createElement("div");
        header.className = "tracks-header";

        const count = document.createElement("span");
        count.className = "track-count";
        this.setText(count, this.tracks.length === 1 ? "1 track" : `${this.tracks.length} tracks`);

        const duration = document.createElement("span");
        duration.className = "total-duration";
        this.setText(duration, this.formatDuration(this.totalDuration));

        header.append(count, duration);
        this.description.appendChild(header);

        const tracksView = document.createElement("div");
        tracksView.className = "tracks-view";

        this.tracks.forEach(track => {
            const item = document.createElement("div");
            item.className = "track-item";

            const name = document.createElement("span");
            name.className = "track-name";
            this.setText(name, this.extractFileName(track.path));

            const trackDuration = document.createElement("span");
            trackDuration.className = "track-duration";
            this.setText(trackDuration, this.formatDuration(track.duration));

            item.append(name, trackDuration);
            tracksView.appendChild(item);
        });

        this.description.appendChild(tracksView);
    }

    private isAudioFile(path: string): boolean {
        return [".mp3", ".m4a", ".wav", ".ogg", ".flac", ".aac"].some(ext => path.toLowerCase().endsWith(ext));
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