import Widget from "../../components/widget/Widget.ts";
import { Component, type IEvents, View } from "../../base";
import { WidgetType } from "../../types.ts";
import { app } from "../../app/LofiApp.ts";




export class WidgetBuilder implements IWidgetBuilder {
    constructor(private readonly events: IEvents) {
    }
    createWidget(spaceId: string, widgetType: WidgetType, widgetName: string): Widget {

        const widget = new Widget(this.events);

        const createCustomWidget = app
            .store
            .getWidgets()[widgetName]
            .builder;

        if (createCustomWidget) {
            widget.content = createCustomWidget(spaceId).render();
        }

        return widget;
    }
}

interface IWidgetBuilder {
    createWidget(spaceId: string, widgetType: WidgetType, widgetName: string): void;
}