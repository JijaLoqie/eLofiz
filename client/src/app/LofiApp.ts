import type {IEvents} from "../base";
import {EventEmitter} from "../base/Events.ts";
import type {Middleware} from "../base/Middleware.ts";

class LofiApp {
    private readonly _events: IEvents;
    constructor() {
        this._events = new EventEmitter();
    }

    use<T extends Middleware>(NewMiddleware: new (events: IEvents) => T) {
        document.addEventListener("pointerenter", () => {
            console.log("CONNECTION");
            const newMiddleware = new NewMiddleware(this._events);
            newMiddleware.register();
        })

    }

    get events(): IEvents {
        return this._events;
    }



}

export const app = new LofiApp();