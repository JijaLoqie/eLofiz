import type {IEvents} from "../base";

class CustomMusic {
    private audio: HTMLAudioElement;
    private intersectionVolume: number = 1;
    private baseVolume: number = 1;
    public volume: number = 1;

    constructor() {
        this.audio = new Audio();
    }

    play() {
        this.audio.play().then(r => console.log("Hi"));
    }

    pause() {
        this.audio.pause();
    }

    setVolume(volume: number) {
       this.baseVolume = volume;
       this.fetchVolume();
    }

    setSrc(src: string) {
        const wasPlaying =  !this.audio.paused;
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.src = src;
        this.audio.load();
        if (wasPlaying) {
            this.audio.play();
        }
    }

    setGlobalVolume(intersectionRatio: number) {
        this.intersectionVolume = intersectionRatio;
        this.fetchVolume();
    }

    fetchVolume() {
        this.volume = this.baseVolume * this.intersectionVolume;
    }
}

export default CustomMusic;