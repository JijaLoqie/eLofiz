import Widget from "../../components/widget/Widget.ts";
import type {IEvents} from "../../base";
import MusicPlaylistWidget from "../../components/widget/MusicPlaylistWidget.ts";
import {uuid} from "../../utils";
import BackgroundWidget from "../../components/widget/BackgroundWidget.ts";

export class WidgetBuilder implements IWidgetBuilder {
    constructor(private readonly events: IEvents) {
    }
    createWidget(spaceId: string, widgetType: "MUSIC" | "BACKGROUND"): Widget {
        const widget = new Widget(this.events);
        widget.id = uuid();
        widget.spaceId = spaceId;

        let widgetContentView = null;

        if (widgetType === "MUSIC") {
            widgetContentView = new MusicPlaylistWidget(this.events, spaceId);
            widget.content = widgetContentView.render();
        } else {
            widgetContentView = new BackgroundWidget(spaceId);
            widget.content = widgetContentView.render();
        }

        return widget;
    }
}

interface IWidgetBuilder {
    createWidget(spaceId: string, widgetType: "MUSIC" | "BACKGROUND"): void;
}