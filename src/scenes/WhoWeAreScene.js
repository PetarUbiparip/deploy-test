import { HemisphericLight, Vector3, Color3, GlowLayer } from "@babylonjs/core"
import { Warp, Compass, Arrow } from "../util/Loading.js";
import { names } from "../util/Naming.js";

let scene;
let camera;
export const createWhoWeAreScene = async (s, c) => {
    scene = s;
    camera = c
    scene.clearColor = Color3.Black();

    var light = new HemisphericLight('HemiLight', new Vector3(0, 0, 0), scene);
    const canvas = scene.getEngine().getRenderingCanvas()

    await Warp.addAllToScene();
    await Arrow.addAllToScene();
    await Compass.addAllToScene();

    //temp stoped
    // scene.animationGroups[0].stop() 
    
    
    scene.animationGroups[1].stop()
    scene.animationGroups[1].reset()
    scene.animationGroups[2].stop()
    scene.animationGroups[2].reset()

    scene.activeCamera = scene.cameras[2];


    camera.attachControl(canvas, false)
    camera.wheelPrecision = 100;
    camera.minZ = 0.1;
    camera.setTarget(Vector3.Zero())


    console.log(scene)
    console.log(scene.meshes)
    console.log(scene.cameras)

    hideArrow();

    hideCompass();

    // set glow
    var glow = new GlowLayer("glow", scene);
    glow.intensity = 2;


};



export async function startCompassAnimation() {

    scene.animationGroups[0].stop() 
    scene.activeCamera = scene.cameras[0];
    scene.animationGroups[2].play(); 

    hideWarpLoop();
    showCompass();

}

export async function startArrowAnimation() {

    scene.activeCamera = scene.cameras[2];
    scene.animationGroups[1].start()

    hideWarpLoop(true);
    showArrow(true);

    setTimeout(() => {
        scene.animationGroups[0].stop();
    }, 3000);

}


export async function startArrowAnimShort() {

// scene.animationGroups[1].goToFrame(400);
// scene.animationGroups[1].start(true,  1, 400,  300 )
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




function showArrow(async){
    changeChildrenVisibility(names.whoWeAre.meshes.arrow.arrow, true, async);
    changeChildrenVisibility(names.whoWeAre.meshes.arrow.target, true, async);
    changeChildrenVisibility(names.whoWeAre.meshes.arrow.warp, true, async);
}

function hideArrow(async){
    changeChildrenVisibility(names.whoWeAre.meshes.arrow.arrow, false, async);
    changeChildrenVisibility(names.whoWeAre.meshes.arrow.target, false, async);
    changeChildrenVisibility(names.whoWeAre.meshes.arrow.warp, false, async);
}


function showCompass(async){
    changeChildrenVisibility(names.whoWeAre.meshes.compass.frame, true, async);
    changeChildrenVisibility(names.whoWeAre.meshes.compass.star, true, async);
    changeChildrenVisibility(names.whoWeAre.meshes.compass.pointerStatic, true, async);
    changeChildrenVisibility(names.whoWeAre.meshes.compass.pointerAnimated, true, async);
    changeChildrenVisibility(names.whoWeAre.meshes.compass.scala, true, async);
}

function hideCompass(async){
    changeChildrenVisibility(names.whoWeAre.meshes.compass.frame, false);
    changeChildrenVisibility(names.whoWeAre.meshes.compass.star, false);
    changeChildrenVisibility(names.whoWeAre.meshes.compass.pointerStatic, false);
    changeChildrenVisibility(names.whoWeAre.meshes.compass.pointerAnimated, false);
    changeChildrenVisibility(names.whoWeAre.meshes.compass.scala, false);
}

function showLoopHide(async){
    changeChildrenVisibility(names.whoWeAre.meshes.warpLoop, true, async)
}
function hideWarpLoop(async){
    changeChildrenVisibility(names.whoWeAre.meshes.warpLoop, false, async)
}