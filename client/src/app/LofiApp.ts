import type {IEvents} from "../base";
import {AppData} from "./appData.ts";
import {EventEmitter} from "../base/Events.ts";
import type {Middleware} from "../base/Middleware.ts";

class LofiApp {
    private readonly _events: IEvents;
    private readonly _store: AppData;
    constructor() {
        this._events = new EventEmitter();
        this._store = new AppData(this._events);
    }

    use<T extends Middleware>(NewMiddleware: new (events: IEvents, store: AppData) => T) {
        const newMiddleware = new NewMiddleware(this._events, this._store);
        newMiddleware.register();
    }

    get events(): IEvents {
        return this._events;
    }

    get store(): AppData {
        return this._store;
    }


}

export const app = new LofiApp();