import {Component} from "../../base";
import {spaceApi} from "../../modules/core/SpaceApi.ts";
import {cloneTemplate, ensureElement} from "../../utils";

class BackgroundWidget extends Component<IBackgroundWidget> {
    _backgroundNode;

    constructor(spaceId: string) {
        super(cloneTemplate("#widget-background-template"));
        this._backgroundNode = spaceApi.getBackgroundNode(spaceId);
        ensureElement<HTMLInputElement>(".background-input", this.container).addEventListener("input", (e) => {
            const target = e.target as HTMLInputElement;

            // Get the file from the input
            const file = target.files?.[0];
            if (file) {
                // Use FileReader to convert file to data URL
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.url = event.target?.result as string;
                };
                reader.readAsDataURL(file);
            }
        })
        }

    set url(imageUrl: string) {
        console.log(imageUrl);

        if (this._backgroundNode) {
            this._backgroundNode.style.backgroundImage = `url('${imageUrl}')`;
        }
    }
}


interface IBackgroundWidget {
    url: string
}

export default BackgroundWidget;