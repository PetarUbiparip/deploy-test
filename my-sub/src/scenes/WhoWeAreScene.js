import { HemisphericLight, Vector3, Color3, Layer, AxesViewer, PointerEventTypes } from "@babylonjs/core"
import { Arrow, Compass, Chess } from "../util/Loading.js";
import { uiVisibility, scrollTo } from "../util/UIHelper.js";
import { changeChildrenVisibility, setGlow } from "../util/ModelUtil";
import { names } from "../util/Naming.js";
import { warpTransition } from "./TransitionScene";
import history from '../routes/history';

let scene;
let camera;
let animations;
let pointerWheelEventPaused = false;
let currentDisplaying;
let activeTimeouts = [];
let pointerWheelObserver;
let pointerCompassRotationObserver;
let compass

export const createWhoWeAreScene = async (s, c) => {
    sceneListeners()

    scene = s;
    camera = c
    scene.clearColor = Color3.Black();

    setGlow(2, 1024, 1000, scene)

    new HemisphericLight('HemiLight', new Vector3(0, 0, 0), scene);
};

async function toCompass() {
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
    scene.activeCamera = scene.cameras[1];
    animations.compass.play()

    activeTimeouts.push(setTimeout(() => {
        // const localAxes = new AxesViewer(scene, 1);
        scene.cameras[0].position = new Vector3(0.1, 0.2, 0.2);
        scene.cameras[0].target = new Vector3(0.1, 0, 0);
        scene.activeCamera = scene.cameras[0];
        compassVisibility(true);
    }, 3000))

    activeTimeouts.push(setTimeout(() => {
        uiVisibility(Scenes.Vision, true);
        uiVisibility("who-we-are", true)
        pointerWheelEventPaused = false;
    }, 4000))
    // activeTimeouts.push(setTimeout(() => switchCompassPointer(),6000))
}


async function toArrow() {
    scrollTo(document.documentElement.clientHeight * .6)
    pointerWheelEventPaused = true;
    console.log("toArrow")
    currentDisplaying = Scenes.Mission;
    uiVisibility(Scenes.Vision, false)
    uiVisibility(Scenes.Strategy, false)
    compassVisibility(false);
    chessVisibility(false);
    resetAnims();

    scene.activeCamera = scene.cameras[1];

    animations.arrow.start()
    arrowVisibility(true, 1000);

    activeTimeouts.push(setTimeout(() => {
        uiVisibility(Scenes.Mission, true);
        pointerWheelEventPaused = false;
    }, 4000));
}


async function toChess() {
    scrollTo(document.documentElement.clientHeight * 1.2)
    pointerWheelEventPaused = true;
    console.log("toChess")
    currentDisplaying = Scenes.Strategy;
    uiVisibility(Scenes.Mission, false)
    arrowVisibility(false);
    resetAnims();
    scene.activeCamera = scene.cameras[1];

    warpTransition();

    activeTimeouts.push(setTimeout(() => {
        animations.chess.play()
        chessVisibility(true);
    }, 2000));

    activeTimeouts.push(setTimeout(() => {
        // const localAxes = new AxesViewer(scene, 1);
        scene.cameras[0].position = new Vector3(.05, .07, .16);
        scene.cameras[0].target = new Vector3(.08, 0, -.08);
        scene.cameras[0].minZ = 0.01;
        scene.activeCamera = scene.cameras[0];

    }, 2500));
    activeTimeouts.push(setTimeout(() => {
        uiVisibility(Scenes.Strategy, true);
        pointerWheelEventPaused = false;

    }, 4500))
}

function toHome() {
    uiVisibility(Scenes.Strategy, false)
    uiVisibility("who-we-are", false)

    setTimeout(() => {

        resetAnims();
        scene.activeCamera = scene.cameras[1];
        warpTransition();
    }, 1000)
    setTimeout(() => history.push("/"), 4000)

}

function resetAnims() {
    animations.compass.stop()
    animations.compass.reset()
    animations.arrow.stop()
    animations.arrow.reset()
    animations.chess.stop()
    animations.chess.reset()
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

    // add or remove compass rotation listeners
    if (visible)
        addCompassRotationListeners()
    else
        removeCompassRotationListeners()

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
            direction ? toArrow() : toHome();
            break;
        default:
            toCompass()
    }
}

function addPointerWhellObservable() {
    console.log("who we are observable added")
    pointerWheelObserver = scene.onPointerObservable.add((pointerInfo) => {
        // console.log("who we are observable")

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
    console.log('/who-we-are sceneListeners');
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
    addPointerWhellObservable()

    Arrow.addAllToScene();
    Compass.addAllToScene();
    Chess.addAllToScene();

    animations = {
        arrow: scene.animationGroups[0],
        compass: scene.animationGroups[1],
        chess: scene.animationGroups[2],
    }

    scene.activeCamera = scene.cameras[1];

    // camera.attachControl(canvas, false)
    // camera.wheelPrecision = 100;
    camera.minZ = 0.1;
    camera.setTarget(Vector3.Zero())

    compass = {
        frame: scene.getNodeByID(names.whoWeAre.meshes.compass.frame),
        star: scene.getNodeByID(names.whoWeAre.meshes.compass.star),
        scala: scene.getNodeByID(names.whoWeAre.meshes.compass.scala),
    }

    arrowVisibility(false);
    compassVisibility(false);
    chessVisibility(false);

    // add emisive color to arrowScene
    scene.getMaterialByName("aiStandardSurface1").emissiveColor = new Color3(0, 0.2307665, 1)
    scene.getMaterialByName("aiStandardSurface3").emissiveColor = new Color3(0, 0.2307665, 1)

    setTimeout(() => toCompass(), 1)
}
function onSceneLeave() {

    scene.onPointerObservable.remove(pointerWheelObserver);
    console.log("who we are removed")

    Arrow.removeAllFromScene();
    Compass.removeAllFromScene();
    Chess.removeAllFromScene();

    clearAllTimeouts();
}

const Scenes = {
    Vision: "vision",
    Mission: "mission",
    Strategy: "strategy",
}




function addCompassRotationListeners() {
    console.log("addCompassRotationListeners")

    let currentPosition = { x: 0, y: 0 };
    let mouseClicked = false;

    pointerCompassRotationObserver = scene.onPointerObservable.add((pointerInfo) => {

        switch (pointerInfo.type) {
            case PointerEventTypes.POINTERDOWN:
                console.log("POINTERDOWN", pointerInfo.event)
                currentPosition.x = pointerInfo.event.clientX;
                mouseClicked = true;
                break;
            case PointerEventTypes.POINTERMOVE:

                if (!mouseClicked) {
                    return;
                }

                var dx = currentPosition.x - pointerInfo.event.clientX;
                let rotateY = compass.star.rotation.y - dx / 200;

                compass.frame.rotation = new Vector3(0, rotateY, 0)
                compass.star.rotation = new Vector3(0, rotateY, 0)
                compass.scala.rotation = new Vector3(0, rotateY, 0)

                currentPosition.x = pointerInfo.event.clientX;

                break;
            case PointerEventTypes.POINTERUP:
                console.log("POINTERUP")
                mouseClicked = false;
                break;
        }
    });
}

function removeCompassRotationListeners() {
    console.log("removeCompassRotationListeners")
    compass.frame.rotation = new Vector3(0, 0, 0);
    compass.star.rotation = new Vector3(0, 0, 0);
    compass.scala.rotation = new Vector3(0, 0, 0);

    scene.onPointerObservable.remove(pointerCompassRotationObserver);
}