import { type IEvents, View } from "../../base";
import { cloneTemplate, ensureElement } from "../../utils";
import type { IMusicPlaylistWidget } from "../../types.ts";
import { spaceApi } from "../../modules/core/SpaceApi.ts";

const musicWidgetTemplate = ensureElement<HTMLTemplateElement>("#widget-music-template");

class MusicPlaylistWidget extends View<IMusicPlaylistWidget> {
    _spaceId: string;
    audioNode: HTMLAudioElement;

    constructor(events: IEvents, spaceId: string) {
        super(cloneTemplate(musicWidgetTemplate), events);
        this._spaceId = spaceId;
        this.audioNode = spaceApi.getMusicNode(this._spaceId);
    }
}

export default MusicPlaylistWidget;