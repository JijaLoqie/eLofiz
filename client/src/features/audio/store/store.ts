import { makeAutoObservable } from "mobx";
import { ensureElement } from "@/shared/utils";
import { getInitialCollectionModel, type CollectionModel } from "@/shared/lib/collection.ts";
import type { ILocalStore } from "@/shared/hooks/use-local-store.ts";

type AudioItem = {
    id: string;
    mediaElement: MediaElementAudioSourceNode;
    gainNode: GainNode;
};

export class SpaceAudioStore implements ILocalStore {
    audioContext: AudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Инициализируем начальным состоянием
    _items: CollectionModel<string, AudioItem> = getInitialCollectionModel();

    constructor() {
        makeAutoObservable(this, {
            // @ts-ignore
            audioContext: false
        });
    }

    // Геттер для быстрого доступа к сущностям
    get items() {
        return this._items.entities;
    }

    registerAudio(spaceId: string) {
        // Проверка существования в Record
        if (this.items[spaceId]) return;

        try {
            const htmlAudio = ensureElement<HTMLAudioElement>(`#${spaceId} audio`);

            const mediaElementSource = this.audioContext.createMediaElementSource(htmlAudio);
            const gainNode = this.audioContext.createGain();

            mediaElementSource.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Обновляем коллекцию: добавляем ID в order и объект в entities
            this._items.order.push(spaceId);
            this._items.entities[spaceId] = {
                id: spaceId,
                mediaElement: mediaElementSource,
                gainNode: gainNode,
            };
        } catch (error) {
            console.error(`Failed to register audio for space ${spaceId}:`, error);
        }
    }

    setVolume(spaceId: string, volume: number) {
        const item = this.items[spaceId];
        if (item) {
            item.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        }
    }

    playBeep() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.frequency.value = 800;
        oscillator.type = "sine";

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        const now = this.audioContext.currentTime;

        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
    }

    destroy() {
        // // Чистим ресурсы при уничтожении стора
        // this._items.order.forEach(id => {
        //     this._items.entities[id].mediaElement.disconnect();
        // });
        // this.audioContext.close();
    }
}
