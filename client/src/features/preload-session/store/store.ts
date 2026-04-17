import type { ILocalStore } from "@/shared/hooks/use-local-store.ts";
import { WidgetStore } from "@/entities/widget/model/store.ts";
import { StreamStore } from "@/entities/stream/model/store.ts";
import { PresetStore } from "@/entities/preset/model/store.ts";




export class PreloadStore implements ILocalStore {
    presetStore: PresetStore;
    widgetStore: WidgetStore;
    streamStore: StreamStore;

    constructor() {
        this.presetStore = new PresetStore();
        this.widgetStore = new WidgetStore();
        this.streamStore = new StreamStore();
    }

    destroy() {};
}