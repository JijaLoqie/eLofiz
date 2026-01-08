import type {IEvents} from "./index.ts";
import type {AppData} from "../app/appData.ts";

export abstract class Middleware {
    protected constructor(protected readonly events: IEvents, protected readonly store: AppData) {}
    abstract register(): void;
}