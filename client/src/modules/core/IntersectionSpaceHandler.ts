// currentSpaceManager.ts

import {ensureElement} from "../../utils";
import type {ISpaceSelector} from "../../app/appData.ts";

export interface SpaceMetrics {
    index: number;
    id: string;
    intersectionRatio: number;
    isVisible: boolean;
}

export class IntersectionSpaceHandler {
    private currentSpace: number = 0;
    private spaces: HTMLElement[] = [];
    private spaceMetrics: Map<HTMLElement, number> = new Map();
    private observers: ((space: number, metrics: SpaceMetrics[]) => void)[] = [];
    private intersectionObserver: IntersectionObserver | null = null;

    constructor(spaceSelector: ISpaceSelector) {
        this.fetchSpaces(spaceSelector);
    }

    /**
     * Fetch and register new spaces
     */
    fetchSpaces(spaceSelector: ISpaceSelector): void {
        // Disconnect existing observer
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }

        // Clear existing data
        this.spaceMetrics.clear();
        this.currentSpace = 0;

        // Get new spaces
        const spaceViews = spaceSelector.getSpaces();
        const spaceSelectors = spaceViews.keys()
            .map(spaceName => `#${spaceName}`).toArray();

        this.spaces = spaceSelectors.map(selector => {
            return ensureElement(selector);
        });

        // Initialize metrics for new spaces
        this.spaces.forEach(space => this.spaceMetrics.set(space, 0));

        // Re-setup the observer with new spaces
        this.setupIntersectionObserver();

        // Notify observers of the change
        this.notifyObservers();

    }
    /**
     * Setup Intersection Observer to detect which space is most visible
     */
    private setupIntersectionObserver(): void {
        const options: IntersectionObserverInit = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0 to 1 in 0.01 increments
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            // Update metrics for all entries
            entries.forEach(entry => {
                this.spaceMetrics.set(entry.target as HTMLElement, entry.intersectionRatio);
            });

            // Find the space with the highest intersection ratio
            let maxRatio = 0;
            let maxIndex = 0;

            this.spaces.forEach((space, index) => {
                const ratio = this.spaceMetrics.get(space) || 0;
                if (ratio > maxRatio) {
                    maxRatio = ratio;
                    maxIndex = index;
                }
            });

            // Update current space if changed
            if (this.currentSpace !== maxIndex && maxRatio > 0) {
                this.currentSpace = maxIndex;
                this.notifyObservers();
            }
        }, options);

        // Observe all spaces
        this.spaces.forEach(space => this.intersectionObserver!.observe(space));
    }

    /**
     * Get metrics for all spaces
     */
    getSpaceMetrics(): Record<string, SpaceMetrics> {
        const allSpaces: SpaceMetrics[] = this.spaces.map((space, index) => ({
            id: space.id,
            index,
            intersectionRatio: this.spaceMetrics.get(space) || 0,
            isVisible: (this.spaceMetrics.get(space) || 0) > 0,
            element: space,
        }));

        return Object.fromEntries(allSpaces.map((space) => [space.id, space]));
    }

    /**
     * Get metrics for a specific space
     */
    getSpaceMetric(index: number): SpaceMetrics | null {
        if (index < 0 || index >= this.spaces.length) return null;

        const space = this.spaces[index];
        return {
            id: space.id,
            index,
            intersectionRatio: this.spaceMetrics.get(space) || 0,
            isVisible: (this.spaceMetrics.get(space) || 0) > 0,
        };
    }

    /**
     * Get current space id
     */
    getCurrentSpaceName(): string {
        return this.spaces[this.currentSpace].id;
    }

    /**
     * Subscribe to space changes
     */
    onSpaceChange(callback: (space: number, metrics: SpaceMetrics[]) => void): () => void {
        this.observers.push(callback);

        // Return unsubscribe function
        return () => {
            this.observers = this.observers.filter(obs => obs !== callback);
        };
    }

    /**
     * Notify all observers of space change
     */
    private notifyObservers(): void {
        const metrics = Object.values(this.getSpaceMetrics());
        this.observers.forEach(callback => callback(this.currentSpace, metrics));
    }

    /**
     * Get current space index
     */
    getCurrentSpace(): number {
        return this.currentSpace;
    }

    /**
     * Get current space element
     */
    getCurrentSpaceElement(): HTMLElement {
        return this.spaces[this.currentSpace];
    }

    /**
     * Get intersection ratio of a space (0-1)
     */
    getIntersectionRatio(index: number): number {
        if (index < 0 || index >= this.spaces.length) return 0;
        return this.spaceMetrics.get(this.spaces[index]) || 0;
    }

    /**
     * Scroll to specific space
     */
    scrollToSpace(index: number): void {
        if (index >= 0 && index < this.spaces.length) {
            this.spaces[index].scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Cleanup
     */
    destroy(): void {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        this.observers = [];
        this.spaceMetrics.clear();
    }
}
