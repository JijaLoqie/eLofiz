import {app} from "./app/LofiApp.ts";
import {IntersectionMiddleware} from "./middlewares";
import {SpaceManagerMiddleware} from "./middlewares/SpaceManagerMiddleware.ts";
import {ModalGlobalMiddleware} from "./middlewares/ModalGlobalMiddleware.ts";
import type {CreateSpaceAction, OpenModalAction} from "./actions.ts";
import {WidgetBuilderMiddleware} from "./middlewares/WidgetBuilderMiddleware.ts";
import type {ISpace} from "./types.ts";
import {AudioManagerMiddleware} from "./middlewares/AudioManagerMiddleware.ts";

app.use(SpaceManagerMiddleware);
app.use(IntersectionMiddleware); //todo: набор пространств не обновляется, пока что он должен быть последним
app.use(WidgetBuilderMiddleware);
app.use(ModalGlobalMiddleware);
app.use(AudioManagerMiddleware);



// todo: это так-то middleware с логикой горячих клавиш
document.body.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        app.events.emit<OpenModalAction>("open-modal");
    }
});


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