export function uiVisibility(elementId, visible) {

    const uiElement = document.getElementById(elementId);
    if (visible) {
        uiElement.style.visibility = 'visible';
        uiElement.style.opacity = 1;
    } else {
        uiElement.style.visibility = 'hidden';
        uiElement.style.opacity = 0;
        uiElement.style.transition = "visibility 1s, opacity 1s linear";
    }
}

export function hideElement(element) {
    const uiElement = document.getElementById(element);
    uiElement.style.visibility = 'hidden';
}

export function scrollTo(target) {
    document.getElementById('scrollbar')
        .scroll({
            top: target,
            left: 0,
            behavior: 'smooth'
        });
}