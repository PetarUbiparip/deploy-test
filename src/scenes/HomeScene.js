import '@babylonjs/loaders';
import { Vector3, HemisphericLight, Color3, Texture, BoundingInfo, AxesViewer, ExecuteCodeAction, ActionManager, Layer } from "@babylonjs/core"
import { Logo, Platonic, Planet, keepAssets } from "../util/Loading.js";
import { setGlow } from "../util/ModelUtil";
import { names } from "../util/Naming.js";

let scene;
let camera;
let canvas;
let animations;
let activeMesh;
let activeMouseListeners = [];
let meshes = {
    logo: null,
    platonic: null,
    planet: null,
}
let hoverEvents = {
    logo: null,
    platonic: null,
    planet: null,
}
var mouseClicked = false;

export const createHomeScene = async (s, c) => {
    scene = s;
    camera = c;
    scene.clearColor = Color3.Black();
    // let background = new Layer("", "./textures/Home/png/tempBackground.png", scene);


    addSceneListeners();

    setGlow(2, 1024, 1000, scene)
    cameraConfig()
};


function cameraConfig() {
    new HemisphericLight('HemiLight', new Vector3(0, 0, 1), scene);
    // const canvas = scene.getEngine().getRenderingCanvas()
    // camera.attachControl(canvas, false)
    // camera.wheelPrecision = 1000;
    camera.minZ = 0.1;
}

export function onMouseEnterButton(button, prevSelectedButton) {
    console.log('onMouseEnterButton', button)

    const revert = (prevSelectedButton > button) ? true : false;

    switch (button) {
        case 0:
            console.log('onMouseEnterButton case 1', button)

            if (prevSelectedButton === 1) {
                console.log("1")
                leavePlatonic()
                let leavePlatonicAnimObservable = animations.platonic.onAnimationEndObservable.add(() => {
                    animations.platonic.onAnimationEndObservable.remove(leavePlatonicAnimObservable)
                    resetPlatonic()
                    toLogo()
                    console.log("leavePlatonicAnimObservable end")
                });
            } else if (prevSelectedButton === 2) {
                console.log("2")
                leavePlanet()
                let leavePlanetAnimObservable = animations.planet.onAnimationEndObservable.add(() => {
                    animations.planet.onAnimationEndObservable.remove(leavePlanetAnimObservable)
                    resetPlanet()
                    toLogo()
                    console.log("leavePlanetAnimObservable end")
                });
            }

            break;
        case 1:

            console.log('onMouseEnterButton case 2', button)


            if (prevSelectedButton === 0) {
                console.log("0")
                leaveLogo()
                let leaveLogoAnimObservable = animations.logo.onAnimationEndObservable.add(() => {
                    animations.logo.onAnimationEndObservable.remove(leaveLogoAnimObservable)
                    resetLogo()
                    toPlatonic()
                    console.log("leaveLogoAnimObservable end")
                });
            } else if (prevSelectedButton === 2) {
                console.log("2")
                leavePlanet()
                let leavePlanetAnimObservable = animations.planet.onAnimationEndObservable.add(() => {
                    animations.planet.onAnimationEndObservable.remove(leavePlanetAnimObservable)
                    resetPlanet()
                    toPlatonic()
                    console.log("leavePlanetAnimObservable end")
                });
            }
            break;
        case 2:

            if (prevSelectedButton === 0) {
                console.log("0")
                leaveLogo()
                let leaveLogoAnimObservable = animations.logo.onAnimationEndObservable.add(() => {
                    animations.logo.onAnimationEndObservable.remove(leaveLogoAnimObservable)
                    resetLogo()
                    toPlanet()
                    console.log("leaveLogoAnimObservable end")
                });
            } else if (prevSelectedButton === 1) {
                console.log("1")
                leavePlatonic()
                let leavePlatonicAnimObservable = animations.platonic.onAnimationEndObservable.add(() => {
                    animations.platonic.onAnimationEndObservable.remove(leavePlatonicAnimObservable)
                    resetPlatonic()
                    toPlanet()
                    console.log("leavePlatonicAnimObservable end")
                });
            }
            console.log('onMouseEnterButton case 3', button)
            break;
    }
}

function resetLogo() {
    logoVisibility(false);
    resetLogoAnim();
    meshes.logo.rotation = new Vector3(0, -.25, 0)
}

function toLogo() {
    activeMesh = meshes.logo
    animations.logo.play()
    logoVisibility(true);
}

function leaveLogo() {
    animations.logo.start(false, 3, 240, 0)
}

function logoHoverAnim() {
    if (animations.logo.isPlaying || mouseClicked) 
        return
    
    animations.logo.start(false, 3, 240, 200)

    let logoHoverAnimObservable = animations.logo.onAnimationGroupEndObservable.add(() => {
        // animations.logo.stop();
        animations.logo.start(false, 3, 200, 240)
        animations.logo.onAnimationGroupEndObservable.remove(logoHoverAnimObservable)
    });
}

function resetPlatonic() {
    platonicVisibility(false);
    resetPlatonicAnim();
    meshes.platonic.rotation = new Vector3(0, -.25, 0)
}

function toPlatonic() {
    activeMesh = meshes.platonic
    animations.platonic.play()
    platonicVisibility(true);
}

function leavePlatonic() {
    animations.platonic.start(false, 3, 290, 0)
}
function platonicHoverAnim() {

    if (animations.platonic.isPlaying || mouseClicked) 
        return
    
    animations.platonic.start(false, 3, 290, 220)

    let platonicHoverAnimObservable = animations.platonic.onAnimationGroupEndObservable.add(() => {
        // animations.platonic.stop();
        animations.platonic.start(false, 1, 220, 290)
        animations.platonic.onAnimationGroupEndObservable.remove(platonicHoverAnimObservable)
    });
}


function resetPlanet() {
    planetVisibility(false);
    resetPlanetAnim();
    meshes.planet.rotation = new Vector3(0, -.25, 0)
}

function toPlanet() {
    activeMesh = meshes.planet
    animations.planet.play()
    planetVisibility(true);
}

function leavePlanet() {
    animations.planet.start(false, 3, 237, 0)
}


function planetHoverAnim() {

    if (animations.planet.isPlaying || mouseClicked) 
        return
    
    animations.planet.start(false, 3, 237, 150)

    let planetHoverAnimObservable = animations.planet.onAnimationGroupEndObservable.add(() => {
        // animations.planet.stop();
        animations.planet.start(false, 3, 150, 237)
        animations.planet.onAnimationGroupEndObservable.remove(planetHoverAnimObservable)
    });
}
// function resetAnims() {
//     console.log(animations)
//     animations.logo.stop()
//     animations.logo.reset()
//     animations.platonic.stop()
//     animations.platonic.reset()
//     animations.planet.stop()
//     animations.planet.reset()
// }

function resetLogoAnim() {
    animations.logo.stop()
    animations.logo.reset()
}

function resetPlatonicAnim() {
    animations.platonic.stop()
    animations.platonic.reset()
}

function resetPlanetAnim() {
    animations.planet.stop()
    animations.planet.reset()
}

function logoVisibility(visible) {
    meshes.logo.setEnabled(visible)
}

function platonicVisibility(visible) {
    meshes.platonic.setEnabled(visible)
}

function planetVisibility(visible) {
    meshes.planet.setEnabled(visible)
}

function addMouseListeners() {
    console.log("addMouseListeners")
    var currentPosition = { x: 0, y: 0 };
    mouseClicked = false;
    canvas = scene.getEngine().getRenderingCanvas()

    activeMouseListeners.push(canvas.addEventListener("pointerdown", function (evt) {
        console.log("pointerdown")

        currentPosition.x = evt.clientX;
        currentPosition.y = evt.clientY;
        mouseClicked = true;
    }));

    activeMouseListeners.push(canvas.addEventListener("pointermove", function (evt) {
        // console.log("pointermove")
        if (!mouseClicked) {
            return;
        }

        var dx = currentPosition.x - evt.clientX;
        var dy = evt.clientY - currentPosition.y;

        let maxRotate = Math.PI / 6;

        let rotateX = activeMesh.rotation.x + dy / 200;
        let rotateY = activeMesh.rotation.y - dx / 200;

        if (activeMesh.name !== names.home.meshes.planet) {
            if (maxRotate < rotateX)
                rotateX = maxRotate
            if (-maxRotate > rotateX)
                rotateX = -maxRotate

            if (maxRotate < rotateY)
                rotateY = maxRotate
            if (-maxRotate > rotateY)
                rotateY = -maxRotate
        }

        activeMesh.rotation = new Vector3(rotateX, rotateY, 0)

        currentPosition.x = evt.clientX;
        currentPosition.y = evt.clientY;
    }));

    activeMouseListeners.push(canvas.addEventListener("pointerup", function (evt) {
        console.log("pointerup")
        mouseClicked = false;
    }));

}

function clearMouseListeners() {
    console.log("clearMouseListeners")
    activeMouseListeners.forEach((listener) => canvas.remove(listener))
    activeMouseListeners = []

}

function addSceneListeners() {
    console.log('/ sceneListeners');
    document.addEventListener('/', (e) => {
        console.log('scene start : /');
        onSceneEnter()
    }, false);


    document.addEventListener('/-stop', (e) => {
        console.log("scene stop /-stop");
        onSceneLeave()
    }, false);
}


async function onSceneEnter() {
    addMouseListeners();

    await Logo.addAllToScene();
    await Platonic.addAllToScene();
    await Planet.addAllToScene();

    setMeshes();

    // planetViewOptimization()

    // fix emissiveColor for logo material
    scene.materials[0].emissiveColor = new Color3(0.0983946249, 0.306292057, 0.6389262)


    // fix scale for planet and platonic
    meshes.planet.scaling = new Vector3(.7, .7, .7);
    meshes.platonic.scaling = new Vector3(1.5, 1.5, 1.5);

    animations = {
        logo: scene.animationGroups[0],
        platonic: scene.animationGroups[1],
        planet: scene.animationGroups[2],
    }


    resetLogo()
    resetPlatonic()
    resetPlanet()

    toLogo();


    meshes.logo._parentNode.actionManager = new ActionManager(scene);
    meshes.logo._parentNode.actionManager.isRecursive = true;
    meshes.platonic._parentNode.actionManager = new ActionManager(scene);
    meshes.platonic._parentNode.actionManager.isRecursive = true;
    meshes.planet._parentNode.actionManager = new ActionManager(scene);
    meshes.planet._parentNode.actionManager.isRecursive = true;

    // addHoverEvents();

}

function onSceneLeave() {
    clearMouseListeners()
    removeHoverEvents()
    Logo.removeAllFromScene();
    Platonic.removeAllFromScene();
    Planet.removeAllFromScene();
}



// /// 16-19 max
// function planetViewOptimization() {
//     console.log(scene)
//     console.log(scene.getNodeByID(names.home.meshes.planet))

//     scene.getNodeByID(names.home.meshes.logo).freezeWorldMatrix();
//     scene.getNodeByID(names.home.meshes.platonic).freezeWorldMatrix();

//     scene.getAnimationRatio();
//     scene.blockMaterialDirtyMechanism = true;
//     scene.skipPointerMovePicking = true
//     scene.getNodeByID(names.home.meshes.planet).freezeWorldMatrix();
//     scene.getNodeByID(names.home.meshes.planet).doNotSyncBoundingInfo = true;
//     // scene.getNodeByID(names.home.meshes.planet).convertToUnIndexedMesh();


//     // scene.freezeActiveMeshes();
//     scene.materials.forEach((material) => {
//         material.freeze();
//     })


// }

function setMeshes() {
    meshes.logo = scene.getNodeByID(names.home.meshes.logo);
    meshes.platonic = scene.getNodeByID(names.home.meshes.platonic);
    meshes.planet = scene.getNodeByID(names.home.meshes.planet);

    // meshes.planet._parentNode.setBoundingInfo(totalBoundingInfo( meshes.planet.getChildren()));
    // meshes.planet._parentNode.showBoundingBox =true;  

}
var totalBoundingInfo = function(meshes){
    var boundingInfo = meshes[0].getBoundingInfo();
    var min = boundingInfo.minimum.add(meshes[0].position);
    var max = boundingInfo.maximum.add(meshes[0].position);
    for(var i=1; i<meshes.length; i++){
        boundingInfo = meshes[i].getBoundingInfo();
        min = Vector3.Minimize(min, boundingInfo.minimum.add(meshes[i].position));
        max = Vector3.Maximize(max, boundingInfo.maximum.add(meshes[i].position));
    }
    return new BoundingInfo(min, max);
}
function addHoverEvents() {
    console.log("added addHoverEvents")
    hoverEvents.logo = meshes.logo._parentNode.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function (ev) {
        console.log("logo hover")
        logoHoverAnim()
    }));

    hoverEvents.platonic = meshes.platonic._parentNode.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function (ev) {
        console.log("platonic hover")
        platonicHoverAnim()
    }));

    hoverEvents.planet = meshes.planet._parentNode.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function (ev) {
        console.log("planet hover")
        planetHoverAnim()
    }));
}

function removeHoverEvents() {
    console.log("remove removeHoverEvents")
    meshes.logo._parentNode.actionManager.registerAction(hoverEvents.logo);
    meshes.platonic._parentNode.actionManager.registerAction(hoverEvents.platonic);
    meshes.planet._parentNode.actionManager.registerAction(hoverEvents.planet);
}