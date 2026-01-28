import {app} from "./app/LofiApp.ts";
import {IntersectionMiddleware} from "./middlewares";
import {SpaceManagerMiddleware} from "./middlewares/SpaceManagerMiddleware.ts";
import {ModalGlobalMiddleware} from "./middlewares/ModalGlobalMiddleware.ts";
import type { CreateSpaceAction, ToggleModalAction } from "./actions.ts";
import {WidgetBuilderMiddleware} from "./middlewares/WidgetBuilderMiddleware.ts";
import { type ISpace, ModalType } from "./types.ts";
import {AudioManagerMiddleware} from "./middlewares/AudioManagerMiddleware.ts";

app.use(SpaceManagerMiddleware);
app.use(IntersectionMiddleware);
app.use(WidgetBuilderMiddleware);
app.use(ModalGlobalMiddleware);
app.use(AudioManagerMiddleware);

const openActions: Record<string, () => void | undefined> = {
    "1": () => app.events.emit<ToggleModalAction>("toggle-modal", {modalType: ModalType.WIDGETS}),
    "2": () => app.events.emit<ToggleModalAction>("toggle-modal", {modalType: ModalType.PRESETS}),
    "3": () => app.events.emit<ToggleModalAction>("toggle-modal", {modalType: ModalType.STREAMS})
}

document.body.addEventListener("keypress", (e) => {
    const handlePress = openActions[e.key];
    if (handlePress) {
        handlePress();
    }

})



const defaultSpaces: ISpace[] = [
    {name: "main", background: 'startBackground.jpeg', fixed: false, widgets: []},
    {name: "ambient", background: 'back4.gif', fixed: true, widgets: []},
    {name: "work", background: 'startWorkBackground.gif', fixed: true, widgets: []},
    {name: "Dark", background: 'back6.png', fixed: false, widgets: []},
    {name: "Phonk", background: 'back3.jpg', fixed: true, widgets: []},
    {name: "Knight", background: 'back5.jpg', fixed: true, widgets: []},
];

defaultSpaces.forEach((space) => {
    app.events.emit<CreateSpaceAction>("create-space", {spaceName: space.name, spaceSettings: space});
});