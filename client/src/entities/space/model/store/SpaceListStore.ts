import type { ILocalStore } from "@/shared/hooks/use-local-store.ts";
import { makeAutoObservable } from "mobx";
import {
    type CollectionModel,
    getInitialCollectionModel,
    linearizeCollection, normalizeCollection
} from "@/shared/lib/collection.ts";
import type { ImageInfo, ISpace, SpaceParams, WidgetInstance } from "@/shared/types.ts";
import { uuid } from "@/shared/utils.ts";

const createDefaultSpace = (params: SpaceParams) => {
    let currentBackground: string;
    const images: Record<string, ImageInfo> = Object.fromEntries(
        params.images.map((imageUrl, index): [string, ImageInfo] => {
            const id = uuid();
            if (index == 0) {
                currentBackground = id;
            }
            return [id, {id, imageUrl}]
        })
    );
    const space: ISpace = {
        id: uuid(),
        name: params.name,
        currentBackground: currentBackground!,
        images: images,
        streamId: params.streamId,
        fixed: params.fixed || false,
        widgets: params.widgets,
    };
    return space;
}


export class SpaceListStore implements ILocalStore {
    private _list: CollectionModel<string, ISpace> = getInitialCollectionModel();

    public addWidget(spaceId: string, widgetId: string) {
        const widgetInstance: WidgetInstance = {
            id: uuid(),
            spaceId,
            widgetId: widgetId,
            position: {x: 10, y: 10}
        }
        const space = this._list.entities[spaceId];
        if (space) {
            space.widgets.push(widgetInstance);
        }
    }

    public removeWidget(spaceId: string, widgetInstanceId: string) {
        const space = this._list.entities[spaceId];
        if (space) {
            space.widgets = space.widgets.filter(widget => {
                return widget.id !== widgetInstanceId;
            });
        }
    }

    public updateWidget(spaceId: string, widgetId: string, widgetProps: Partial<WidgetInstance>) {
        const space = this._list.entities[spaceId];
        const widget = space?.widgets?.find?.(widget => widget.id === widgetId);
        if (widget) {
            Object.assign(widget, widgetProps);
        }
    }

    public createSpace(props: SpaceParams) {
        const space: ISpace = createDefaultSpace(props);
        let spaces = linearizeCollection(this._list);
        this._list = normalizeCollection([...spaces, space], (space) => space.id);
    }

    public updateSpace(spaceId: string, new_space: Partial<ISpace>) {
        const space = this._list.entities[spaceId];
        if (space) {
            Object.assign(space, new_space);
        }
    }

    get spaces() {
        return linearizeCollection(this._list);
    }

    public getSpace(spaceId: string) {
        return this._list.entities[spaceId];
    }

    public getSpaceWidgets(spaceId: string) {
        return this.getSpace(spaceId).widgets
    }

    public getSpaceImageInfo(spaceId: string) {
        const {currentBackground, images} = this.getSpace(spaceId);
        return ({currentBackground, images})
    }

    constructor() {
        makeAutoObservable(this);
    }

    destroy() {

    }
}