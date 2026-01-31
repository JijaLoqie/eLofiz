import { Component } from "../../base";
import { spaceApi } from "../../modules/core/SpaceApi.ts";
import { cloneTemplate, ensureElement } from "../../utils";
import type { IBackgroundWidget } from "../../types.ts";

interface ImageItem {
    id: string;
    dataUrl: string;
}

interface IImageSelectionWidgetState {
    images: ImageItem[];
    selectedImageId: string | null;
    isPinned: boolean;
}

class ImageSelectionWidget extends Component<IBackgroundWidget> {
    private selectedImages: Map<string, ImageItem> = new Map();
    private selectedImageId: string | null = null;
    private grid: HTMLElement;
    private fileInput: HTMLInputElement;
    private pinCheckbox: HTMLInputElement;
    private backgroundNode: HTMLElement | null;
    private spaceId: string;

    constructor(spaceId: string) {
        super(cloneTemplate("#widget-image-selection-template"));

        this.spaceId = spaceId;
        this.backgroundNode = spaceApi.getBackgroundNode(spaceId);

        this.grid = ensureElement('[data-selected-images]', this.container);
        this.fileInput = ensureElement('[data-file-input]', this.container) as HTMLInputElement;
        this.pinCheckbox = ensureElement('[data-pin-images]', this.container) as HTMLInputElement;

        this.initEventListeners();
    }

    private initEventListeners(): void {
        const addBtn = ensureElement('[data-add-images]', this.container) as HTMLButtonElement;
        addBtn.addEventListener('click', () => this.fileInput.click());

        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        this.pinCheckbox.addEventListener('change', () => this.updatePinned());
    }

    private handleFileSelect(event: Event): void {
        const files = (event.target as HTMLInputElement).files;
        if (!files) return;

        Array.from(files).forEach((file) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const dataUrl = e.target?.result as string;
                    const id = `image-${Date.now()}-${Math.random()}`;
                    this.selectedImages.set(id, { id, dataUrl });

                    // Auto-select first image if none selected
                    if (this.selectedImageId === null) {
                        this.selectImage(id);
                    }

                    this.renderGrid();
                };
                reader.readAsDataURL(file);
            }
        });

        (event.target as HTMLInputElement).value = '';
    }

    private renderGrid(): void {
        this.grid.innerHTML = '';

        if (this.selectedImages.size === 0) {
            const emptyState = document.createElement('p');
            emptyState.style.cssText = 'grid-column: 1/-1; text-align: center; color: #999; font-size: 0.8rem; margin: 0;';
            emptyState.textContent = 'Нет изображений';
            this.grid.appendChild(emptyState);
            return;
        }

        this.selectedImages.forEach((image) => {
            const item = document.createElement('div');
            item.className = 'image-widget__grid-item';

            // Add selected class only if this is the selected image
            if (image.id === this.selectedImageId) {
                item.classList.add('selected');
            }

            item.innerHTML = `
                <img src="${image.dataUrl}" alt="Selected image" />
                <button class="image-widget__remove-btn" data-image-id="${image.id}" type="button" title="Remove">×</button>
            `;

            const removeBtn = item.querySelector('[data-image-id]') as HTMLButtonElement;
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeImage(image.id);
            });

            item.addEventListener('click', () => {
                this.selectImage(image.id);
            });

            this.grid.appendChild(item);
        });
    }

    private selectImage(id: string): void {
        this.selectedImageId = id;
        const image = this.selectedImages.get(id);

        if (image && this.backgroundNode) {
            // Add fade-out class
            this.backgroundNode.classList.add('space--transitioning');

            // Wait for fade out, then change image
            setTimeout(() => {
                if (!this.backgroundNode) return;
                this.backgroundNode.style.backgroundImage = `url('${image.dataUrl}')`;
                // Remove fade-out class to fade back in
                this.backgroundNode.classList.remove('space--transitioning');
            }, 500); // Match this to your CSS transition duration
        }

        this.renderGrid();
    }

    private removeImage(id: string): void {
        this.selectedImages.delete(id);

        // If removed image was selected, select first available image
        if (this.selectedImageId === id) {
            const firstImageId = this.selectedImages.keys().next().value;
            if (firstImageId) {
                this.selectImage(firstImageId);
            } else {
                this.selectedImageId = null;
                if (this.backgroundNode) {
                    this.backgroundNode.style.backgroundImage = '';
                }
            }
        }

        this.renderGrid();
    }

    private updatePinned(): void {
        if (this.backgroundNode) {
            if (this.pinCheckbox.checked) {
                this.backgroundNode.classList.add('space--fixed');
            } else {
                this.backgroundNode.classList.remove('space--fixed');
            }
        }
    }

    public getState(): IImageSelectionWidgetState {
        return {
            images: Array.from(this.selectedImages.values()),
            selectedImageId: this.selectedImageId,
            isPinned: this.pinCheckbox.checked,
        };
    }

    public setState(state: IImageSelectionWidgetState): void {
        this.selectedImages.clear();
        state.images.forEach((image) => {
            this.selectedImages.set(image.id, image);
        });

        this.pinCheckbox.checked = state.isPinned;

        // Apply pinned class
        this.updatePinned();

        // Set selected image and update background
        if (state.selectedImageId && this.selectedImages.has(state.selectedImageId)) {
            this.selectImage(state.selectedImageId);
        } else if (this.selectedImages.size > 0) {
            const firstImageId = this.selectedImages.keys().next().value;
            this.selectImage(firstImageId || "");
        }

        this.renderGrid();
    }
}

export default ImageSelectionWidget;