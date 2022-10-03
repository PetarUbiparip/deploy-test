import '@babylonjs/loaders';
import { Animation, Vector3, HemisphericLight, PointerEventTypes, Color3} from "@babylonjs/core"
import { PlatonicShader} from "../util/Loading";

let scene;
let camera;
export const createContactScene = async (s, c) => {
    console.log("createContactScene")
    scene = s;
    camera = c;
    scene.clearColor = Color3.Red();



};