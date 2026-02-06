export function isSelector(x: any): x is string {
    return (typeof x === "string") && x.length > 1;
}


export type SelectorCollection<T> = string | NodeListOf<Element> | T[];

export function ensureAllElements<T extends HTMLElement>(selectorElement: SelectorCollection<T>, context: HTMLElement = document as unknown as HTMLElement): T[] {
    if (isSelector(selectorElement)) {
        return Array.from(context.querySelectorAll(selectorElement)) as T[];
    }
    if (selectorElement instanceof NodeList) {
        return Array.from(selectorElement) as T[];
    }
    if (Array.isArray(selectorElement)) {
        return selectorElement;
    }
    throw new Error(`Unknown selector element`);
}

export type SelectorElement<T> = T | string;

export function ensureElement<T extends HTMLElement>(selectorElement: SelectorElement<T>, context?: HTMLElement): T {
    if (isSelector(selectorElement)) {
        const elements = ensureAllElements<T>(selectorElement, context);
        if (elements.length > 1) {
            console.warn(`selector ${selectorElement} return more then one element`);
        }
        if (elements.length === 0) {
            throw new Error(`selector ${selectorElement} return nothing`);
        }
        return elements.pop() as T;
    }
    if (selectorElement instanceof HTMLElement) {
        return selectorElement as T;
    }
    throw new Error('Unknown selector element');
}

export function cloneTemplate<T extends HTMLElement>(query: string | HTMLTemplateElement): T {
    const template = ensureElement(query) as HTMLTemplateElement;
    return template.content.firstElementChild?.cloneNode(true) as T;
}



export function uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function trailingThrottle(cb: (...args: any[]) => void, delay: number = 600) {
    let isThrottled = false
    let lastEvent: {
        context: any,
        args: any[]
    } | null = null;

    function resetThrottle() {
        if (lastEvent) {
            cb.apply(lastEvent.context, lastEvent.args)
            lastEvent = null
            setTimeout(resetThrottle, delay)
        } else {
            isThrottled = false
        }
    }

    return (...args: any[]) => {
        if (isThrottled) {
            lastEvent = {
                args,
                // @ts-ignore
                context: this,
            }
            return
        }

        // @ts-ignore
        cb.apply(this, args)
        isThrottled = true

        setTimeout(resetThrottle, delay)
    }
}

