import {SpaceManager} from "./modules/core/SpaceManager.ts";
import {app} from "./app/LofiApp.ts";
import {IntersectionMiddleware} from "./middlewares";
import {SpaceManagerMiddleware} from "./middlewares/SpaceManagerMiddleware.ts";
import {ModalGlobalMiddleware} from "./middlewares/ModalGlobalMiddleware.ts";
import type {OpenModalAction} from "./actions.ts";
import {WidgetBuilderMiddleware} from "./middlewares/WidgetBuilderMiddleware.ts";

app.use(SpaceManagerMiddleware);
app.use(IntersectionMiddleware); //todo: набор пространств не обновляется, пока что он должен быть последним
app.use(WidgetBuilderMiddleware);
app.use(ModalGlobalMiddleware);



// todo: это так-то middleware с логикой горячих клавиш
document.body.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        app.events.emit<OpenModalAction>("open-modal");
    }
});