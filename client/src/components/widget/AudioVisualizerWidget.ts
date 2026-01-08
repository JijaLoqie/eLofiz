import {Component, type IEvents} from "../../base";
import {cloneTemplate} from "../../utils";
import type {IAudioVisualizerWidget} from "../../types.ts";

export class AudioVisualizerWidget extends Component<IAudioVisualizerWidget> {
    constructor(spaceId: string) {
        super(cloneTemplate("#widget-audio-visualizer-template"));
    }
}