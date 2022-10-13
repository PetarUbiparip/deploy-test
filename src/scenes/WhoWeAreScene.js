import { HemisphericLight, Vector3, Color3, GlowLayer, AxesViewer, PointerEventTypes } from "@babylonjs/core"
import { Warp, Arrow, Compass, Chess } from "../util/Loading.js";
import { uiVisibility } from "../util/UIHelper.js";
import { changeChildrenVisibility } from "../util/ModelUtil";
import { names } from "../util/Naming.js";

let scene;
let camera;
let animations;
let pointerWheelEventPaused = false;
let currentDisplaying;
let activeTimeouts = [];
let pointerWheelObserver;

export const createWhoWeAreScene = async (s, c) => {
    sceneListeners()

    scene = s;
    camera = c
    scene.clearColor = Color3.Black();

    var light = new HemisphericLight('HemiLight', new Vector3(0, 0, 0), scene);
    const canvas = scene.getEngine().getRenderingCanvas()

    await Warp.addAllToScene();
    await Arrow.addAllToScene();
    await Compass.addAllToScene();
    await Chess.addAllToScene();

    animations = {
        warp: scene.animationGroups[0],
        arrow: scene.animationGroups[1],
        compass: scene.animationGroups[2],
        chess: scene.animationGroups[3],
    }

    resetAnims();

    scene.activeCamera = scene.cameras[2];

    camera.attachControl(canvas, false)
    camera.wheelPrecision = 100;
    camera.minZ = 0.1;
    camera.setTarget(Vector3.Zero())


    // console.log(scene)
    // console.log(scene.meshes)
    // console.log(scene.animationGroups)

    warpVisibility(false);
    arrowVisibility(false);
    compassVisibility(false);
    chessVisibility(false);

    // set glow
    var glow = new GlowLayer("glow", scene);
    glow.intensity = 2;

};

export async function toCompass() {
    clearAllTimeouts()

    scrollTo(0)
    pointerWheelEventPaused = true;
    console.log("toCompass")
    currentDisplaying = Scenes.Vision;
    uiVisibility(Scenes.Mission, false)
    arrowVisibility(false);
    compassVisibility(false);
    warpTransition();
    resetAnims();
    scene.activeCamera = scene.cameras[2];
    animations.compass.play()

    activeTimeouts.push(setTimeout(() => {
        // const localAxes = new AxesViewer(scene, 1);
        animations.warp.stop()
        scene.cameras[0].position = new Vector3(0.1, 0.2, 0.2);
        scene.cameras[0].target = new Vector3(0.1, 0, 0);
        scene.activeCamera = scene.cameras[0];
        compassVisibility(true);
    }, 5000))

    activeTimeouts.push(setTimeout(() => {
        uiVisibility(Scenes.Vision, true);
        pointerWheelEventPaused = false;
    }, 6000))
    // activeTimeouts.push(setTimeout(() => switchCompassPointer(),6000))
}


export async function toArrow() {
    scrollTo(document.documentElement.clientHeight * .6)
    pointerWheelEventPaused = true;
    console.log("toArrow")
    currentDisplaying = Scenes.Mission;
    uiVisibility(Scenes.Vision, false)
    uiVisibility(Scenes.Strategy, false)
    compassVisibility(false);
    chessVisibility(false);
    resetAnims();

    scene.activeCamera = scene.cameras[2];

    warpTransition();

    activeTimeouts.push(setTimeout(() => {
        animations.arrow.start()
        arrowVisibility(true, 1500);
    }, 2500));

    activeTimeouts.push(setTimeout(() => {
        uiVisibility(Scenes.Mission, true);
        pointerWheelEventPaused = false;
    }, 6000));
}


export async function toChess() {
    scrollTo(document.documentElement.clientHeight * 1.2)
    pointerWheelEventPaused = true;
    console.log("toChess")
    currentDisplaying = Scenes.Strategy;
    uiVisibility(Scenes.Mission, false)
    arrowVisibility(false);
    resetAnims();
    scene.activeCamera = scene.cameras[2];

    warpTransition();

    activeTimeouts.push(setTimeout(() => {
        animations.chess.play()
        chessVisibility(true);
    }, 4000));

    activeTimeouts.push(setTimeout(() => {
        // const localAxes = new AxesViewer(scene, 1);
        scene.cameras[0].position = new Vector3(.05, .07, .16);
        scene.cameras[0].target = new Vector3(.08, 0, -.08);
        scene.cameras[0].minZ = 0.01;
        scene.activeCamera = scene.cameras[0];

    }, 4500));
    activeTimeouts.push(setTimeout(() => {
        uiVisibility(Scenes.Strategy, true);
        pointerWheelEventPaused = false;
    }, 6500))
}

function resetAnims() {
    animations.compass.stop()
    animations.compass.reset()
    animations.arrow.stop()
    animations.arrow.reset()
    animations.chess.stop()
    animations.chess.reset()
}

async function warpTransition() {
    warpVisibility(true, 2000);
    animations.warp.play(true);

    setTimeout(() => {
        warpVisibility(false, 2000);
    }, 3000);

    setTimeout(() => {
        animations.warp.stop();
    }, 5000);
}

export async function startArrowAnimShort() {

    // animations.arrow.goToFrame(400);
    // animations.arrow.start(true,  1, 400,  300 )
}

function arrowVisibility(visible, duration) {
    changeChildrenVisibility(scene.getNodeByID(names.whoWeAre.meshes.arrow.arrow)._children.entries(), visible, duration);
    changeChildrenVisibility(scene.getNodeByID(names.whoWeAre.meshes.arrow.target)._children.entries(), visible, duration);
    changeChildrenVisibility(scene.getNodeByID(names.whoWeAre.meshes.arrow.warp)._children.entries(), visible, duration);
}

function compassVisibility(visible) {
    scene.getNodeByID(names.whoWeAre.meshes.compass.frame).setEnabled(visible);
    scene.getNodeByID(names.whoWeAre.meshes.compass.star).setEnabled(visible);
    scene.getNodeByID(names.whoWeAre.meshes.compass.pointerStatic).setEnabled(visible);
    scene.getNodeByID(names.whoWeAre.meshes.compass.scala).setEnabled(visible);
    
    
    // always false
    scene.getNodeByID(names.whoWeAre.meshes.compass.pointerAnimated).setEnabled(false);
}

function switchCompassPointer() {
    console.log("switchCompassPointer")
    scene.getNodeByID(names.whoWeAre.meshes.chess.king.pointerAnimated).setEnabled(true);
    scene.getNodeByID(names.whoWeAre.meshes.chess.king.pointerStatic).setEnabled(false);
}

function chessVisibility(visible) {

    // king
    scene.getNodeByID(names.whoWeAre.meshes.chess.king.mesh).setEnabled(visible);
    scene.getNodeByID(names.whoWeAre.meshes.chess.king.particles).setEnabled(visible);
    scene.getNodeByID(names.whoWeAre.meshes.chess.king.triangles).setEnabled(visible);


    // bishop
    scene.getNodeByID(names.whoWeAre.meshes.chess.bishop.mesh).setEnabled(visible);
    scene.getNodeByID(names.whoWeAre.meshes.chess.bishop.mesh).position = new Vector3(0.04, 0, 0.)
    scene.getNodeByID(names.whoWeAre.meshes.chess.bishop.particles).setEnabled(visible);
    scene.getNodeByID(names.whoWeAre.meshes.chess.bishop.triangles).setEnabled(visible);

    // pion
    scene.getNodeByID(names.whoWeAre.meshes.chess.pion.mesh).setEnabled(visible);
    scene.getNodeByID(names.whoWeAre.meshes.chess.pion.mesh).position = new Vector3(0.017, 0, -0.047)
    scene.getNodeByID(names.whoWeAre.meshes.chess.pion.particles).setEnabled(visible);
    scene.getNodeByID(names.whoWeAre.meshes.chess.pion.triangles).setEnabled(visible);

    // queen
    scene.getNodeByID(names.whoWeAre.meshes.chess.queen.mesh).setEnabled(visible);
    scene.getNodeByID(names.whoWeAre.meshes.chess.queen.particles).setEnabled(visible);
    scene.getNodeByID(names.whoWeAre.meshes.chess.queen.triangles).setEnabled(visible);

    // rook
    scene.getNodeByID(names.whoWeAre.meshes.chess.rook.mesh).setEnabled(visible);

    // table
    scene.getNodeByID(names.whoWeAre.meshes.chess.table.particles).setEnabled(visible)
}

function warpVisibility(visible, duration) {
    changeChildrenVisibility(scene.getNodeByID(names.whoWeAre.meshes.warpLoop)._children.entries(), visible, duration)
}


function clearAllTimeouts() {
    activeTimeouts.forEach((timeout) =>
        clearTimeout(timeout)
    )
}

function changeScene(direction) {
    console.log("changeScene")

    console.log(currentDisplaying)
    switch (currentDisplaying) {
        case Scenes.Vision:
            console.log("Vision")
            if (!direction) toArrow();
            break;
        case Scenes.Mission:
            console.log("Mission")
            direction ? toCompass() : toChess();
            break;
        case Scenes.Strategy:
            console.log("Strategy")
            if (direction) toArrow();
            break;
        default:
            toCompass()
    }
}

// function uiVisibility(elementId, visible) {

//     const uiElement = document.getElementById(elementId);
//     if (visible) {
//         uiElement.style.visibility = 'visible';
//         uiElement.style.opacity = 1;
//     } else {
//         uiElement.style.visibility = 'hidden';
//         uiElement.style.opacity = 0;
//         uiElement.style.transition = "visibility 1s, opacity 1s linear";
//     }
// }


function addPointerWhellObservable() {
    console.log("who we are observable added")
    pointerWheelObserver = scene.onPointerObservable.add((pointerInfo) => {
        console.log("who we are observable")

        if (pointerWheelEventPaused) {
            return;
        }

        switch (pointerInfo.type) {
            case PointerEventTypes.POINTERWHEEL:
                if (pointerInfo.event.wheelDelta > 0) {
                    console.log("UP");
                    changeScene(true);
                } else {
                    changeScene(false);
                    console.log("DOWN");
                }
                break;
        }
    });
}

function sceneListeners() {

    document.addEventListener('/who-we-are', (e) => {
        // console.log(e);
        // console.log("/who-we-are");
        onSceneEnter()
        // e.target matches elem
    }, false);


    document.addEventListener('/who-we-are-stop', (e) => {
        // console.log(e);
        // console.log("/who-we-are-stop");
        onSceneLeave()
        // setTimeout(() => toCompass(),1)
        // e.target matches elem
    }, false);
}




function onSceneEnter() {
    setTimeout(() => toCompass(), 1)
    addPointerWhellObservable()

}
function onSceneLeave() {
    // console.log(scene.onPointerObservable)
    scene.onPointerObservable.remove(pointerWheelObserver);
    // console.log(scene.onPointerObservable)
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
    Vision: "vision",
    Mission: "mission",
    Strategy: "strategy",
}
