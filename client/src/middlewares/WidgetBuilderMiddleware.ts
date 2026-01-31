import {Middleware} from "../base/Middleware.ts";
import type {IEvents} from "../base";
import {AppData} from "../app/appData.ts";
import {WidgetBuilder} from "../modules/core/WidgetBuilder.ts";
import type {AddWidgetAction, ChangeSpaceAction} from "../actions.ts";
import {ensureElement} from "../utils";
import type {WidgetType} from "../types.ts";

export class WidgetBuilderMiddleware extends Middleware {
    private readonly widgetBuilder;
    private currentId;

    constructor(events: IEvents, store: AppData) {
        super(events, store);
        this.widgetBuilder = new WidgetBuilder(events);
        this.currentId = "main";
    }

    register(): void {
        this.events.on<AddWidgetAction>("add-Widget", (data) => {
            const { widgetType, widgetName } = data;
            const widget = this.widgetBuilder
                .createWidget(this.currentId, widgetType, widgetName);
            ensureElement(`#${this.currentId}`).appendChild(widget.render());
        })

        this.events.on<ChangeSpaceAction>("change-space", (data: { spaceId: string }) => {
            this.currentId = data.spaceId;
        })
    }
}