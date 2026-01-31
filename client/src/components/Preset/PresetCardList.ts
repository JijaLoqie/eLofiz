import { ItemsList } from "../ui/ItemsList.ts";
import { EntityType, FieldType, type IButtonGroup, type IPreset } from "../../types.ts";
import type { IEvents } from "../../base";
import { app } from "../../app/LofiApp.ts";
import { PresetCard } from "./PresetCard.ts";
import { ButtonGroup } from "../ui/ButtonGroup.ts";
import { SearchField } from "../ui/SearchField.ts";

export class PresetCardList extends ItemsList<IPreset> {
    constructor(wrapper: HTMLElement, events: IEvents) {
        super(
            wrapper,
            events,
            EntityType.PRESETS,
            () => app.store.getPresets(),
            PresetCard
        );
        const { tagsCount } = app.store.getPresetListInfo()
        const props: IButtonGroup = {
            value: "",
            items: Array.from(tagsCount.keys())
        };
        this.register(
            ButtonGroup,
            props,
            FieldType.BUTTON_GROUP,
            (preset: IPreset, selectedTag: string) => {
                if (selectedTag === "") return true;
                return preset.tags.some((tag) => selectedTag === tag);
            }
        );
        this.register(
            SearchField,
            {},
            FieldType.SEARCH,
            (preset: IPreset, selectedName: string) => {
                if (selectedName === "") return true;
                return preset.id.includes(selectedName);
            }
        );
    }
}