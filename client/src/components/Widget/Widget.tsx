import { use, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/index.tsx";
import type { WidgetInstance, WidgetShape, WidgetSize } from "@/types";
import { removeWidget, updateWidgetInstance } from "@/slices/SpaceSlice.ts";
import { SpaceContext } from "@/components/Space/Space.tsx";
import { useDragHandler } from "@/components/hooks/useDragHandler.ts";
import { widgetRegistry, getWidgetConfig } from "./widgetRegistry.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExpand, faCompress, faCircle, faSquare } from "@fortawesome/free-solid-svg-icons";

import "./widgets.ts";

interface WidgetProps {
    widgetInfoId: string;
    widgetInstance?: WidgetInstance;
}

interface ContextMenuState {
    visible: boolean;
    x: number;
    y: number;
}

const shapeClasses: Record<WidgetShape, string> = {
    square: 'rounded-2xl',
    circle: 'rounded-full',
};

const sizeClasses: Record<WidgetSize, string> = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64',
    auto: '',
};

export const Widget = ({ widgetInfoId, widgetInstance }: WidgetProps) => {
    const spaceId = use(SpaceContext);
    const headerRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    
    const [contextMenu, setContextMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0 });
    const [isResizing, setIsResizing] = useState(false);

    const widgetConfig = getWidgetConfig(widgetInfoId);
    const shape = widgetInstance?.shape ?? widgetConfig?.defaultShape ?? 'square';
    const size = widgetInstance?.size ?? widgetConfig?.defaultSize ?? 'auto';
    const canResize = widgetConfig?.resizable ?? false;

    useDragHandler({
        selectElementRef: headerRef,
        dragElementRef: rootRef,
        options: {}
    });

    const handleClose = useCallback((id: string) => {
        dispatch(removeWidget({ widgetInstanceId: id, spaceId }));
    }, [dispatch, spaceId]);

    const handleContextMenu = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    }, []);

    const closeContextMenu = useCallback(() => {
        setContextMenu(prev => ({ ...prev, visible: false }));
    }, []);

    const handleToggleShape = useCallback(() => {
        if (!widgetInstance) return;
        const newShape: WidgetShape = shape === 'square' ? 'circle' : 'square';
        dispatch(updateWidgetInstance({
            spaceId,
            widgetInstanceId: widgetInstance.id,
            updates: { shape: newShape }
        }));
        closeContextMenu();
    }, [dispatch, spaceId, widgetInstance, shape, closeContextMenu]);

    const handleToggleSize = useCallback(() => {
        if (!widgetInstance || !canResize) return;
        const sizeOrder: WidgetSize[] = ['small', 'medium', 'large', 'auto'];
        const currentIndex = sizeOrder.indexOf(size);
        const nextSize = sizeOrder[(currentIndex + 1) % sizeOrder.length];
        dispatch(updateWidgetInstance({
            spaceId,
            widgetInstanceId: widgetInstance.id,
            updates: { size: nextSize }
        }));
        closeContextMenu();
    }, [dispatch, spaceId, widgetInstance, size, canResize, closeContextMenu]);

    const renderWidgetContent = () => {
        const config = getWidgetConfig(widgetInfoId);
        if (!config) return <div className="text-white/50 text-sm">Widget not found</div>;
        
        const Component = config.component;
        return <Component spaceId={spaceId} widgetInstance={widgetInstance} />;
    };

    const sizeClass = size !== 'auto' ? sizeClasses[size] : '';

    return (
        <>
            <div
                ref={rootRef}
                className={`
                    widget liquidGlass-effect resizable-wrapper
                    ${shapeClasses[shape]}
                    ${sizeClass}
                    ${isResizing ? 'ring-2 ring-blue-400' : ''}
                    transition-all duration-200
                `}
                onContextMenu={handleContextMenu}
            >
                <div ref={headerRef} className="widget__header cursor-move">
                    {widgetInstance && (
                        <button
                            className="button text-white/70 hover:text-white hover:bg-white/20"
                            data-type="close"
                            aria-label="Close widget"
                            onClick={() => handleClose(widgetInstance.id)}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    )}
                </div>
                
                <div className="widget__content h-full flex items-center justify-center">
                    {renderWidgetContent()}
                </div>

                {canResize && (
                    <div
                        className="absolute bottom-1 right-1 w-4 h-4 cursor-se-resize opacity-0 hover:opacity-100 transition-opacity"
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            setIsResizing(true);
                            const startX = e.clientX;
                            const startY = e.clientY;
                            const handleMouseMove = (moveEvent: MouseEvent) => {
                                const deltaX = moveEvent.clientX - startX;
                                const deltaY = moveEvent.clientY - startY;
                                if (rootRef.current) {
                                    rootRef.current.style.width = `${Math.max(100, rootRef.current.offsetWidth + deltaX)}px`;
                                    rootRef.current.style.height = `${Math.max(100, rootRef.current.offsetHeight + deltaY)}px`;
                                }
                            };
                            const handleMouseUp = () => {
                                setIsResizing(false);
                                document.removeEventListener('mousemove', handleMouseMove);
                                document.removeEventListener('mouseup', handleMouseUp);
                            };
                            document.addEventListener('mousemove', handleMouseMove);
                            document.addEventListener('mouseup', handleMouseUp);
                        }}
                    >
                        <FontAwesomeIcon icon={faExpand} className="text-white/50 text-xs" />
                    </div>
                )}
            </div>

            {contextMenu.visible && (
                <>
                    <div className="fixed inset-0 z-40" onClick={closeContextMenu} />
                    <div
                        className="fixed z-50 bg-black/80 backdrop-blur-md rounded-lg py-2 min-w-[160px] shadow-xl border border-white/10"
                        style={{ left: contextMenu.x, top: contextMenu.y }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="w-full px-4 py-2 text-left text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-3 transition-colors"
                            onClick={handleToggleShape}
                        >
                            <FontAwesomeIcon icon={shape === 'square' ? faCircle : faSquare} />
                            <span>Make {shape === 'square' ? 'Circle' : 'Square'}</span>
                        </button>
                        
                        {canResize && (
                            <button
                                className="w-full px-4 py-2 text-left text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-3 transition-colors"
                                onClick={handleToggleSize}
                            >
                                <FontAwesomeIcon icon={faExpand} />
                                <span>Size: {size}</span>
                            </button>
                        )}
                        
                        <hr className="my-2 border-white/10" />
                        
                        <button
                            className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/20 flex items-center gap-3 transition-colors"
                            onClick={() => {
                                if (widgetInstance) handleClose(widgetInstance.id);
                                closeContextMenu();
                            }}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                            <span>Close Widget</span>
                        </button>
                    </div>
                </>
            )}
        </>
    );
};
