import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { EntityType, type ISpace, type WidgetInstance } from "@/types.ts";
import type { RootState } from "@/index.tsx";
import { uuid } from "@/utils";

interface SpaceSliceState {
    items: ISpace[];
    widgetsOnSpace: Record<string, WidgetInstance[]>

}

const initialState: SpaceSliceState = {
    items: [
        {id: "space-1", name: "main", currentBackground: 'start', fixed: false, widgets: [], images: {"start": {
            id: "start", imageUrl:"/images/startBackground.jpeg"
                }}, streamId: "stream-link1",
        },
        {id: "space-2", name: "ambient", currentBackground: 'start', fixed: true, widgets: [], images: {"start": {
            id: "start", imageUrl:"/images/back4.gif"
                }}, streamId: "stream-link2",
        },
        {id: "space-3", name: "work", currentBackground: 'start', fixed: true, widgets: [], images: {"start": {
            id: "start", imageUrl:"/images/startWorkBackground.gif"
                }}, streamId: "stream-link3",
        },
        {id: "space-4", name: "Dark", currentBackground: 'start', fixed: false, widgets: [], images: {"start": {
            id: "start", imageUrl:"/images/back6.png"
                }}, streamId: "stream1",
        },
        {id: "space-5", name: "Phonk", currentBackground: 'start', fixed: true, widgets: [], images: {"start": {
            id: "start", imageUrl:"/images/back3.jpg"
                }}, streamId: "stream-link2",
        },
        {id: "space-6", name: "Knight", currentBackground: 'start', fixed: true, widgets: [], images: {"start": {
            id: "start", imageUrl:"/images/back5.jpg"
                }}, streamId: "stream-link3",
        },
    ],
    widgetsOnSpace: {},
}

export const SpaceSlice = createSlice({
    name: 'spaces',
    initialState,
    reducers: {
        addWidget: (state,
                    action: PayloadAction<{spaceId: string, widgetId: string}>) => {
            let x = 1;
            const {spaceId, widgetId} = action.payload;
            if (!state.widgetsOnSpace[spaceId]) {
                console.log("creating first time");
                state.widgetsOnSpace[ spaceId ] = []
                x = 2;
            }

            const widgetInstance: WidgetInstance = {
                id: uuid(),
                spaceId,
                widgetId: widgetId,
                position: {x: 10, y: 10}
            }
            state.widgetsOnSpace[spaceId].push(widgetInstance);
        },
        removeWidget: (state,
                       action: PayloadAction<{spaceId: string, widgetInstanceId: string}>) => {
            const {spaceId, widgetInstanceId} = action.payload;
            state.widgetsOnSpace[spaceId] = state.widgetsOnSpace[spaceId].filter(widget => {
                return widget.id !== widgetInstanceId;
            });
        },
        updateSpace: (state, action: PayloadAction<{spaceId: string, props: Partial<ISpace>}>) => {
            const { spaceId, props } = action.payload;
            const space = state.items.find(space => space.id === spaceId);
            if (space) {
                Object.assign(space, props);
            }
        }
    },
    selectors: {
        selectSpaces: (state) => state.items,
    }
})

export const { addWidget, removeWidget, updateSpace } = SpaceSlice.actions;
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
        (state: RootState) => state.spaces.widgetsOnSpace,
        (_state: RootState, id: string) => id
    ],
    (widgetsOnSpace, id) => widgetsOnSpace[id] || []
);


