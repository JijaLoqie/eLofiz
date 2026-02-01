import { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectSpaces } from '@/slices/SpaceSlice.ts';
import { ensureElement } from '@/utils';

export interface SpaceMetrics {
    index: number;
    id: string;
    name: string;
    intersectionRatio: number;
    isVisible: boolean;
}

export const useIntersectionSpaceHandler = () => {
    const spaces = useSelector(selectSpaces);

    const spacesRef = useRef<HTMLElement[]>([]);
    const spaceMetricsRef = useRef<Map<HTMLElement, number>>(new Map());
    const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

    const [currentSpace, setCurrentSpace] = useState<number>(0);
    const [currentSpaceName, setCurrentSpaceName] = useState<string>('');
    const [currentSpaceInfo, setCurrentSpaceInfo] = useState<SpaceMetrics>();
    const [spaceMetrics, setSpaceMetrics] = useState<Record<string, SpaceMetrics>>({});

    const updateMetrics = useCallback(() => {
        const metrics = Object.fromEntries(
            spacesRef.current.map((space, index) => [
                space.id,
                {
                    id: space.id,
                    index,
                    name: space.id,
                    intersectionRatio: spaceMetricsRef.current.get(space) || 0,
                    isVisible: (spaceMetricsRef.current.get(space) || 0) > 0,
                },
            ])
        );
        setSpaceMetrics(metrics);
    }, []);

    const setupIntersectionObserver = useCallback(() => {
        const options: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        };

        intersectionObserverRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                spaceMetricsRef.current.set(entry.target as HTMLElement, entry.intersectionRatio);
            });

            let maxRatio = 0;
            let maxIndex = 0;

            spacesRef.current.forEach((space, index) => {
                const ratio = spaceMetricsRef.current.get(space) || 0;
                if (ratio > maxRatio) {
                    maxRatio = ratio;
                    maxIndex = index;
                }
            });

            if (currentSpace !== maxIndex && maxRatio > 0) {
                setCurrentSpace(maxIndex);
                setCurrentSpaceName(spacesRef.current[maxIndex]?.id || '');
                updateMetrics();
            }
        }, options);

        spacesRef.current.forEach(space =>
            intersectionObserverRef.current?.observe(space)
        );
    }, [currentSpace, updateMetrics]);

    useEffect(() => {
        if (spaces.length === 0) return;

        if (intersectionObserverRef.current) {
            intersectionObserverRef.current.disconnect();
        }

        spaceMetricsRef.current.clear();

        const spaceSelectors = spaces.map(space => `#${space.id}`);
        spacesRef.current = spaceSelectors.map(selector => ensureElement(selector));

        spacesRef.current.forEach(space => spaceMetricsRef.current.set(space, 0));

        updateMetrics();

        const options: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                spaceMetricsRef.current.set(entry.target as HTMLElement, entry.intersectionRatio);
            });

            let maxRatio = 0;
            let maxIndex = 0;

            spacesRef.current.forEach((space, index) => {
                const ratio = spaceMetricsRef.current.get(space) || 0;
                if (ratio > maxRatio) {
                    maxRatio = ratio;
                    maxIndex = index;
                }
            });

            setCurrentSpace(maxIndex);
            setCurrentSpaceName(spacesRef.current[maxIndex]?.id || '');
            updateMetrics();
        }, options);

        intersectionObserverRef.current = observer;
        spacesRef.current.forEach(space => observer.observe(space));

        return () => {
            observer.disconnect();
        };
    }, [spaces, updateMetrics]);

    const scrollToSpace = useCallback((index: number) => {
        if (index >= 0 && index < spacesRef.current.length) {
            spacesRef.current[index].scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const getIntersectionRatio = useCallback((index: number): number => {
        if (index < 0 || index >= spacesRef.current.length) return 0;
        return spaceMetricsRef.current.get(spacesRef.current[index]) || 0;
    }, []);

    return {
        currentSpace,
        currentSpaceName,
        spaceMetrics,
        scrollToSpace,
        getIntersectionRatio,
    };
};