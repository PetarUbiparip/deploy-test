import '@babylonjs/loaders';
import { Animation, Vector3, HemisphericLight, PointerEventTypes, Color3} from "@babylonjs/core"
import { PlatonicShader} from "../util/Loading";
import SceneHook from "../hooks/SceneHook/SceneHook"



let scene;
let camera;
export const createOurOrganizationScene = async (s, c) => {
    console.log("createOurOrganizationScene")
    scene = s;
    camera = c;
    scene.clearColor = Color3.Black();



};
export const onSceneReady = async (s, c) => {
    console.log("createOurOrganizationScene")
    scene = s;
    camera = c;
    scene.clearColor = Color3.Black();



};
const onRender = (scene) => {

};

