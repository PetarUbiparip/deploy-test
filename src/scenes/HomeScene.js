import '@babylonjs/loaders';
import { Vector3, HemisphericLight, Color3, Texture, GlowLayer, AxesViewer, MeshBuilder, Space, Axis } from "@babylonjs/core"
import { Logo, Platonic, Planet } from "../util/Loading.js";
import { setGlow } from "../util/ModelUtil";
import { names } from "../util/Naming.js";

let scene;
let camera;
let canvas;
let animations;
let activeMesh;
let activeMouseListeners = [];

export const createHomeScene = async (s, c) => {
    scene = s;
    camera = c;
    scene.clearColor = Color3.Black();

    addSceneListeners();
    addMouseListeners();

    cameraConfig()

    await Logo.addAllToScene();
    await Platonic.addAllToScene();
    await Planet.addAllToScene();

    // fix emissiveColor for logo material
    scene.materials[0].emissiveColor = new Color3(0.0983946249, 0.306292057, 0.6389262)


    // fix scale for planet and platonic
    scene.getNodeByID(names.home.meshes.planet).scaling = new Vector3(.7, .7, .7);
    scene.getNodeByID(names.home.meshes.platonic).scaling = new Vector3(1.5, 1.5, 1.5);

    animations = {
        logo: scene.animationGroups[0],
        platonic: scene.animationGroups[1],
        planet: scene.animationGroups[2],
    }

    // set glow
    setGlow(1, 1000, 50, scene)
    // const localAxes = new AxesViewer(scene, 1);

    resetLogo()
    resetPlatonic()
    resetPlanet()

    toLogo();
};


function cameraConfig() {
    var light = new HemisphericLight('HemiLight', new Vector3(0, 0, 1), scene);
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
    scene.getNodeByID(names.home.meshes.logo).rotation = new Vector3(0, -.25, 0)
}

function toLogo() {
    activeMesh = scene.getNodeByID(names.home.meshes.logo)
    animations.logo.play()
    logoVisibility(true);
}

function leaveLogo() {
    animations.logo.start(false, 3, 240, 0)
}

function resetPlatonic() {
    platonicVisibility(false);
    resetPlatonicAnim();
    scene.getNodeByID(names.home.meshes.platonic).rotation = new Vector3(0, -.25, 0)
}

function toPlatonic() {
    activeMesh = scene.getNodeByID(names.home.meshes.platonic)
    animations.platonic.play()
    platonicVisibility(true);
}

function leavePlatonic() {
    animations.platonic.start(false, 3, 290, 0)
}

function resetPlanet() {
    planetVisibility(false);
    resetPlanetAnim();
    scene.getNodeByID(names.home.meshes.planet).rotation = new Vector3(0, -.25, 0)
}

function toPlanet() {
    activeMesh = scene.getNodeByID(names.home.meshes.planet)
    animations.planet.play()
    planetVisibility(true);
}

function leavePlanet() {
    animations.planet.start(false, 3, 237, 0)
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
    scene.getNodeByID(names.home.meshes.logo).setEnabled(visible)
}

function platonicVisibility(visible) {
    scene.getNodeByID(names.home.meshes.platonic).setEnabled(visible)
}

function planetVisibility(visible) {
    scene.getNodeByID(names.home.meshes.planet).setEnabled(visible)
}

function addMouseListeners() {
    console.log("addMouseListeners")
    var currentPosition = { x: 0, y: 0 };
    var clicked = false;
    canvas = scene.getEngine().getRenderingCanvas()

    activeMouseListeners.push(canvas.addEventListener("pointerdown", function (evt) {
        console.log("pointerdown")

        currentPosition.x = evt.clientX;
        currentPosition.y = evt.clientY;
        clicked = true;
    }));

    activeMouseListeners.push(canvas.addEventListener("pointermove", function (evt) {
        // console.log("pointermove")
        if (!clicked) {
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
        clicked = false;
    }));

}

function clearMouseListeners() {
    console.log("clearMouseListeners")
    activeMouseListeners.forEach((listener) => canvas.remove(listener))
    activeMouseListeners = []

}

function addSceneListeners() {
    document.addEventListener('/', (e) => {
        console.log('scene start : /');
        onSceneEnter()
    }, false);


    document.addEventListener('/-stop', (e) => {
        console.log("scene stop /-stop");
        onSceneLeave()
    }, false);
}


function onSceneEnter() {
    addMouseListeners();
}

function onSceneLeave() {
    clearMouseListeners()
}
