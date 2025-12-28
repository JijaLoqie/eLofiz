import { EventEmitter } from "./base/Events.ts";
import { AppData } from "./appData.ts";
import {cloneTemplate, ensureElement, uuid} from "./utils";
import ModalAddWidget from "./components/Modal/ModalAddWidget.ts";
import type {AddWidgetAction, RemoveWidgetAction} from "./actions.ts";
import Widget from "./components/widget/Widget.ts";
import Space from "./components/Space.ts";
import type {WidgetType} from "./types.ts";
import SpaceManager from "./utils/SpaceManager.ts";

// Шаблоны
const musicTemplate = ensureElement<HTMLTemplateElement>("#widget-music-template");
const backgroundTemplate = ensureElement<HTMLTemplateElement>("#widget-background-template");

const widgetTemplates: Record<WidgetType, HTMLTemplateElement> =
    {
        MUSIC: musicTemplate,
        BACKGROUND: backgroundTemplate
    }

// Модель данных приложения
const events = new EventEmitter();
const appData = new AppData(events);


// Компоненты
const modalAddWidget = new ModalAddWidget(cloneTemplate("#modal-add-widget-template"), events);
const widgetViews: Record<string, Widget> = {};

appData.getSpaces().forEach((space) => {
    const spaceView = new Space(events);
    document.body.appendChild(spaceView.render(space));
})

events.on<AddWidgetAction>("add-widget", ({ currentSpaceId,  widgetType }) => {
    const typedTemplate = widgetTemplates[widgetType];
    const newId = uuid();

    const space = ensureElement<HTMLDivElement>(`#space-${currentSpaceId}`);
    const widgetView = new Widget(events);
    widgetViews[newId] = widgetView;
    space.appendChild(
        widgetView
            .render({
                id: newId,
                spaceId: currentSpaceId,
                content: cloneTemplate(typedTemplate)
            })
    );
    appData.addWidget(currentSpaceId, newId);
})

events.on<RemoveWidgetAction>("remove-widget", ({spaceId, widgetId}) => {
    appData.removeWidget(spaceId, widgetId);
})


// Initialize the manager
const spaceManager = new SpaceManager(appData.getSpaces().map(space => `#space-${space.id}`));

// Subscribe to space changes
const unsubscribe = spaceManager.onSpaceChange((currentSpace, metrics) => {
    console.log(`Current space: ${currentSpace}`);
    // console.log('All space metrics:');
    //
    // metrics.forEach(metric => {
    //     console.log(
    //         `Space ${metric.index}: ${(metric.intersectionRatio * 100).toFixed(1)}% visible`
    //     );
    // });
});

// You can also check metrics anytime
document.addEventListener("scroll", () => {
    const allMetrics = spaceManager.getSpaceMetrics();
    console.log({1: allMetrics[0].intersectionRatio, 2: allMetrics[1].intersectionRatio});
    // Example: Update UI based on metrics
    allMetrics.forEach(metric => {
        const progressBar = document.getElementById(`progress-space-${metric.index}`);
        if (progressBar) {
            progressBar.style.width = `${metric.intersectionRatio * 100}%`;
        }
    });
});
