import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { selectImageInfo, updateSpace } from "@/slices/SpaceSlice.ts";
import { useCallback } from "react";

interface ImagesFieldProps {
    spaceId: string;
}

export const ImagesField = (props: ImagesFieldProps) => {
    const {spaceId} = props;
    const {images, currentBackground} = useSelector((state: RootState) => selectImageInfo(state, spaceId));
    const dispatch = useDispatch();

    const handleSetBackground = useCallback((newImageId: string) => {
        dispatch(
            updateSpace({
                spaceId: spaceId, props: { currentBackground: newImageId }
            })
        )
    }, [dispatch, spaceId]);

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
}