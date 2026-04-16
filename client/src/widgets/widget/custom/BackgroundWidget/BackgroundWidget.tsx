import { type ChangeEvent, useCallback } from "react";
import { ImagesField } from "@/widgets/widget/custom/BackgroundWidget/ImagesField.tsx";
import { useSpaceListStore } from "@/features/spaces-session/model";
import { observer } from "mobx-react-lite";

type ImageInfo = {
    id: string;
    imageUrl: string;
}

interface BackgroundWidgetProps {
    spaceId: string;
}

export const BackgroundWidget = observer((props: BackgroundWidgetProps) => {
    const spaceListStore = useSpaceListStore();
    const space = spaceListStore.getSpace(props.spaceId);
    const {images} = space;

    const handleToggleFixed = useCallback(() => {
        spaceListStore.updateSpace(props.spaceId, {
            fixed: !space.fixed
        });
    }, [space.fixed, props.spaceId])

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
            spaceListStore.updateSpace(props.spaceId, {images: newImages});
        };

        Array.from(files).forEach((file) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = onLoad;
                reader.readAsDataURL(file);
            }
        });

        e.target.value = '';
    }, [props.spaceId, images]);

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
})