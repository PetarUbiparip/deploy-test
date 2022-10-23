import { GlowLayer } from "@babylonjs/core"

export async function changeChildrenVisibility(meshes, enable, duration = 0) {
    let delay = Math.floor(Math.random() * duration)
    for (let [i, m] of meshes) {
        if (i % 10 === 0)
            delay = Math.floor(Math.random() * duration);
        if (duration > 0) {
            setTimeout(() => m.setEnabled(enable), delay);
        } else {
            m.setEnabled(enable);
        }
    }
}

export function setGlow(intensity, mainTextureFixedSize, blurKernelSize, scene) {
    var glow = new GlowLayer("glow", scene, {
        mainTextureFixedSize: mainTextureFixedSize,
        blurKernelSize: blurKernelSize
    });
    glow.intensity = intensity;
    return glow;
}