import Widget from "../../components/widget/Widget.ts";
import {Component, type IEvents, View} from "../../base";
import MusicPlaylistWidget from "../../components/widget/MusicPlaylistWidget.ts";
import {uuid} from "../../utils";
import BackgroundWidget from "../../components/widget/BackgroundWidget.ts";
import {type IWidget, WidgetType} from "../../types.ts";
import {app} from "../../app/LofiApp.ts";
import {AudioVisualizerWidget} from "../../components/widget/AudioVisualizerWidget.ts";

const widgetBuilders: Record<WidgetType, (spaceId: string) => Component<IWidget>> = {
    [WidgetType.MUSIC]: (spaceId: string) => new MusicPlaylistWidget(app.events, spaceId),
    [WidgetType.BACKGROUND]: (spaceId: string) => new BackgroundWidget(spaceId),
    [WidgetType.AUDIO_VISUALIZER]: (spaceId: string) => new AudioVisualizerWidget(spaceId),
};

export class WidgetBuilder implements IWidgetBuilder {
    constructor(private readonly events: IEvents) {
    }
    createWidget(spaceId: string, widgetType: WidgetType): Widget {
        const widget = new Widget(this.events);
        widget.id = uuid();
        widget.spaceId = spaceId;

        let widgetContentView = null;

        const createCustomWidget = widgetBuilders[widgetType];
        widget.content = createCustomWidget(spaceId).render();

        return widget;
    }
}

interface IWidgetBuilder {
    createWidget(spaceId: string, widgetType: WidgetType): void;
}