import React from "react"
import '@babylonjs/loaders';
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader } from "@babylonjs/core"
import SceneHook from "../hooks/SceneHook/SceneHook"
let box

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene)

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero())

  const canvas = scene.getEngine().getRenderingCanvas()

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true)

  const lol = SceneLoader.ImportMesh(
    '',
    require('../assets/scenes/Arrow/warp_straight.glb'),
    '',
    scene
  )

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
  </div>
);
