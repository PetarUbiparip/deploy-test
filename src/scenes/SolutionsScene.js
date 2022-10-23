import '@babylonjs/loaders';
import { Animation, Vector3, HemisphericLight, Color3, PointerEventTypes } from "@babylonjs/core"
import { Bulb } from "../util/Loading";
import { uiVisibility, scrollTo } from "../util/UIHelper.js";
import { setGlow } from "../util/ModelUtil";
import { warpTransition } from "./TransitionScene";
import { names } from "../util/Naming.js";
import history from '../routes/history';

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
    // let  background = new Layer("", "./textures/Home/png/tempBackground.png", scene);
    setGlow(4, 1024, 1000, scene)
};

function cameraConfig() {
    new HemisphericLight('HemiLight', new Vector3(0, 0.1, 0.1), scene);
    const canvas = scene.getEngine().getRenderingCanvas()
    // camera.attachControl(canvas, false)
    // camera.wheelPrecision = 100;
    camera.minZ = 0.1;
    camera.rotation = new Vector3(0, Math.PI, 0);
}

function toSolutions() {

    clearUI()
    clearAllTimeouts()


    setTimeout(() => {
        moveCameraLeftRight(true)
        scrollTo(0)
        currentDisplaying = Scenes.Solutions;
        activeTimeouts.push(setTimeout(() => {
            bulbVisibility(true);
            uiVisibility("solutions-wrap", true)
            uiVisibility(Scenes.Solutions, true)
        }, 1000))

    }, 1000)

}

function toCybersecurityServices() {

    clearUI()
    clearAllTimeouts()

    setTimeout(() => {
        scrollTo(document.documentElement.clientHeight * .6)
        currentDisplaying = Scenes.CybersecurityServices;
        moveCameraLeftRight(false)
        activeTimeouts.push(setTimeout(() => uiVisibility(Scenes.CybersecurityServices, true), 1000))
    }, 1000)
}

function toManagedServices() {

    clearUI()
    clearAllTimeouts()

    setTimeout(() => {
        scrollTo(document.documentElement.clientHeight * 1.2)
        currentDisplaying = Scenes.ManagedServices;
        moveCameraLeftRight(true)
        activeTimeouts.push(setTimeout(() => uiVisibility(Scenes.ManagedServices, true), 1000))
    }, 1000)
}

function toProfessionalServices() {

    clearUI()
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
            direction ? toManagedServices() : toOurOrganization();
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
    console.log('/solutions sceneListeners');
    document.addEventListener('/solutions', (e) => {
        console.log('/solutions');
        onSceneEnter()
    }, false);

    document.addEventListener('/solutions-stop', (e) => {
        console.log('/solutions-stop');
        onSceneLeave()
    }, false);
}

function onSceneLeave() {
    console.log("onSceneLeave")
    pointerWheelObserver = null;
    scene.onPointerObservable.remove(pointerWheelObserver);

    Bulb.removeAllFromScene();
}

async function onSceneEnter() {

    console.log("onSceneEnter")
    await Bulb.addAllToScene();
    bulbVisibility(false);

    if (!pointerWheelObserver)
        addPointerWhellObservable()

    // setTimeout(() => startSceneCameraAnim(), 1)
    warpTransition()

    cameraConfig()
    setTimeout(() => toSolutions(), 1000)
}

function clearUI() {
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

function bulbVisibility(visible) {
    scene.getNodeByID(names.solutions.bulb.dots).setEnabled(visible);
    scene.getNodeByID(names.solutions.bulb.body).setEnabled(visible);
    scene.getNodeByID(names.solutions.bulb.particles).setEnabled(visible);
    scene.getNodeByID(names.solutions.bulb.triangles).setEnabled(visible);
}


function toOurOrganization() {
    clearUI()
    uiVisibility("solutions-wrap", false)

    setTimeout(() => {
        bulbVisibility(false);
        history.push("/our-organization")
    }, 1000)

}