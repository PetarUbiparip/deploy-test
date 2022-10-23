import '@babylonjs/loaders';
import { Animation, Vector3, HemisphericLight, PointerEventTypes, Color3} from "@babylonjs/core"
import { warpTransition, stopWarpTransition } from "./TransitionScene";
import { uiVisibility } from "../util/UIHelper.js";

let scene;
let camera;
export const createContactScene = async (s, c) => {
    console.log("createContactScene")
    scene = s;
    camera = c;
    scene.clearColor = Color3.Black();
    new HemisphericLight('HemiLight', new Vector3(0, 0, 0), scene);

    sceneListeners()

};


function sceneListeners() {
    console.log('/contact sceneListeners');
    document.addEventListener('/contact', (e) => {
        onSceneEnter()
    }, false);


    document.addEventListener('/contact-stop', (e) => {
        onSceneLeave()
    }, false);
}

function onSceneEnter() {
    console.log('/contact onSceneEnter');
    warpTransition();

    setTimeout(() => uiVisibility("contact", true), 3000)
}

function onSceneLeave() {
    console.log('/contact onSceneEnter');
    stopWarpTransition()
}