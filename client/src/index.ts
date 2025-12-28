import { EventEmitter } from "./base/Events.ts";
import { AppData } from "./appData.ts";
import {cloneTemplate, ensureElement, uuid} from "./utils";
import ModalAddWidget from "./components/Modal/ModalAddWidget.ts";
import type {AddWidgetAction} from "./actions.ts";
import Widget from "./components/widget/Widget.ts";
import Space from "./components/Space.ts";
import type {WidgetType} from "./types.ts";

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
appData.getSpaces().forEach((space) => {
    const spaceView = new Space(events);
    document.body.appendChild(spaceView.render(space));
})

events.on<AddWidgetAction>("add-widget", ({ currentSpaceId,  widgetType }) => {
    const typedTemplate = widgetTemplates[widgetType];
    const newId = uuid();

    const space = ensureElement<HTMLDivElement>(`#space-${currentSpaceId}`);
    space.appendChild(
        new Widget(events)
            .render({
                id: newId,
                content: cloneTemplate(typedTemplate)
            })
    );
    appData.addWidget(currentSpaceId, newId);
})