import { EventEmitter } from "./base/Events.ts";
import { AppData } from "./appData.ts";
import {cloneTemplate, ensureElement} from "./utils";
import ModalAddWidget from "./components/Modal/ModalAddWidget.ts";
import type {AddWidgetAction} from "./actions.ts";
import Widget from "./components/widget/Widget.ts";
import Space from "./components/Space.ts";



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
    const space = appData.getSpace(currentSpaceId);
    if (!space) return;
    const newWidget = new Widget(events, widgetType);

})