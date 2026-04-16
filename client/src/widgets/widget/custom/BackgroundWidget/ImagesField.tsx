import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useSpaceListStore } from "@/features/spaces-session/model";

interface ImagesFieldProps {
    spaceId: string;
}

export const ImagesField = observer((props: ImagesFieldProps) => {
    const spaceListStore = useSpaceListStore();
    const {images, currentBackground} = spaceListStore.getSpaceImageInfo(props.spaceId);

    const handleSetBackground = useCallback((newImageId: string) => {
        spaceListStore.updateSpace(props.spaceId, { currentBackground: newImageId });
    }, [props.spaceId]);

    return (
        <div className="image-widget__grid">
            {Object.values(images).map((image) => (<div key={image.id} onClick={() => handleSetBackground(image.id)}
                                                        className={`image-widget__grid-item ${image.id === currentBackground ? "selected" : ""}`}>
                <img src={`${image.imageUrl}`} alt="Selected image"/>
                <div className="image-widget__remove-btn">
                    Remove
                </div>
            </div>))}
        </div>
    )
})