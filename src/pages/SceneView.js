import React from "react"
import '@babylonjs/loaders';
import { Animation, Vector3, SceneLoader, ArcRotateCamera, HemisphericLight, PointerEventTypes, Color3, FadeInOutBehavior, GlowLayer, AnimationGroup, Append, StandardMaterial, Texture, MeshBuilder, Mesh, Box, CubicEase } from "@babylonjs/core"
import SceneHook from "../hooks/SceneHook/SceneHook"
import { PlatonicShader} from "./../Loading";
import { createPlatonicScene } from "../pages/PlatonicScene"
import { createArrowScene } from "../pages/ArrowScene"


let scene;
let camera;
export const onSceneReady = async (s, c, selectedScene) => {
    scene = s;
    camera = c;
    console.log(selectedScene)
    console.log(scene)
    // if(scene)
    //     return;
    switch (selectedScene) {
    case "Arrow":
        console.log("Arrow scene loading")

        await createArrowScene(s, c) ;
    break;
    case "Platonic":
        console.log("Platonic scene loading")
        await createPlatonicScene(s, c) ;
    break;
    }
};


const onRender = (scene) => {


};
export default () => (
    <div>
        <SceneHook antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
        <p id="fps"></p>
    </div>
);