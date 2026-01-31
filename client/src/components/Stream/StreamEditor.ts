import { type IEvents, View } from "@/base";
import type { IStream } from "@/types.ts";
import { cloneTemplate, ensureElement } from "@/utils";
import {
    AudioManager,
    getAudioDuration,
    getFileNameFromPath,
    TimelineManager
} from "@/modules/StreamEditor";
import { StreamCardPartList } from "./StreamCardPartList.ts";
import { selectStream, updateStream } from "@/slices/StreamSlice.ts";
import { appStore } from "@/app/appStore.ts";

const template = ensureElement<HTMLTemplateElement>("#stream-editor-template");

const defaultItem: IStream = {
    id: "",
    name: "",
    audios: [],
    breakpoints: [],
    cover: "",
};

export class StreamEditor extends View<IStream> {
    changedItem: IStream = { ...defaultItem };
    private timelineManager= new TimelineManager((breakpoints) => {
        this.changedItem.breakpoints = breakpoints;
    });
    private audioManager = new AudioManager(
        (audios) => {
            this.changedItem.audios = audios;
            this.updateTimelineMaxDuration();
        },
        () => {
            this.updateTimelineMaxDuration();
        }
    );

    private nameInput = ensureElement<HTMLInputElement>(
        ".stream-editor__name-input",
        this.container
    );
    private coverPreview = ensureElement<HTMLImageElement>(
        ".stream-editor__cover-preview",
        this.container
    );
    private coverInput = ensureElement<HTMLInputElement>(
        ".stream-editor__cover-input",
        this.container
    );
    private timelineElement = ensureElement<HTMLElement>(
        '[data-component="timeline"]',
        this.container
    );
    private audioListElement = ensureElement<HTMLElement>(
        '[data-type="stream-parts"]',
        this.container
    );
    private streamCardParts= new StreamCardPartList(this.audioListElement, this.events);


    constructor(wrapper: HTMLElement, events: IEvents) {
        super(cloneTemplate(template), events);
        wrapper.appendChild(this.container);

        // Initialize managers
        this.timelineManager.setTimelineElement(this.timelineElement);

        this.attachEventListeners();
    }

    private attachEventListeners() {
        // Name input
        this.nameInput.addEventListener("input", (e) => {
            const target = e.target as HTMLInputElement;
            this.changedItem.name = target.value;
        });

        // Cover image change
        const coverButton = ensureElement<HTMLButtonElement>(
            '[data-type="change-cover"]',
            this.container
        );
        coverButton.addEventListener("click", () => {
            this.coverInput.click();
        });

        this.coverInput.addEventListener("change", (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target?.result as string;
                    this.changedItem.cover = dataUrl;
                    this.coverPreview.src = dataUrl;
                };
                reader.readAsDataURL(file);
            }
        });

        // Save button
        const saveButton = ensureElement<HTMLButtonElement>(
            '[data-type="save"]',
            this.container
        );
        saveButton.addEventListener("click", () => {
            this.save();
            this.events.emit("modal:close");
        });

        // Cancel button
        const cancelButton = ensureElement<HTMLButtonElement>(
            '[data-type="cancel"]',
            this.container
        );
        cancelButton.addEventListener("click", () => {
            this.reset();
            this.events.emit("modal:close");
        });
    }

    // Setter using render method pattern
    set id(streamId: string) {
        this.streamCardParts.id = streamId;
        const item = selectStream(appStore.getState(), streamId);
        if (item) {
            this.changedItem = { ...item };
            this.updateUI();
        }
    }

    set name(name: string) {
        this.changedItem.name = name;
        this.nameInput.value = name;
    }

    set audios(audios: string[]) {
        this.changedItem.audios = audios;
        this.audioManager.setAudioFiles(audios);
        this.updateTimelineMaxDuration();
    }

    set breakpoints(breakpoints: number[]) {
        this.changedItem.breakpoints = breakpoints;
        this.timelineManager.setBreakpoints(breakpoints);
    }

    set cover(cover: string) {
        this.changedItem.cover = cover;
        this.coverPreview.src = cover;
    }


    private async updateTimelineMaxDuration() {
        try {
            let totalDuration = 0;

            // Get duration for each audio file
            for (const audioPath of this.changedItem.audios) {
                try {
                    const duration = await getAudioDuration(audioPath);
                    totalDuration += duration;
                } catch (error) {
                    console.warn(
                        `Failed to get duration for ${getFileNameFromPath(audioPath)}, using default 10000ms`
                    );
                    totalDuration += 10000; // Fallback duration
                }
            }

            // If no audios or total is 0, use default
            const maxDuration = totalDuration > 0 ? totalDuration : 10000;

            this.timelineManager.setMaxDuration(maxDuration);
            this.timelineManager.setBreakpoints(this.changedItem.breakpoints);
        } catch (error) {
            console.error("Error updating timeline max duration:", error);
        }
    }

    private updateUI() {
        this.nameInput.value = this.changedItem.name;

        if (this.changedItem.cover) {
            this.coverPreview.src = this.changedItem.cover;
        }

        this.audioManager.setAudioFiles(this.changedItem.audios);
        this.updateTimelineMaxDuration();
    }

    render(data?: Partial<IStream>): HTMLElement {
        if (data?.id) {
            this.id = data.id;
        } else {
            Object.assign(this.changedItem, data ?? {});
            this.updateUI();
        }
        return this.container;
    }

    reset() {
        this.changedItem = { ...defaultItem };
        this.nameInput.value = "";
        this.coverPreview.src = "";
        this.audioManager.setAudioFiles([]);
        this.timelineManager.setBreakpoints([]);
    }

    save() {
        if (!this.changedItem.name.trim()) {
            alert("Please enter a stream name");
            return;
        }

        if (this.changedItem.audios.length === 0) {
            alert("Please add at least one audio file");
            return;
        }
        appStore.dispatch(updateStream(this.changedItem));
    }
}