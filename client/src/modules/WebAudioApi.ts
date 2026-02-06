export class WebAudioApi {
    audioContext: AudioContext;
    private mediaElementSources: Map<string, MediaElementAudioSourceNode> = new Map();
    private gainNodes: Map<string, GainNode> = new Map();
    private analysers: Map<string, AnalyserNode> = new Map();

    constructor() {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    private getOscillator(): { oscillator: OscillatorNode; gainNode: GainNode } {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.frequency.value = 800;
        oscillator.type = "sine";

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        return { oscillator, gainNode };
    }

    async playBeep(): Promise<void> {
        const { oscillator, gainNode } = this.getOscillator();
        const now = this.audioContext.currentTime;

        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
    }

    // Register a new media element source with analyser setup
    registerMediaElement(
        spaceId: string,
        audioElement: HTMLAudioElement,
        fftSize: number = 256
    ): MediaElementAudioSourceNode {
        // Check if already registered
        if (this.mediaElementSources.has(spaceId)) {
            return this.mediaElementSources.get(spaceId)!;
        }

        // Create new source
        const mediaElementSource = this.audioContext.createMediaElementSource(audioElement);
        const gainNode = this.audioContext.createGain();
        const analyser = this.audioContext.createAnalyser();
        analyser.fftSize = fftSize;

        // Connect audio graph: source -> gainNode -> analyser -> destination
        mediaElementSource.connect(gainNode);
        gainNode.connect(analyser);
        analyser.connect(this.audioContext.destination);

        // Store in maps
        this.mediaElementSources.set(spaceId, mediaElementSource);
        this.gainNodes.set(spaceId, gainNode);
        this.analysers.set(spaceId, analyser);

        return mediaElementSource;
    }


    // Get a specific analyser
    getAnalyser(spaceId: string): AnalyserNode {
        const result = this.analysers.get(spaceId);
        if (!result) {
            throw new Error(`No analyser found for space ${spaceId}`);
        }
        return result;
    }

    setVolume(spaceId: string, intersectionRatio: number) {
        const gainNode = this.gainNodes.get(spaceId);
        if (gainNode) {
            gainNode.gain.setValueAtTime(intersectionRatio, this.audioContext.currentTime);
        }
    }
}

export const webAudioApi = new WebAudioApi();