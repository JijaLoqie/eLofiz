import { createSelector, createSlice } from "@reduxjs/toolkit";
import { type IWidget } from "@/types.ts";
import type { RootState } from "@/index.tsx";

import "@/components/Widget/widgets.ts";
import { getAllWidgets } from "@/components/Widget/widgetRegistry.ts";

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
    reducers: {},
    selectors: {
        selectWidgets: (state) => state.items,
    }
});

export const { selectWidgets } = WidgetSlice.selectors;

export const selectWidget = createSelector(
    [
        selectWidgets,
        (_state: RootState, id: string) => id,
    ],
    (widgets, id) => widgets[id]
);
