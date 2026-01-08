import {Middleware} from "../base/Middleware.ts";
import {SpaceManager} from "../modules/core/SpaceManager.ts";
import type {AppData} from "../app/appData.ts";
import type {IEvents} from "../base";
import type {CreateSpaceAction, DeleteSpaceAction, RenameSpaceAction} from "../actions.ts";
import type {ISpace} from "../types.ts";

export class SpaceManagerMiddleware extends Middleware {
    private readonly spaceManager;

    constructor(events: IEvents, store: AppData) {
        super(events, store);
        this.spaceManager = new SpaceManager(events, store);
    }

    register(): void {
        this.events.on<CreateSpaceAction>("create-space", (data: { spaceName: string, spaceSettings?: Partial<ISpace> }) => {
            this.spaceManager.createSpace(data.spaceName, data.spaceSettings);
        });
        this.events.on<DeleteSpaceAction>("delete-space", (data: { spaceId: string }) => {
            this.spaceManager.deleteSpace(data.spaceId);
        });
        this.events.on<RenameSpaceAction>("rename-space", (data: { spaceId: string, newName: string }) => {
            this.spaceManager.renameSpace(data.spaceId, data.newName);
        });
    }
}