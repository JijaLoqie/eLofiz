import {type IEvents, View} from "../../base";
import {cloneTemplate, ensureElement} from "../../utils";
import {album_cover, song_artist, song_title, song_url} from "../../globals.ts";
import type {ChangeIntersectionAction} from "../../actions.ts";
import {spaceApi} from "../../modules/core/SpaceApi.ts";

const musicWidgetTemplate = ensureElement<HTMLTemplateElement>("#widget-music-template");

interface IMusicPlaylistWidget {
    currentMusicIndex: number;
    musicUrl: string;
    position: number;
    playing: boolean;
    volume: number;
    cover: string;
    songTitle: string;
    artist: string;
}

class MusicPlaylistWidget extends View<IMusicPlaylistWidget> {
    private model;

    _spaceId: string = "main";

    // DOM elements
    private playBtn: HTMLButtonElement;
    private prevBtn: HTMLButtonElement;
    private nextBtn: HTMLButtonElement;
    private progressBar: HTMLInputElement;
    private volumeSlider: HTMLInputElement;
    private coverImg: HTMLImageElement;
    private songTitleEl: HTMLElement;
    private songArtistEl: HTMLElement;
    private currentTimeEl: HTMLElement;
    private durationEl: HTMLElement;

    constructor(events: IEvents, spaceId: string) {
        super(cloneTemplate(musicWidgetTemplate), events);
        this._spaceId = spaceId;
        this.model = {
            audio: spaceApi.getMusicNode(this._spaceId),
            volume: 0.5,
            intersectionVolume: 1,
            currentMusicIndex: 0,
        }
        this.container.addEventListener("pointerdown", (e) => {
            e.stopPropagation();
        })

        // Initialize DOM elements
        this.playBtn = ensureElement<HTMLButtonElement>("#play-btn", this.container);
        this.prevBtn = ensureElement<HTMLButtonElement>("#prev-btn", this.container);
        this.nextBtn = ensureElement<HTMLButtonElement>("#next-btn", this.container);
        this.progressBar = ensureElement<HTMLInputElement>("#progress-bar", this.container);
        this.volumeSlider = ensureElement<HTMLInputElement>("#volume-slider", this.container);
        this.coverImg = ensureElement<HTMLImageElement>("#album-cover", this.container);
        this.songTitleEl = ensureElement<HTMLElement>("#song-title", this.container);
        this.songArtistEl = ensureElement<HTMLElement>("#song-artist", this.container);
        this.currentTimeEl = ensureElement<HTMLElement>("#current-time", this.container);
        this.durationEl = ensureElement<HTMLElement>("#duration", this.container);

        // Setup button event listeners
        this.setupButtonListeners();
        this.setupAudioUpdateListeners();

        events.on("next-music", () => {
            this.currentMusicIndex = this.model.currentMusicIndex + 1;
        });
        events.on("prev-music", () => {
            this.currentMusicIndex = this.model.currentMusicIndex - 1;
        });
        events.on("pause-music", () => {
            this.playing = false;
        });

        events.on("play-music", () => {
            this.playing = true;
        });

        events.on("set-position", (data: {position: number}) => {
            this.position = data.position;
        });

        events.on<ChangeIntersectionAction>("change-intersection", (data) => {
            this.fetchVolume();
        });

        this.model.audio.addEventListener("ended", () => {
            this.currentMusicIndex = this.model.currentMusicIndex + 1;
        })

        this.currentMusicIndex = 0;
    }

    private setupButtonListeners(): void {
        // Play/Pause button
        this.playBtn.addEventListener('click', () => {
            const playIcon = this.playBtn.querySelector('.play-icon') as HTMLElement;
            const pauseIcon = this.playBtn.querySelector('.pause-icon') as HTMLElement;

            if (playIcon.style.display !== 'none') {
                this.events.emit('play-music');
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
            } else {
                this.events.emit('pause-music');
                playIcon.style.display = 'inline';
                pauseIcon.style.display = 'none';
            }
        });

        // Previous button
        this.prevBtn.addEventListener('click', () => {
            this.events.emit('prev-music');
        });

        // Next button
        this.nextBtn.addEventListener('click', () => {
            this.events.emit('next-music');
        });

        // Volume slider
        this.volumeSlider.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            console.log(this.model.audio.volume);
            this.model.volume = parseFloat(target.value) / 100;
            this.fetchVolume();
        });

        // Progress bar
        this.progressBar.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const duration = this.model.audio.duration || 0;
            const position = (parseFloat(target.value) / 100) * duration;
            this.events.emit('set-position', { position });
        });
    }

    fetchVolume(): void {
        this.model.audio.volume = this.model.volume * this.model.intersectionVolume;
        console.log(`FINAL MUSIC is ${this.model.audio.volume}`);
    }

    private setupAudioUpdateListeners(): void {
        // Update progress bar and time as audio plays
        this.model.audio.addEventListener('timeupdate', () => {
            console.log("TIME SHOULD UPDATE")
            const percent = this.model.audio.duration
                ? (this.model.audio.currentTime / this.model.audio.duration) * 100
                : 0;
            this.progressBar.value = percent.toString();

            this.currentTimeEl.textContent = this.formatTime(this.model.audio.currentTime);
            this.durationEl.textContent = this.formatTime(this.model.audio.duration);
        });

        // Update duration when metadata loads
        this.model.audio.addEventListener('loadedmetadata', () => {
            this.durationEl.textContent = this.formatTime(this.model.audio.duration);
            this.progressBar.max = '100';
        });
    }

    private formatTime(seconds: number): string {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    set currentMusicIndex(currentMusicIndex: number) {
        if (currentMusicIndex < 0) currentMusicIndex = song_url.length - 1;
        if (currentMusicIndex >= song_url.length) currentMusicIndex = 0;

        this.model.currentMusicIndex = currentMusicIndex;
        this.setNewMusic(currentMusicIndex);
    }

    set position(position: number) {
        this.model.audio.currentTime = position;
        this.progressBar.value = position.toString();
        this.currentTimeEl.textContent = this.formatTime(position);
    }

    set playing(playing: boolean) {
        this.model.audio[playing ? "play" : "pause"]();
    }

    set volume(volume: number) {
        this.model.audio.volume = volume;
    }

    set cover(cover: string) {
        this.coverImg.src = cover;
    }

    set artist(artist: string) {
        this.songArtistEl.textContent = artist;
    }

    set songTitle(songTitle: string) {
        this.songTitleEl.textContent = songTitle;
    }

    private setNewMusic(currentMusicIndex: number) {
        const newMusic = song_url[currentMusicIndex];
        const newArtist = song_artist[currentMusicIndex];
        const newCover = album_cover[currentMusicIndex];
        const newSongTitle = song_title[currentMusicIndex];


        // Pause current playback
        const wasPlaying = !this.model.audio.paused;
        this.playing = false;

        // Update UI
        this.cover = newCover;
        this.artist = newArtist;
        this.songTitle = newSongTitle;

        // Reset position and progress bar
        this.model.audio.currentTime = 0;

        this.position = 0;
        this.model.audio.src = newMusic;
        this.model.audio.load();

        this.playing = wasPlaying;
    }
}

export default MusicPlaylistWidget;