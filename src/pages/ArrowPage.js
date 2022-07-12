import React from "react"
import '@babylonjs/loaders';
import {  Vector3, SceneLoader, ArcRotateCamera, Color3, GlowLayer, AnimationGroup} from "@babylonjs/core"
import SceneHook from "../hooks/SceneHook/SceneHook"
let box

const onSceneReady = (scene) => {
  //set scene color to black
  scene.clearColor = Color3.Black();

  // This creates and positions a free camera (non-mesh)
  const camera = new ArcRotateCamera('camera1', 3.14, 1.55, 6.5, new Vector3(0, 0, 0), scene);

  // This attaches the camera to the canvas
  const canvas = scene.getEngine().getRenderingCanvas()
  camera.attachControl(canvas, false) 
  camera.wheelPrecision = 30;
  camera.minZ = 0.1;
  camera.setTarget(Vector3.Zero())

  const warpStraight = SceneLoader.ImportMesh(
    '',
    require('../assets/scenes/Arrow/ArrowTarget.glb'),
    '',
    scene
  )

  // set glow
  var glow = new GlowLayer("glow", scene);
  glow.intensity = 2;
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  // if (box !== undefined) {
  //   const deltaTimeInMillis = scene.getEngine().getDeltaTime()
  //
  //   const rpm = 10
  //   box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
  // }
};

export default () => (
  <div>
    <SceneHook antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
    <p id="fps"></p>
  </div>
);
