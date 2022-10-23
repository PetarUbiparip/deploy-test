import '@babylonjs/loaders';
import { Animation, Vector3, HemisphericLight, PointerEventTypes, Color3 } from "@babylonjs/core"
import { warpTransition, stopWarpTransition } from "./TransitionScene";
import { uiVisibility } from "../util/UIHelper.js";

let scene;
let camera;

export const createOurOrganizationScene = async (s, c) => {
    console.log("createOurOrganizationScene")
    scene = s;
    camera = c;
    scene.clearColor = Color3.Black();

    sceneListeners()

};

function sceneListeners() {
    console.log('/our-organization sceneListeners');
    document.addEventListener('/our-organization', (e) => {
        onSceneEnter()
    }, false);


    document.addEventListener('/our-organization-stop', (e) => {
        onSceneLeave()
    }, false);
}

function onSceneEnter() {
    console.log('/our-organization onSceneEnter');
    warpTransition();

    setTimeout(() => uiVisibility("our-organization", true), 3000)



    //todo planet load

}

function onSceneLeave() {
    console.log('/our-organization onSceneEnter');
    stopWarpTransition()
}
