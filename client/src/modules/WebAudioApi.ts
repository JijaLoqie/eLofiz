export class WebAudioApi {
    audioContext: AudioContext;
    private mediaElementSources: Map<string, MediaElementAudioSourceNode> = new Map();
    private gainNodes: Map<string, GainNode> = new Map();
    private analysers: Map<string, AnalyserNode> = new Map();

    constructor() {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    // Get a specific analyser
    getAnalyser(spaceId: string): AnalyserNode {
        const result = this.analysers.get(spaceId);
        if (!result) {
            throw new Error(`No analyser found for space ${spaceId}`);
        }
        return result;
    }
}

export const webAudioApi = new WebAudioApi();