import type { FC, JSX } from 'react';
import type { WidgetInstance, SpaceEffects } from '@/types';

export interface WidgetConfig {
    id: string;
    component: FC<{ spaceId: string; widgetInstance?: WidgetInstance }>;
    defaultShape?: 'square' | 'circle';
    defaultSize?: 'small' | 'medium' | 'large' | 'auto';
    resizable?: boolean;
    effects?: (spaceId: string) => Partial<SpaceEffects>;
}

export const widgetRegistry: Record<string, WidgetConfig> = {};

export function registerWidget(config: WidgetConfig) {
    widgetRegistry[config.id] = config;
}

export function getWidgetConfig(id: string): WidgetConfig | undefined {
    return widgetRegistry[id];
}

export function getAllWidgetIds(): string[] {
    return Object.keys(widgetRegistry);
}
