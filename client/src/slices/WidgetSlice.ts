import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IWidget, WidgetType } from "@/types.ts";
import type { RootState } from "@/index.tsx";
import { getAllWidgets, widgetRegistry } from "@/components/Widget/widgetRegistry.ts";

function generateWidgetSliceState(): Record<string, IWidget> {
    const widgets = getAllWidgets();
    const items: Record<string, IWidget> = {};
    
    for (const widget of widgets) {
        items[widget.id] = {
            id: widget.id,
            title: widget.title,
            preview: widget.preview ?? `preview/${widget.id}.png`,
            type: widget.type,
        };
    }
    
    return items;
}

interface WidgetSliceState {
    items: Record<string, IWidget>;
}

const initialState: WidgetSliceState = {
    items: generateWidgetSliceState(),
};

export const WidgetSlice = createSlice({
    name: "widget",
    initialState,
    reducers: {
        updateWidgetRegistry: (state) => {
            state.items = generateWidgetSliceState();
        }
    },
    selectors: {
        selectWidgets: (state) => widgetRegistry,
    }
});

export const { selectWidgets } = WidgetSlice.selectors;
export const { updateWidgetRegistry } = WidgetSlice.actions;

export const selectWidget = createSelector(
    [
        selectWidgets,
        (_state: RootState, id: string) => id,
    ],
    (widgets, id) => widgets[id]
);
