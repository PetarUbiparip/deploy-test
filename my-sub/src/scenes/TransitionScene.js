import '@babylonjs/loaders';
import { Vector3, HemisphericLight } from "@babylonjs/core"
import { WarpNew } from "../util/Loading.js";
import { changeChildrenVisibility, setGlow } from "../util/ModelUtil";
import { names } from "../util/Naming.js";

let scene;
let camera;
export let warpAnimation;
const warpTransitionDuration = 1500;

export const createTransitionScene = async (s, c) => {
    console.log("createTransitionScene")
    scene = s;
    camera = c;
    // scene.clearColor = Color3.Green();
    // scene.clearColor = Color3.Black();
    scene.autoClear = false;

    setGlow(2, 1000, 50, scene)

    new HemisphericLight('HemiLight', new Vector3(0, 0, 0), scene);

    WarpNew.addAllToScene();
    console.log(scene.cameras);
    cameraConfig()
    scene.activeCamera = scene.cameras[1];

    warpAnimation = scene.animationGroups[0]
    warpAnimation.play(true);
    warpVisibility(false);


    console.log(scene)
};

function cameraConfig() {
    const canvas = scene.getEngine().getRenderingCanvas()
    camera.attachControl(canvas, false)
    camera.wheelPrecision = 100;
    camera.minZ = 0.1;
}

export async function warpTransition() {
    warpVisibility(true, warpTransitionDuration);
    warpAnimation.play(true);

    setTimeout(() => {
        warpVisibility(false, warpTransitionDuration);
    }, warpTransitionDuration);

    setTimeout(() => {
        warpAnimation.stop();
    }, warpTransitionDuration * 2);
}

export function stopWarpTransition() {
    warpVisibility(false);
    warpAnimation.stop();
}

function warpVisibility(visible, duration) {
    changeChildrenVisibility(scene.getNodeByID(names.whoWeAre.meshes.warpLoop)?._children.entries(), visible, duration)
}
