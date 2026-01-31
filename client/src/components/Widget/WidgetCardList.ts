import { ItemsList } from "../ui/ItemsList.ts";
import { EntityType, FieldType, type IButtonGroup, type IWidget, WidgetType } from "../../types.ts";
import type { IEvents } from "../../base";
import { app } from "../../app/LofiApp.ts";
import { ButtonGroup } from "../ui/ButtonGroup.ts";
import { WidgetCard } from "./WidgetCard.ts";

export class WidgetCardList extends ItemsList<IWidget> {
    constructor(wrapper: HTMLElement, events: IEvents) {
        super(
            wrapper,
            events,
            EntityType.WIDGETS,
            () => app.store.getWidgets(),
            WidgetCard
        );
        const props: IButtonGroup = {
            items: Object.values(WidgetType),
            value: "",
        }
        this.register(
            ButtonGroup,
            props,
            FieldType.BUTTON_GROUP,
            (widget: IWidget, selectedType: string) => {
                if (selectedType === "") return true;
                return widget.type === selectedType;
            }
        )
    }
}