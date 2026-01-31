import { app } from "./app/LofiApp.ts";
import { IntersectionMiddleware } from "./middlewares";
import { SpaceManagerMiddleware } from "./middlewares/SpaceManagerMiddleware.ts";
import { ModalGlobalMiddleware } from "./middlewares/ModalGlobalMiddleware.ts";
import type { CreateSpaceAction, ToggleModalAction } from "./actions.ts";
import { WidgetBuilderMiddleware } from "./middlewares/WidgetBuilderMiddleware.ts";
import { EntityType, type ISpace, ModalType } from "./types.ts";
import { AudioManagerMiddleware } from "./middlewares/AudioManagerMiddleware.ts";
import { appStore } from "@/app/appStore.ts";

app.use(SpaceManagerMiddleware);
app.use(IntersectionMiddleware);
app.use(WidgetBuilderMiddleware);
app.use(ModalGlobalMiddleware);
app.use(AudioManagerMiddleware);

const openActions: Record<string, () => void | undefined> = {
    "1": () => app.events.emit<ToggleModalAction>("toggle-modal",
        {entityType: EntityType.WIDGETS, modalType: ModalType.LIST}),
    "2": () => app.events.emit<ToggleModalAction>("toggle-modal",
        {entityType: EntityType.PRESETS, modalType: ModalType.LIST}),
    "3": () => app.events.emit<ToggleModalAction>("toggle-modal",
        {entityType: EntityType.STREAMS, modalType: ModalType.LIST})
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

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;