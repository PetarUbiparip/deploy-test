import '@babylonjs/loaders';
import { Vector3, HemisphericLight, Color3, Texture } from "@babylonjs/core"
import { SequencePngUtil } from "../util/SequencePngUtil.js";
import * as SequencePngConst from "../util/SequencePngConst";

let scene;
let camera;
let sequencePngUtil;

export const createHomeScene = async (s, c) => {
    scene = s;
    camera = c;
    sequencePngUtil = new SequencePngUtil(scene);
    scene.clearColor = Color3.Black();

    sequencePngUtil.addFrames(loadPNGs("./textures/Home/png/001_cloud/", "cloud_loop", SequencePngConst.CLOUD_LOOP_FIRST_TO_LOAD, SequencePngConst.CLOUD_LOOP_LENGTH))
    sequencePngUtil.addFrames(loadPNGs("./textures/Home/png/002_cloud_to_logo/", "cloud_to_logo", SequencePngConst.CLOUD_TO_LOGO_FIRST_TO_LOAD, SequencePngConst.CLOUD_TO_LOGO_LENGTH))
    sequencePngUtil.addFrames(loadPNGs("./textures/Home/png/004_logo_to_platonic/", "logo_to_platonic", SequencePngConst.LOGO_TO_PLATTONIC_FIRST_TO_LOAD, SequencePngConst.LOGO_TO_PLATONIC_LENGTH))
    sequencePngUtil.addFrames(loadPNGs("./textures/Home/png/007_Platonic_to_globe/", "platonic_to_globe", SequencePngConst.PLATONIC_TO_GLOBE_FIRST_TO_LOAD, SequencePngConst.PLATONIC_TO_GLOBE_LENGTH))

    startAnimCloudLoop()

    cameraConfig()

};


function cameraConfig() {
    var light = new HemisphericLight('HemiLight', new Vector3(0, 0, 1), scene);
    const canvas = scene.getEngine().getRenderingCanvas()
    camera.attachControl(canvas, false)
    camera.wheelPrecision = 1000;
    camera.minZ = 0.1;


    // var light = new HemisphericLight('HemiLight', new Vector3(0, 0.1, 0.1), scene);
    // const canvas = scene.getEngine().getRenderingCanvas()
    // camera.attachControl(canvas, false)
    // camera.wheelPrecision = 100;
    // camera.minZ = 0.1;
    // camera.lowerAlphaLimit = Math.PI / 3;
    // camera.upperAlphaLimit = Math.PI / 1.5;
    // camera.lowerBetaLimit = Math.PI / 3;
    // camera.upperBetaLimit = Math.PI / 1.5;
    // camera.angularSensibilityX = 6_000;
    // camera.angularSensibilityY = 6_000;
}
function startAnimCloudLoop() {
    console.log("startAnimCloudLoop")

    sequencePngUtil.loopFrames(SequencePngConst.CLOUD_LOOP_FIRST_FRAME_INDEX, SequencePngConst.CLOUD_LOOP_LENGTH)
}

function startAnimLogoToPlatonic(revert = false) {
    console.log("startAnimLogoToPlatonic")
    // if(sequencePngUtil.currentFrame < SequencePngConst.LOGO_TO_PLATONIC_FIRST_FRAME_INDEX && revert){
    //     restartLoop()
    //     return;
    // }
    clearInterval(sequencePngUtil.activePngSequence);
    sequencePngUtil.startPngSequenceTex(SequencePngConst.LOGO_TO_PLATONIC_FIRST_FRAME_INDEX, SequencePngConst.LOGO_TO_PLATONIC_LENGTH, startAnimCloudLoop, revert, SequencePngConst.CLOUD_LOOP_LENGTH)



}
function startAnimPlatonicToGlobe(revert = false) {
    console.log("startAnimPlatonicToGlobe")
    // if(sequencePngUtil.currentFrame < SequencePngConst.PLATONIC_TO_GLOBE_FIRST_FRAME_INDEX && revert){
    //     restartLoop()
    //     return;
    // }
    clearInterval(sequencePngUtil.activePngSequence);
    sequencePngUtil.startPngSequenceTex(SequencePngConst.PLATONIC_TO_GLOBE_FIRST_FRAME_INDEX, SequencePngConst.PLATONIC_TO_GLOBE_LENGTH, startAnimCloudLoop, revert, SequencePngConst.CLOUD_LOOP_LENGTH)



}

function startAnimCloudToLogo(revert = false) {
    console.log("startAnimCloudToLogo")
    // if(sequencePngUtil.currentFrame < SequencePngConst.CLOUD_TO_LOGO_FIRST_FRAME_INDEX && revert){
    //     restartLoop()
    //     return;
    // }
    clearInterval(sequencePngUtil.activePngSequence);
    sequencePngUtil.startPngSequenceTex(SequencePngConst.CLOUD_TO_LOGO_FIRST_FRAME_INDEX, SequencePngConst.CLOUD_TO_LOGO_LENGTH, startAnimCloudLoop, revert, SequencePngConst.CLOUD_LOOP_LENGTH)

}
function restartLoop() {
    clearInterval(sequencePngUtil.activePngSequence)
    startAnimCloudLoop();
    return;
}

function loadPNGs(locationPath, pngName, firstPNG, length) {
    let result = [];
    for (let i = firstPNG; i < (firstPNG + length); i++) {
        let pngNumber = "0000".substring(i.toString().length).concat(i)
        result.push(new Texture(`${locationPath}${pngName}.${pngNumber}.png`, scene))
    }
    return result;
}


export function test() {

    console.log('test button')



    // console.log(frames)

    // // clearInterval(cloudLoopInterval)
    // if (testI) {
    //     clearInterval(sequencePngUtil.activePngSequence);
    //     sequencePngUtil.materialPlane.diffuseTexture = new Texture(`./textures/Home/png/temp/download.jpg`, scene)
    //     // sequencePngUtil.frames[60].isEnabled = false;
    //     // sequencePngUtil.frames[59].isEnabled = true;
    //     testI = !testI;
    // } else {
    //     clearInterval(sequencePngUtil.activePngSequence);

    //     // sequencePngUtil.frames[60].isEnabled = true;
    //     // sequencePngUtil.frames[59].isEnabled = false;
    //     sequencePngUtil.materialPlane.diffuseTexture = new Texture(`./textures/Home/png/temp/download_1.jpg`, scene)
    //     testI = !testI;
    // }
}


export function onMouseEnterButton(button, prevSelectedButton) {
    console.log('onMouseEnterButton', button)

    const revert = (prevSelectedButton > button) ? true : false;

    switch (button) {
        case 0:
            console.log('onMouseEnterButton case 1', button)
            startAnimCloudToLogo(revert);
            if (revert) {
                startAnimLogoToPlatonic(revert);
            } else {
                startAnimCloudToLogo(revert);
            }
            break;
        case 1:

            console.log('onMouseEnterButton case 2', button)
            if (revert) {
                startAnimPlatonicToGlobe(revert);
            } else {
                startAnimLogoToPlatonic(revert);
            }
            break;
        case 2:
            console.log('onMouseEnterButton case 3', button)
            startAnimPlatonicToGlobe(revert);
            break;
    }

}
// export function onMouseLeaveButton(btn) {
//     console.log('onMouseLeaveButton', btn)
//     switch (btn) {
//         case 0:
//             // startAnimCloudToLogo(true);
//             break;
//         case 1:
//             // startAnimLogoToPlatonic(true);
//             break;
//         case 2:
//             // startAnimPlatonicToGlobe(true)
//             break;
//     }
// }


