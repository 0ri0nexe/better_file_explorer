export function clean(container: HTMLElement) {
    while (container.hasChildNodes()) {
        container.firstChild?.remove();
    }
}

