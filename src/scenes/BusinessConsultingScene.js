import '@babylonjs/loaders';
import { Animation, Vector3, HemisphericLight, PointerEventTypes, Color3} from "@babylonjs/core"
import { Chess } from "../util/Loading";

let scene;
let camera;

export const createBusinessConsultingScene = async (s, c) => {
    console.log("createBusinessConsultingScene")
    scene = s;
    camera = c;
    scene.clearColor = Color3.Red();


    


};