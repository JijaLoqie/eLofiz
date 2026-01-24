import { type IEvents, View } from "../../base";
import { cloneTemplate, ensureElement } from "../../utils";
import type { IMusicPlaylistWidget } from "../../types.ts";
import { spaceApi } from "../../modules/core/SpaceApi.ts";
import {webAudioApi} from "../../modules/WebAudioApi.ts";

const musicWidgetTemplate = ensureElement<HTMLTemplateElement>("#widget-music-template");

class MusicPlaylistWidget extends View<IMusicPlaylistWidget> {
    _spaceId: string;
    audioNode: HTMLAudioElement;
    private currentTrack: number = 0;
    private isPlaying: boolean = false;
    private playlist: string[] = [
        "/audio/song1.mp3",
        "/audio/song2.mp3",
        "/audio/knight.m4a",
        "/audio/dark.m4a",
        "/audio/ambient.m4a",
        "/audio/phonk.m4a",
    ];

    constructor(events: IEvents, spaceId: string) {
        super(cloneTemplate(musicWidgetTemplate), events);
        this._spaceId = spaceId;
        this.audioNode = spaceApi.getMusicNode(this._spaceId);
        this.setupAudio();
        this.attachEventListeners();
        this.updateUI();
    }

    private setupAudio(): void {
        this.audioNode.src = this.playlist[this.currentTrack];
        this.audioNode.volume = 1;
        this.audioNode.addEventListener("timeupdate", () => this.updateProgress());
        this.audioNode.addEventListener("ended", () => this.nextTrack());
    }

    private attachEventListeners(): void {
        const buttons = this.container.querySelectorAll("[data-type]");
        buttons.forEach((button) => {
            button.addEventListener("click", (e) => this.handleButtonClick(e));
        });
    }

    private async handleButtonClick(event: Event): Promise<void> {
        await webAudioApi.playBeep();
        const button = event.target as HTMLElement;
        const type = button.getAttribute("data-type");


        switch (type) {
            case "play":
                await this.togglePlay();
                break;
            case "previous":
                await this.previousTrack();
                break;
            case "next":
                await this.nextTrack();
                break;
            case "back":
                this.skipBackward();
                break;
            case "forward":
                this.skipForward();
                break;
            case "volume-decrease":
                this.decreaseVolume();
                break;
            case "volume-increase":
                this.increaseVolume();
                break;
            case "random":
                this.randomTrack();
                break;
            case "playlist":
                this.togglePlaylist();
                break;
        }
    }
    private async togglePlay(): Promise<void> {
        if (this.isPlaying) {
            this.audioNode.pause();
            this.isPlaying = false;
        } else {
            await this.audioNode.play();
            this.isPlaying = true;
        }
        this.updateUI();
    }

    private async nextTrack(): Promise<void> {
        if (this.currentTrack + 1 === this.playlist.length) return;
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        if (this.currentTrack + 1 === this.playlist.length) {
            // disable button next
            const button = ensureElement<HTMLButtonElement>(
                "[data-type='next']",
                this.container
            )
            this.setDisabled(button, true);
        } else if (this.currentTrack > 0) {
            const button = ensureElement<HTMLButtonElement>(
                "[data-type='previous']",
                this.container
            )
            this.setDisabled(button, false);
        }
        await this.loadTrack();
    }

    private async previousTrack(): Promise<void> {
        this.currentTrack = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length;
        if (this.currentTrack === 0) {
            // disable button prev
            const button = ensureElement<HTMLButtonElement>(
                "[data-type='previous']",
                this.container
            )
            this.setDisabled(button, true);
        } else if (this.currentTrack + 1 < this.playlist.length) {
            const button = ensureElement<HTMLButtonElement>(
                "[data-type='next']",
                this.container
            )
            this.setDisabled(button, false);
        }
        await this.loadTrack();
    }

    private async randomTrack(): Promise<void> {
        this.currentTrack = Math.floor(Math.random() * this.playlist.length);
        await this.loadTrack();
    }

    private async loadTrack(): Promise<void> {
        this.audioNode.src = this.playlist[this.currentTrack];
        this.audioNode.currentTime = 0;
        if (this.isPlaying) {
            await this.audioNode.play();
        }
        this.updateUI();
    }

    private skipForward(): void {
        this.audioNode.currentTime = Math.min(
            this.audioNode.currentTime + 30,
            this.audioNode.duration
        );
    }

    private skipBackward(): void {
        this.audioNode.currentTime = Math.max(this.audioNode.currentTime - 30, 0);
    }

    private increaseVolume(): void {
        this.audioNode.volume = Math.min(this.audioNode.volume + 0.05, 1);
        this.updateUI();
    }

    private decreaseVolume(): void {
        this.audioNode.volume = Math.max(this.audioNode.volume - 0.05, 0);
        this.updateUI();
    }

    private togglePlaylist(): void {
        // Placeholder for playlist toggle functionality
        console.log("Playlist toggled");
    }

    private updateProgress(): void {
        const progress = this.container.querySelector(".progress") as HTMLElement;
        if (progress) {
            progress.textContent = this.formatTime(this.audioNode.currentTime);
        }
    }

    private updateUI(): void {
        const titleElement = this.container.querySelector(".title") as HTMLElement;
        const playButton = this.container.querySelector('[data-type="play"]') as HTMLElement;
        const volumeElement = this.container.querySelector(".volume") as HTMLElement;

        if (titleElement) {
            titleElement.textContent = `Track ${this.currentTrack + 1} of ${this.playlist.length}`;
        }

        if (playButton) {
            playButton.textContent = this.isPlaying ? "[stop]" : "[play]";
            playButton.classList.toggle("playing", this.isPlaying);
        }

        if (volumeElement) {
            volumeElement.textContent = `${Math.round(this.audioNode.volume * 100)} %`;
        }

        this.updateProgress();
    }

    private formatTime(seconds: number): string {
        if (!isFinite(seconds)) seconds = 0;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
}

export default MusicPlaylistWidget;