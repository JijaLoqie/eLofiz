import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/index.tsx";
import type { ImageInfo, ISpace, SpaceParams, WidgetInstance } from "@/shared/types.ts";
import { uuid } from "@/shared/utils.ts";

interface SpaceSliceState {
    items: ISpace[];

}

const initialState: SpaceSliceState = {
    items: [
    ],
}

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

export const SpaceSlice = createSlice({
    name: 'spaces',
    initialState,
    reducers: {
        addWidget: (state,
                    action: PayloadAction<{spaceId: string, widgetId: string}>) => {
            const {spaceId, widgetId} = action.payload;

            const widgetInstance: WidgetInstance = {
                id: uuid(),
                spaceId,
                widgetId: widgetId,
                position: {x: 10, y: 10}
            }
            const space = state.items.find(item => item.id === spaceId)
            if (space) {
                space.widgets.push(widgetInstance);
            }
        },
        removeWidget: (state,
                       action: PayloadAction<{spaceId: string, widgetInstanceId: string}>) => {
            const {spaceId, widgetInstanceId} = action.payload;
            const space = state.items.find(item => item.id === spaceId)
            if (space) {
                space.widgets = space.widgets.filter(widget => {
                    return widget.id !== widgetInstanceId;
                });
            }
        },
        updateSpace: (state, action: PayloadAction<{spaceId: string, props: Partial<ISpace>}>) => {
            const { spaceId, props } = action.payload;
            const space = state.items.find(space => space.id === spaceId);
            if (space) {
                Object.assign(space, props);
            }
        },

        createSpace: (state, action: PayloadAction<SpaceParams>) => {
            const props = action.payload;
            const space: ISpace = createDefaultSpace(props);
            state.items.push(space);
        },
    },
    selectors: {
        selectSpaces: (state) => state.items,
    }
})

export const { addWidget, removeWidget, updateSpace, createSpace } = SpaceSlice.actions;
export const { selectSpaces } = SpaceSlice.selectors;

export const selectSpace = createSelector(
    [
        selectSpaces,
        (_state: RootState, id: string) => id,
    ],
    (spaces, id) => {
        const space = spaces.find(space => space.id === id)
        if (!space) throw new Error(`Unknown space id: ${id}, ${spaces.map(space => space.id)}`);
        return space;
    },
);

export const selectImageInfo = createSelector(
    [selectSpace],
    (space) => ({
        currentBackground: space.currentBackground,
        images: space.images
    })
);
export const selectWidgetsOnSpace = createSelector([
        (state: RootState) => state.spaces.items,
        (_state: RootState, id: string) => id
    ],
    (spaces, id) =>  spaces.find(space => space.id === id)?.widgets  || []
);


