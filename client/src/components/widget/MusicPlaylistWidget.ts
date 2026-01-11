import { type IEvents, View } from "../../base";
import { cloneTemplate, ensureElement } from "../../utils";
import type { IMusicPlaylistWidget } from "../../types.ts";
import { spaceApi } from "../../modules/core/SpaceApi.ts";

const musicWidgetTemplate = ensureElement<HTMLTemplateElement>("#widget-music-template");

class MusicPlaylistWidget extends View<IMusicPlaylistWidget> {
    _spaceId: string;
    audioNode: HTMLAudioElement;
    private currentTrack: number = 0;
    private isPlaying: boolean = false;
    private playlist: string[] = [
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
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

    private handleButtonClick(event: Event): void {
        const button = event.target as HTMLElement;
        const type = button.getAttribute("data-type");

        this.playBeep();

        switch (type) {
            case "play":
                this.togglePlay();
                break;
            case "previous":
                this.previousTrack();
                break;
            case "next":
                this.nextTrack();
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

    private playBeep(): void {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800; // Frequency in Hz
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    private togglePlay(): void {
        if (this.isPlaying) {
            this.audioNode.pause();
            this.isPlaying = false;
        } else {
            this.audioNode.play();
            this.isPlaying = true;
        }
        this.updateUI();
    }

    private nextTrack(): void {
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.loadTrack();
    }

    private previousTrack(): void {
        this.currentTrack = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack();
    }

    private randomTrack(): void {
        this.currentTrack = Math.floor(Math.random() * this.playlist.length);
        this.loadTrack();
    }

    private loadTrack(): void {
        this.audioNode.src = this.playlist[this.currentTrack];
        this.audioNode.currentTime = 0;
        if (this.isPlaying) {
            this.audioNode.play();
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