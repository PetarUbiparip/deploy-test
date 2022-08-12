import { HemisphericLight, Vector3, Color3, GlowLayer } from "@babylonjs/core"
import { ArrowWarp, ArrowScene } from "./../Loading.js";

let scene;
let camera;
export const createArrowScene = async (s, c) => {
    scene = s;
    camera = c
    scene.clearColor = Color3.Black();
    var light = new HemisphericLight('HemiLight', new Vector3(0, 0, 0), scene);
    // const canvas = scene.getEngine().getRenderingCanvas()
    // camera.attachControl(canvas, false)
    // camera.wheelPrecision = 100;
    // camera.minZ = 0.1;
    // camera.setTarget(Vector3.Zero())

    await ArrowWarp.addAllToScene();
    await ArrowScene.addAllToScene();

    console.log(scene.animationGroups);
    scene.animationGroups[1].stop()
    scene.animationGroups[1].reset()

    scene.activeCamera = scene.cameras[2];
    // console.log(scene.cameras)

    changeChildrenVisibility("Arrow_Baked", false);
    changeChildrenVisibility("Target_Baked", false);
    changeChildrenVisibility("Warp_Baked", false);

    // set glow
    var glow = new GlowLayer("glow", scene);
    glow.intensity = 2;


};



export async function startArrowAnim() {

    scene.animationGroups[1].start()

    changeChildrenVisibility("MASH2_Instancer_objects", false, true)
    changeChildrenVisibility("Warp_Baked", true, true);
    changeChildrenVisibility("Arrow_Baked", true, true);
    changeChildrenVisibility("Target_Baked", true, true);

    setTimeout(() => {
        scene.animationGroups[0].stop();
    }, 3000);

}

async function changeChildrenVisibility(nodeName, enable, async = false) {
    let counter = 0;
    let delay = 0;
    for (let m of scene.getNodeByID(nodeName)._children) {

        if (async) {
            if (counter % 100 == 0) {
                delay += 50;
            }
            counter++;
            setTimeout(() => {
                m.setEnabled(enable);
            }, delay);
        } else {
            m.setEnabled(enable);
        }
    }
}