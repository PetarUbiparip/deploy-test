import '@babylonjs/loaders';
import { Vector3, HemisphericLight, PointerEventTypes, Color3, Scene, ActionManager, ExecuteCodeAction, AdvancedDynamicTexture, GlowLayer, Space } from "@babylonjs/core"
import { Chess } from "../util/Loading";
import { names } from "../util/Naming.js";
import { uiVisibility, scrollTo, hideElement } from "../util/UIHelper.js";
import history from '../routes/history';

let scene;
let camera;
let canvas;
let king = {
    kingMesh: null,
    kingParticles: null,
    kingTriangles: null,
}
let kingClickEvent;
let kingOnHoverEvent;
let kingOutHoverEvent;
let actionManager;
let kingOnHoverGlow;
let pointerWheelObserver;
let currentDisplaying;
let activeTimeouts = [];

export const createBusinessConsultingScene = async (s, c) => {
    sceneListeners()
    console.log("createBusinessConsultingScene")
    scene = s;
    camera = c;
};

function cameraConfig() {
    var light = new HemisphericLight('HemiLight', new Vector3(0, 0.1, 0.1), scene);
    // let whoWeAreCamera = new ArcRotateCamera('default_camera', 0, 0, 0, new Vector3(0, 0, 0), this.whoWeAreScene);
    // let newCame


    // king down
    camera.setPosition(new Vector3(.15, .1, .15));
    camera.setTarget(new Vector3(0, .04, 0))
    // king right
    // camera.setPosition(new Vector3(.16, .06, .02));
    // camera.setTarget(new Vector3(0, .02, 0))

    canvas = scene.getEngine().getRenderingCanvas()
    // camera.attachControl(canvas, false)
    // camera.wheelPrecision = 1001;
    camera.minZ = 0.01;

}

function changeCameraSettings() {
    scene.fogStart = .1;
    scene.fogEnd = .2;
    camera.setPosition(new Vector3(0, .06, .15));
    camera.setTarget(new Vector3(0, .02, 0))
}

function chessVisibility(visible) {

    // king
    king.kingMesh = scene.getNodeByID(names.whoWeAre.meshes.chess.king.mesh);
    king.kingParticles = scene.getNodeByID(names.whoWeAre.meshes.chess.king.particles);
    king.kingTriangles = scene.getNodeByID(names.whoWeAre.meshes.chess.king.triangles);
    king.kingMesh.setEnabled(visible);
    king.kingParticles.setEnabled(visible);
    king.kingMesh.setEnabled(visible);


    // bishop
    scene.getNodeByID(names.whoWeAre.meshes.chess.bishop.mesh).setEnabled(false);
    scene.getNodeByID(names.whoWeAre.meshes.chess.bishop.particles).setEnabled(false);
    scene.getNodeByID(names.whoWeAre.meshes.chess.bishop.triangles).setEnabled(false);

    // pion
    scene.getNodeByID(names.whoWeAre.meshes.chess.pion.mesh).setEnabled(false);
    scene.getNodeByID(names.whoWeAre.meshes.chess.pion.particles).setEnabled(false);
    scene.getNodeByID(names.whoWeAre.meshes.chess.pion.triangles).setEnabled(false);

    // queen
    scene.getNodeByID(names.whoWeAre.meshes.chess.queen.mesh).setEnabled(false);
    scene.getNodeByID(names.whoWeAre.meshes.chess.queen.particles).setEnabled(false);
    scene.getNodeByID(names.whoWeAre.meshes.chess.queen.triangles).setEnabled(false);

    // rook
    scene.getNodeByID(names.whoWeAre.meshes.chess.rook.mesh).setEnabled(false);

    // table
    scene.getNodeByID(names.whoWeAre.meshes.chess.table.particles).setEnabled(visible)
}


function sceneListeners() {
    console.log('/business-consulting sceneListeners');
    document.addEventListener('/business-consulting', (e) => {
        // console.log(e);
        console.log("/business-consulting");
        onSceneEnter()
        // e.target matches elem
    }, false);


    document.addEventListener('/business-consulting-stop', (e) => {
        // console.log(e);
        console.log("/business-consulting-stop");
        onSceneLeave()
        // setTimeout(() => toCompass(),1)
        // e.target matches elem
    }, false);
}




async function onSceneEnter() {
    if (!pointerWheelObserver)
        addPointerWhellObservable()

    await Chess.addAllToScene();

    cameraConfig()
    // const localAxes = new AxesViewer(scene, 1);
    chessVisibility(true)

    setFog()

    scene.animationGroups[0].stop()
    scene.animationGroups[0].start(true, 1, 200, 480)
    // scene.animationGroups[0].goToFrame(480)

    setTimeout(() => toBusinessConsulting(), 1)
    console.log(scene);
}


function onSceneLeave() {
    // console.log(scene.onPointerObservable)
    // scene.onPointerObservable.remove(pointerWheelObserver);
    pointerWheelObserver = null;
    scene.onPointerObservable.remove(pointerWheelObserver);
    Chess.removeAllFromScene();
    removeKingHoverEvents();
    removeKingClickEvent();
    removeFog();
    clearAllTimeouts();
    // console.log(scene.onPointerObservable)
}



function toBusinessConsulting() {
    hideElement('scrollbar-wrapper')
    clearUI();
    uiVisibility(Scenes.BusinessConsulting, true)
    moveKingLeft()
    actionManager = new ActionManager(scene);
    king.kingMesh.actionManager = actionManager;


    kingOnHoverGlow = new GlowLayer("kingOnHoverGlow", scene, {
        mainTextureFixedSize: 1000,
        blurKernelSize: 50
    });
    kingOnHoverGlow.addIncludedOnlyMesh(king.kingMesh)
    kingOnHoverGlow.addIncludedOnlyMesh(king.kingParticles)
    kingOnHoverGlow.addIncludedOnlyMesh(king.kingTriangles)

    addKingClickEvent();
    addKingHoverEvents();

}

function toProjects() {
    clearAllTimeouts()
    scrollTo(0)
    clearUI();

    setTimeout(() => {
        uiVisibility('scrollbar-wrapper', true);
        changeCameraSettings();
        uiVisibility(Scenes.Projects, true)
        currentDisplaying = Scenes.Projects;
        moveKingRight()

    }, 1000)
}

function toProjectManagment() {
    clearAllTimeouts()
    activeTimeouts.push(setTimeout(() => moveKingLeft(), 1000))

    scrollTo(document.documentElement.clientHeight * .6)
    clearUI();
    activeTimeouts.push(setTimeout(() => uiVisibility(Scenes.ProjectManagment, true), 2000))
    currentDisplaying = Scenes.ProjectManagment;

}

function toChangeManagment() {
    clearAllTimeouts()
    activeTimeouts.push(setTimeout(() => moveKingRight(), 1000))

    scrollTo(document.documentElement.clientHeight * 1.2)
    clearUI();
    activeTimeouts.push(setTimeout(() => uiVisibility(Scenes.ChangeManagment, true), 2000))
    currentDisplaying = Scenes.ChangeManagment;

}

function toConsulting() {
    clearAllTimeouts()
    activeTimeouts.push(setTimeout(() => moveKingLeft(), 1000))

    scrollTo(document.documentElement.clientHeight * 1.8)
    clearUI();
    activeTimeouts.push(setTimeout(() => uiVisibility(Scenes.Consulting, true), 2000))
    currentDisplaying = Scenes.Consulting;
}

function toVisionCreation() {
    clearAllTimeouts()
    activeTimeouts.push(setTimeout(() => moveKingRight(), 1000))

    scrollTo(document.documentElement.clientHeight * 2.4)
    clearUI();
    activeTimeouts.push(setTimeout(() => uiVisibility(Scenes.VisionCreation, true), 2000))
    currentDisplaying = Scenes.VisionCreation;

}

function toStrategyCreation() {
    clearAllTimeouts()
    activeTimeouts.push(setTimeout(() => moveKingLeft(), 1000))

    scrollTo(document.documentElement.clientHeight * 3.2)
    clearUI();
    activeTimeouts.push(setTimeout(() => uiVisibility(Scenes.StrategyCreation, true), 2000))
    currentDisplaying = Scenes.StrategyCreation;

}

function moveKingRight() {
    console.log(king)
    if (king.kingMesh.position.x > 0)
        return

    let newPosition = -king.kingMesh.position.x;
    king.kingParticles.position.x = newPosition * 2;
    king.kingTriangles.position.x = newPosition * 2;
    king.kingMesh.position.x = newPosition;
}

function moveKingLeft() {
    if (king.kingMesh.position.x < 0)
        return

    console.log(king)
    king.kingParticles.position.x = 0;
    king.kingTriangles.position.x = 0;
    king.kingMesh.position.x = -king.kingMesh.position.x;
}

function clearUI() {
    uiVisibility(Scenes.BusinessConsulting, false)
    uiVisibility(Scenes.Projects, false)
    uiVisibility(Scenes.ProjectManagment, false)
    uiVisibility(Scenes.ChangeManagment, false)
    uiVisibility(Scenes.Consulting, false)
    uiVisibility(Scenes.VisionCreation, false)
    uiVisibility(Scenes.StrategyCreation, false)
}

const Scenes = {
    BusinessConsulting: "business-consulting",
    Projects: "projects",
    ProjectManagment: "project-managment",
    ChangeManagment: "change-managment",
    Consulting: "consulting",
    VisionCreation: "vision-creation",
    StrategyCreation: "strategy-creation",
}

function addKingClickEvent() {
    kingClickEvent = actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickDownTrigger, function (ev) {
        toProjects()
        removeKingHoverEvents();
        removeKingClickEvent();
    }));
}

function removeKingClickEvent() {
    actionManager.unregisterAction(kingClickEvent);
}

function addKingHoverEvents() {
    kingOnHoverEvent = actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function (ev) {
        kingOnHoverGlow.intensity = 5;
        document.body.style.cursor = 'pointer'
    }));
    kingOutHoverEvent = actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, function (ev) {
        kingOnHoverGlow.intensity = 1;
        document.body.style.cursor = ''
    }));
}

function removeKingHoverEvents() {
    kingOnHoverGlow.intensity = 1;
    document.body.style.cursor = ''
    actionManager.unregisterAction(kingOnHoverEvent)
    actionManager.unregisterAction(kingOutHoverEvent)
}

function setFog() {
    scene.fogEnabled = true;
    scene.fogDensity = 5;
    scene.fogMode = Scene.FOGMODE_LINEAR;
    scene.fogStart = .2;
    scene.fogEnd = .3;
    // scene.fogStart = .1;
    // scene.fogEnd = .2;
    scene.fogColor = Color3.Black();
}

function removeFog() {
    scene.fogEnabled = false;
}

function addPointerWhellObservable() {
    pointerWheelObserver = scene.onPointerObservable.add((pointerInfo) => {
        console.log("pointerWheelObserver");
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
function changeScene(direction) {
    switch (currentDisplaying) {
        case Scenes.Projects:
            if (!direction) toProjectManagment();
            break;
        case Scenes.ProjectManagment:
            direction ? toProjects() : toChangeManagment();
            break;
        case Scenes.ChangeManagment:
            direction ? toProjectManagment() : toConsulting();
            break;
        case Scenes.Consulting:
            direction ? toChangeManagment() : toVisionCreation();
            break;
        case Scenes.VisionCreation:
            direction ? toConsulting() : toStrategyCreation();
            break;
        case Scenes.StrategyCreation:
            direction ? toVisionCreation() : toOurOrganization();
            break;
        // default:
        //     toProjectManagment();
        //     break;
    }
}


function clearAllTimeouts() {
    activeTimeouts.forEach((timeout) =>
        clearTimeout(timeout)
    )
    console.log("cleared")
    activeTimeouts = [];
}

function toOurOrganization() {
    clearUI()

    uiVisibility("business-consulting", false)

    setTimeout(() => {
        chessVisibility(false);
        history.push("/our-organization")
    }, 1000)

}
