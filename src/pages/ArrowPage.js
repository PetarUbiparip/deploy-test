import React from "react"
import '@babylonjs/loaders';
import { HemisphericLight, Animation, Vector3, SceneLoader, ArcRotateCamera, Color3, FadeInOutBehavior, GlowLayer, AnimationGroup, Append, StandardMaterial, Texture, MeshBuilder, Mesh, Box, CubicEase } from "@babylonjs/core"
import SceneHook from "../hooks/SceneHook/SceneHook"
import { Button } from "react-babylonjs";
import { ArrowWarp, ArrowScene } from "./../Loading.js";

let scene;
let camera
const onSceneReady = async (s, c) => {
  scene = s;
  camera = c
  //set scene color to black
  // scene.clearColor = Color3.White();
  scene.clearColor = Color3.Black();

  // This creates and positions a free camera (non-mesh)
  // camera = new ArcRotateCamera('default_camera', 3.14, 1.55, 6.5, new Vector3(0, 0, 0), scene);
  // let camera = new ArcRotateCamera('camera1', 3.14, 1.85, 6.5, new Vector3(0, 0, 0), scene);
  //  let camera = new ArcRotateCamera('camera1', 2.14, 2, 2, new Vector3(0, 0, 0), scene1);
  var light = new HemisphericLight('HemiLight', new Vector3(0, 0, 0), scene);

  // This attaches the camera to the canvas
  const canvas = scene.getEngine().getRenderingCanvas()
  camera.attachControl(canvas, false)
  camera.wheelPrecision = 100;
  camera.minZ = 0.1;
  camera.setTarget(Vector3.Zero())


  // const warp = SceneLoader.Append(
  //   require('../assets/scenes/Arrow/warp_straight.glb'),
  //   '',
  //   scene,
  //   (scene) => {
  //     // console.log("____warp___")
  //     // console.log(scene1.getNodeByID("MASH2_Instancer_objects")._children[0])
  //     // console.log("____warp___")
  //     // arrow = scene;
  //     // for(let mesh of scene.meshes){
  //     //   mesh.setEnabled(false);
  //     // }
  //     // console.log(scene)
  //     // console.log(scene.animationGroups[0].pause())
  //     // console.log(scene.animationGroups[0].stop())
  //     // console.log(a.animationGroups[0].play())
  //     // scene.animationGroups[0].stop()
  //   }
  // )


  // const warp = Warp;
  // const all = All;
  // const all = SceneLoader.Append(
  //   require('../assets/scenes/Arrow/all.glb'),
  //   '',
  //   scene,
  //   (scene) => {
  //     scene.animationGroups[1].stop();
  //     // console.log(scene);
  //     // scene.activeCamera = scene.cameras[2];


  //     for (let [i, m] of scene.getNodeByID("Target_Baked")._children.entries()) {
  //       m.setEnabled(false);
  //     }

  //     for (let [i, m] of scene.getNodeByID("Arrow_Baked")._children.entries()) {
  //       m.setEnabled(false);
  //     }

  //     for (let [i, m] of scene.getNodeByID("Warp_Baked")._children.entries()) {
  //       m.setEnabled(false);
  //     }

  //   }
  // )





  await ArrowWarp.addAllToScene();
  await ArrowScene.addAllToScene();
  scene.animationGroups[1].stop()

  scene.activeCamera = scene.cameras[2];
  console.log(scene.cameras)


  changeChildrenVisibility("Arrow_Baked", false);
  changeChildrenVisibility("Target_Baked", false);
  changeChildrenVisibility("Warp_Baked", false);

  // set glow
  var glow = new GlowLayer("glow", scene);
  glow.intensity = 2;


};


const onRender = (scene) => {

};


async function changeChildrenVisibility(nodeName, enable, async = false) {
  let counter = 0;
  let delay = 0;
  for (let m of scene.getNodeByID(nodeName)._children) {

    if (async) {
      if (counter % 100 == 0) {
        delay += 50;
      }
      counter++;
      setTimeout(() => {
        m.setEnabled(enable);
      }, delay);
    } else {
      m.setEnabled(enable);
    }
  }
}

async function testAll() {
  // await ArrowScene.addAllToScene();
  // scene.animationGroups[1].stop()


  scene.animationGroups[1].start()

  // scene.activeCamera = scene.cameras[2];
  // await ArrowWarp.removeFromScene();
  // return

  // console.log("anim start :" + Date.now() + " :")
  // console.log("anim end :" + Date.now() + " :")

  //warp
  // setTimeout(() => {
  changeChildrenVisibility("MASH2_Instancer_objects", false, true)
  // }, 0);

  // setTimeout(() => {
  changeChildrenVisibility("Warp_Baked", true, true);
  // }, 0);

  // arrow 
  // setTimeout(() => {
  // changeChildrenVisibility("Arrow_Baked", true, true, 500);
  changeChildrenVisibility("Arrow_Baked", true, true);
  // }, 0);

  // //target
  // setTimeout(() => {
  // changeChildrenVisibility("Target_Baked", true, true, 1000);
  changeChildrenVisibility("Target_Baked", true, true);
  // }, 0);




  // console.log("anim start  :" + Date.now() + " :")
  // console.log(scene.animationGroups)


  setTimeout(() => {
    scene.animationGroups[0].stop();
  }, 3000);


  // console.log("anim end :" + Date.now() + " :")
  // }, 500)

  // console.log(scene.cameras);

  // setTimeout(() => {
  //   scene.activeCamera = scene.cameras[2];
  // }, 0);

  // setTimeout(() => {
  //   scene.activeCamera = scene.cameras[2];
  //   }, 100);


  // console.log("activeCamera :" + Date.now() + " :")

}


function test() {
  // for(let m of scene1.meshes){
  //   m.setEnabled(true);
  // }

  console.log(scene.animationGroups)
  console.log("anim start :" + Date.now() + " :")
  // console.log(scene1.animationGroups[1]._animatables)
  scene.animationGroups[0].start()
  scene.animationGroups[1].start()
  console.log("anim end :" + Date.now() + " :")

  // arrow 
  changeChildrenVisibility("Arrow_Baked", true);
  // setTimeout(() => changeChildrenVisibility("MASH1_Instancer_objects", true),0)

  //target
  changeChildrenVisibility("Target_Baked", true);
  // setTimeout(() => changeChildrenVisibility("MASH3_Instancer_objects", true),0)

  // // wrap with timeout
  setTimeout(() => {
    changeChildrenVisibility("MASH2_Instancer_objects", false)
    console.log("anim start  :" + Date.now() + " :")
    scene.animationGroups[2].stop();
    console.log("anim end :" + Date.now() + " :")
  }, 500)

  console.log(scene.cameras);
  scene.activeCamera = scene.cameras[2];
  console.log("activeCamera :" + Date.now() + " :")



  // wrap
  // for(let m of scene1.getNodeByName("MASH2_Instancer_objects")._children){
  //   m.setEnabled(false);
  // }

  // for(let m of scene1.meshes){
  //   m.setEnabled(true);
  // }
  // for(let m of scene1.meshes){
  //   m.setEnabled(true);
  // }
  // scene1.activeCamera =scene1.cameras[2];
  // console.log(scene1.getNodeByID)
  // console.log(scene1.getNodeByName)
  // console.log(scene1.cameras[1])
  // console.log(scene1.getNodeByID("camera_Arrow"))
  // console.log(scene1.getNodeByName("camera_Arrow"))
  // scene1.activeCamera =scene1.getCameraByName("camera_Arrow");

  // console.log(  scene1.animationGroups)
  // console.log(  arrow.meshes)
  // console.log(  arrow.animationGroups)
  // console.log(  arrow.transformNodes)
  // console.log(  arrow.rootNodes)


  // //arrow
  // for(let m of scene1.transformNodes[0]._children){
  //   m.setEnabled(false);
  // }
  // //target
  // for(let m of scene1.transformNodes[1]._children){
  //   m.setEnabled(false);
  // }
  // //wrap
  // for(let m of scene1.transformNodes[2]._children){
  //   m.setEnabled(false);
  // }
  // for(let m of scene1.transformNodes[3]._children){
  //   m.setEnabled(false);
  // }
  // for(let m of scene1.transformNodes[4]._children){
  //   m.setEnabled(false);
  // }
  // console.log(scene1)
  // console.log(scene1.transformNodes)
  // console.log(scene1.getNodeByName("MASH1_Instancer_objects")._children)
  // console.log(scene1.transformNodes[0]._children)
  // console.log(scene1.getNodeByName("MASH2_Instancer_objects"))
  // console.log(scene1.getNodeByName("MASH3_Instancer_objects"))
  // console.log(scene1.animationGroups)
  // console.log(scene1.cameras)
  // console.log(scene1.meshes)
  // console.log(arrow.transformNodes[1])
  // console.log(arrow.transformNodes[2])
  // console.log(arrow.transformNodes[3])
  // arrow.transformNodes[0]
  // arrow.transformNodes[1]
  // arrow.transformNodes[2]
  // arrow.animationGroups[0].reset()
  // arrow.animationGroups[0].restart()
  // arrow.animationGroups[0].play()
  // arrow.animationGroups[0].start()
  // arrow.  //backFaceCulling = false;
  // const camera = new ArcRotateCamera('camera1', 3.14, 2.55, 16.5, new Vector3(0, 0, 0), scene1);
  // console.log(arrow)
  // console.log(scene1.cameras)
  // console.log(scene1.cameras)
  // console.log(scene1.meshes)
  // scene1.meshes.setEnabled(false);



}


// function fadeOut() {
//   const frameRate = 30;
//   console.log("1")
//   const visibilityAnimation = new Animation("change visibility", "visibility", frameRate,
//     Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
//   const alphaAnimation = new Animation("change alpha", "alpha", frameRate,
//     Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
//   const keyFrames = [];
//   console.log("2")
//   keyFrames.push({
//     frame: 0,
//     value: 0
//   });

//   keyFrames.push({
//     frame: frameRate,
//     value: 1
//   });

//   keyFrames.push({
//     frame: 2 * frameRate,
//     value: 0
//   });
//   console.log("3")
//   visibilityAnimation.setKeys(keyFrames);
//   alphaAnimation.setKeys(keyFrames);

//   var animationGroup = new AnimationGroup("my group");
//   // animationGroup.addTargetedAnimation(visibilityAnimation, box);
//   // animationGroup.addTargetedAnimation(alphaAnimation, outline);


//   scene1.meshes.forEach((m) => {

//     animationGroup.addTargetedAnimation(visibilityAnimation, m);
//   })

//   animationGroup.normalize(0, 2 * frameRate);
//   animationGroup.play(true);

// }

// function fadeIn() {
//   // console.log('fadeIn')
//   // fade.fadeIn(true);
// }

export default () => (
  <div>
    <SceneHook antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
    <p id="fps"></p>
    <Button onClick={testAll}>
      Start anim
    </Button>
    {/* <Button onClick={fadeOut}>
        Fade out 
    </Button>
    <Button onClick={fadeIn}>
        Fade in
    </Button> */}
  </div>
);
