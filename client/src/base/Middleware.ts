import type {IEvents} from "./index.ts";

export abstract class Middleware {
    protected constructor(protected readonly events: IEvents) {}
    abstract register(): void;
}