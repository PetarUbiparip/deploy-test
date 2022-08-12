import '@babylonjs/loaders';
import { Animation, Vector3, HemisphericLight, PointerEventTypes, Color3} from "@babylonjs/core"
import { PlatonicShader} from "../Loading";

let scene;
let camera;
export const createPlatonicScene = async (s, c) => {
    scene = s;
    camera = c;
    scene.clearColor = Color3.Black();

    scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
            case PointerEventTypes.POINTERUP:
                setCameraPositionToDefault()
                break;
        }
    });

    cameraConfig()

    await PlatonicShader.instantiateModelsToScene();

};

function setCameraPositionToDefault() {

    const defaultX = -0.0000008705496095;
    const defaultY = 0.1199991294503905;
    const defaultZ = 0.23699999999680227;

    const stepX = (camera.position.x - defaultX) / 29;
    const stepY = (camera.position.y - defaultY) / 29;
    const stepZ = (camera.position.z - defaultZ) / 29;

    var animation = new Animation("cameraSwoop", "position", 75, Animation.ANIMATIONTYPE_VECTOR3)
    var keyFrames = []
    keyFrames.push({
        frame: 0,
        value: camera.position.clone()
    })

    for (var i = 1; i < 30; i++) {
        keyFrames.push({
            frame: i,
            value: new Vector3(camera.position.x - stepX * i, camera.position.y - stepY * i, camera.position.z - stepZ * i)
        })
    }

    // this is default postiton of camera and last 10 frames of animation are same (from 30 to 40) because there is bug with mouse movement and without it camera wont return to default position. 
    for (var i = 30; i < 40; i++) {
        keyFrames.push({
            frame: i,
            value: new Vector3(defaultX, defaultY, defaultZ)
        })
    }
    animation.setKeys(keyFrames)
    camera.animations = [animation];
    animation = scene.beginAnimation(camera, 0, 40)
}

function cameraConfig(){
    var light = new HemisphericLight('HemiLight', new Vector3(0, 0.1, 0.1), scene);
    const canvas = scene.getEngine().getRenderingCanvas()
    camera.attachControl(canvas, false)
    camera.wheelPrecision = 100;
    camera.minZ = 0.1;
    camera.lowerAlphaLimit = Math.PI / 3;
    camera.upperAlphaLimit = Math.PI / 1.5;
    camera.lowerBetaLimit = Math.PI / 3;
    camera.upperBetaLimit = Math.PI / 1.5;
    camera.angularSensibilityX = 6_000;
    camera.angularSensibilityY = 6_000;
}


