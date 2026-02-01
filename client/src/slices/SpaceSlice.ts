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
        {id: "space-1", name: "main", background: 'startBackground.jpeg', fixed: false, widgets: []},
        {id: "space-2", name: "ambient", background: 'back4.gif', fixed: true, widgets: []},
        {id: "space-3", name: "work", background: 'startWorkBackground.gif', fixed: true, widgets: []},
        {id: "space-4", name: "Dark", background: 'back6.png', fixed: false, widgets: []},
        {id: "space-5", name: "Phonk", background: 'back3.jpg', fixed: true, widgets: []},
        {id: "space-6", name: "Knight", background: 'back5.jpg', fixed: true, widgets: []},
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
export const selectWidgetsOnSpace = createSelector([
        (state: RootState) => state.spaces.widgetsOnSpace,
        (_state: RootState, id: string) => id
    ],
    (widgetsOnSpace, id) => widgetsOnSpace[id] || []
);


