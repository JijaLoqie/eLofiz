import { type ChangeEvent, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { selectSpace, updateSpace } from "@/slices/SpaceSlice.ts";
import { ImagesField } from "@/components/Widget/custom/BackgroundWidget/ImagesField.tsx";

type ImageInfo = {
    id: string;
    imageUrl: string;
}

interface BackgroundWidgetProps {
    spaceId: string;
}

export const BackgroundWidget = (props: BackgroundWidgetProps) => {
    const space = useSelector((state: RootState) => selectSpace(state, props.spaceId));
    const {images, currentBackground} = space;
    const dispatch = useDispatch();

    const handleToggleFixed = useCallback(() => {
        dispatch(updateSpace({
            spaceId: `${props.spaceId}`,
            props: {
                fixed: !space.fixed
            }
        }))
    }, [space.fixed, dispatch, props.spaceId])

    const handleLoadImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const onLoad = (e:  ProgressEvent<FileReader>) => {
            const imageUrl = e.target?.result as string;
            const id = `image-${Date.now()}-${Math.random()}`;
            const imageInfo: ImageInfo = { id, imageUrl }
            const newImages = {
                ...images,
                [id]: imageInfo
            };
            dispatch(updateSpace({
                spaceId: space.id,
                props: {images: newImages}
            }));
        };

        Array.from(files).forEach((file) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = onLoad;
                reader.readAsDataURL(file);
            }
        });

        e.target.value = '';
    }, [dispatch, props.spaceId, images]);

    return (
        <div className="image-widget">
            <div className="image-widget__section">
                <h3 className="image-widget__title">Выберите изображения</h3>
                <ImagesField spaceId={space.id} />
                <label>
                    <div className="button" data-type="add-images" aria-label="Add images">
                        <span className="image-widget__add-icon">+</span>
                        Добавить изображения
                    </div>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => handleLoadImage(e)}
                        accept="image/*"
                        className="image-widget__file-input"
                        hidden
                    />
                </label>
            </div>

            <div className="image-widget__section">
                <h3 className="image-widget__title">Параметры</h3>
                <div className="image-widget__options">
                    <label
                        data-type="pin-images"
                        className="checkbox"
                    >
                        <input
                            type="checkbox"
                            defaultChecked={space.fixed}
                            onChange={handleToggleFixed}
                        />
                        <span className="image-widget__checkbox-label">Закрепить</span>
                    </label>
                </div>
            </div>
        </div>
    )
}