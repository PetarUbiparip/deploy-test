import '@babylonjs/loaders';
import { Animation, Vector3, HemisphericLight, GlowLayer, Color3, AxesViewer, PointerEventTypes } from "@babylonjs/core"
import { Bulb } from "../util/Loading";
import { uiVisibility } from "../util/UIHelper.js";
import { setGlow } from "../util/ModelUtil";

let scene;
let camera;
let currentDisplaying;
let pointerWheelObserver;
let activeTimeouts = [];

export const createSolutionsScene = async (s, c) => {
    sceneListeners()

    scene = s;
    camera = c;
    scene.clearColor = Color3.Black();

    cameraConfig()

    await Bulb.addAllToScene();

    setGlow(2, 1000, 50, scene)

    onSceneEnter()
};


function cameraConfig() {
    var light = new HemisphericLight('HemiLight', new Vector3(0, 0.1, 0.1), scene);
    const canvas = scene.getEngine().getRenderingCanvas()
    // camera.attachControl(canvas, false)
    // camera.wheelPrecision = 100;
    camera.minZ = 0.1;
    camera.rotation = new Vector3(0, Math.PI, 0);
}





function toSolutions() {

    cleanUI()
    clearAllTimeouts()

    setTimeout(() => {
        scrollTo(0)
        currentDisplaying = Scenes.Solutions;
        moveCameraLeftRight(true)
        activeTimeouts.push(setTimeout(() => uiVisibility(Scenes.Solutions, true), 1000))
    }, 1000)

}

function toCybersecurityServices() {

    cleanUI()
    clearAllTimeouts()

    setTimeout(() => {
        scrollTo(document.documentElement.clientHeight * .6)
        currentDisplaying = Scenes.CybersecurityServices;
        moveCameraLeftRight(false)
        activeTimeouts.push(setTimeout(() => uiVisibility(Scenes.CybersecurityServices, true), 1000))
    }, 1000)
}

function toManagedServices() {

    cleanUI()
    clearAllTimeouts()

    setTimeout(() => {
        scrollTo(document.documentElement.clientHeight * 1.2)
        currentDisplaying = Scenes.ManagedServices;
        moveCameraLeftRight(true)
        activeTimeouts.push(setTimeout(() => uiVisibility(Scenes.ManagedServices, true), 1000))
    }, 1000)
}

function toProfessionalServices() {

    cleanUI()
    clearAllTimeouts()

    setTimeout(() => {
        scrollTo(document.documentElement.clientHeight * 1.8)
        currentDisplaying = Scenes.ProfessionalServices;
        moveCameraLeftRight(false)
        activeTimeouts.push(setTimeout(() => uiVisibility(Scenes.ProfessionalServices, true), 1000))
    }, 1000)
}

function changeScene(direction) {
    switch (currentDisplaying) {
        case Scenes.Solutions:
            if (!direction) toCybersecurityServices();
            break;
        case Scenes.CybersecurityServices:
            direction ? toSolutions() : toManagedServices();
            break;
        case Scenes.ManagedServices:
            direction ? toCybersecurityServices() : toProfessionalServices();
            break;
        case Scenes.ProfessionalServices:
            if (direction) toManagedServices();
            break;
        default:
            toCybersecurityServices();
    }
}

function moveCameraLeftRight(direction) {

    if ((scene?.activeCamera?.position.x > 0 && direction) || (scene?.activeCamera?.position.x < 0 && !direction))
        return;

    const currentPositionX = scene?.activeCamera?.position?.x
    const targetPositionX = scene?.activeCamera?.position?.x > 0 ? -.12 : .12

    const stepX = (targetPositionX - currentPositionX) / 29;

    var animation = new Animation("cameraSwoop", "position", 75, Animation.ANIMATIONTYPE_VECTOR3)
    var keyFrames = []
    keyFrames.push({
        frame: 0,
        value: camera.position.clone()
    })

    for (var i = 1; i < 30; i++) {
        keyFrames.push({
            frame: i,
            value: new Vector3(scene.activeCamera.position.x + stepX * i, scene.activeCamera.position.y, scene.activeCamera.position.z)
        })
    }

    animation.setKeys(keyFrames)
    camera.animations = [animation];
    animation = scene.beginAnimation(camera, 0, 30)
}

function startSceneCameraAnim() {

    const targetPositionZ = 0.4;

    var animation = new Animation("cameraSwoop", "position", 75, Animation.ANIMATIONTYPE_VECTOR3)
    var keyFrames = []

    keyFrames.push({
        frame: 0,
        value: new Vector3(.12, .1, 0.4)
    })
    for (var i = 1; i < 75; i++) {
        keyFrames.push({
            frame: i,
            value: new Vector3(
                .12,
                .1,
                targetPositionZ + (targetPositionZ * i / 5))
        })
    }

    animation.setKeys(keyFrames)
    camera.animations = [animation];
    animation = scene.beginAnimation(camera, 74, 0)
}

function scrollTo(target) {
    document.getElementById('scroll')
        .scroll({
            top: target,
            left: 0,
            behavior: 'smooth'
        });
}

const Scenes = {
    Solutions: "solutions",
    CybersecurityServices: "cybersecurityServices",
    ManagedServices: "managedServices",
    ProfessionalServices: "professionalServices",
}

function addPointerWhellObservable() {
    pointerWheelObserver = scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
            case PointerEventTypes.POINTERWHEEL:
                if (pointerInfo.event.wheelDelta > 0)
                    changeScene(true);
                else
                    changeScene(false);
                break;
        }
    });
}

function sceneListeners() {
    document.addEventListener('/solutions', (e) => {
        onSceneEnter()
    }, false);

    document.addEventListener('/solutions-stop', (e) => {
        onSceneLeave()
    }, false);
}

function onSceneLeave() {
    pointerWheelObserver = null;
    scene.onPointerObservable.remove(pointerWheelObserver);
}

function onSceneEnter() {

    console.log("onSceneEnter")
    setTimeout(() => startSceneCameraAnim(), 1)

    if (!pointerWheelObserver)
        addPointerWhellObservable()

    setTimeout(() => toSolutions(), 1000)
}

function cleanUI() {
    uiVisibility(Scenes.Solutions, false)
    uiVisibility(Scenes.CybersecurityServices, false)
    uiVisibility(Scenes.ProfessionalServices, false)
    uiVisibility(Scenes.ManagedServices, false)
}


function clearAllTimeouts() {
    activeTimeouts.forEach((timeout) =>
        clearTimeout(timeout)
    )
    console.log("cleared")
    activeTimeouts = [];
}