import { useSpaceNode } from "@/components/hooks/useSpaceNode.ts";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import { selectSpace, updateSpace } from "@/slices/SpaceSlice.ts";

interface BackgroundWidgetProps {
    spaceId: string;
}

export const BackgroundWidget = (props: BackgroundWidgetProps) => {
    const space = useSelector((state: RootState) => selectSpace(state, props.spaceId));
    const dispatch = useDispatch();

    const handleToggleFixed = useCallback(() => {
        dispatch(updateSpace({
            spaceId: `${props.spaceId}`,
            props: {
                fixed: !space.fixed
            }
        }))
    }, [space.fixed, dispatch, props.spaceId])

    return (
        <div className="image-widget">
            <div className="image-widget__section">
                <h3 className="image-widget__title">Выберите изображения</h3>
                <div className="image-widget__grid" data-selected-images></div>
                <button className="button" data-type="add-images" data-add-images type="button" aria-label="Add images">
                    <span className="image-widget__add-icon">+</span>
                    Добавить изображения
                </button>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="image-widget__file-input"
                    data-file-input
                    hidden
                />
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