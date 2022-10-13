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

