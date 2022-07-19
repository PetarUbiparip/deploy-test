import React from "react"
import '@babylonjs/loaders';
import {  Vector3, SceneLoader, ArcRotateCamera, Color3, GlowLayer, AnimationGroup, Append }from "@babylonjs/core"
import SceneHook from "../hooks/SceneHook/SceneHook"
import { Button } from "react-babylonjs";

let scene1;
const onSceneReady = (scene) => {
  scene1 = scene ;
  //set scene color to black
  scene.clearColor = Color3.Black();

  // This creates and positions a free camera (non-mesh)
  // let camera = new ArcRotateCamera('camera1', 3.14, 1.55, 6.5, new Vector3(0, 0, 0), scene);
  let camera = new ArcRotateCamera('camera1', 3.14, 1.85, 6.5, new Vector3(0, 0, 0), scene);
  //  let camera = new ArcRotateCamera('camera1', 3.14, 2, 7, new Vector3(0, 0, 0), scene1);

  // This attaches the camera to the canvas
  const canvas = scene.getEngine().getRenderingCanvas()
  // camera.attachControl(canvas, false) 
  // camera.wheelPrecision = 30;
  // camera.minZ = 0.1;
  // camera.setTarget(Vector3.Zero())

  // const warpStraight = SceneLoader.ImportMesh(
  //   '',
  // require('../assets/scenes/Arrow/warp_straight.glb'),
  //   '',
  //   scene,
  //   (a) => {

  //     console.log(a)
  //     // console.log(typeof a[0])
  //     // console.log(a[0])
  //   }
  // )
  const warpStraight =  SceneLoader.Append(
  require('../assets/scenes/Arrow/warp_straight.glb'),
    '',
    scene,
    (a) => {
      scene1.activeCamera =scene1.cameras[1];

      var glowWrap = new GlowLayer("glowWrap", scene);
      glowWrap.intensity = 2;

      for (let m of scene1.getNodeByID("MASH2_Instancer_objects")._children) {
        glowWrap.addIncludedOnlyMesh(m)
      }
      // console.log(a)
      // console.log(a.animationGroups)
      // console.log(a.animationGroups[0])
      // // a.animationGroups[0].pause = true;
      // console.log(a.animationGroups[0].pause())
      // console.log("asd "+a.animationGroups[0].stopAnimation)
      // console.log("asd "+a.animationGroups.stopAnimation)
      // console.log(a.animations)
      // console.log(a.stopAnimation())
    }
  )
  const arrowTarget =  SceneLoader.Append(
    require('../assets/scenes/Arrow/ArrowTarget.glb'),
      '',
      scene,
      (scene) => {

        var glowArrow = new GlowLayer("glowArrow", scene);
        glowArrow.intensity = 2;

        var glowTarget = new GlowLayer("glowTarget", scene);
        glowTarget.intensity = 5;

        // arrow
        let temp1 = [];
        for (let [i,m] of scene1.getNodeByID("MASH1_Instancer_objects")._children.entries()) {
          if( i % 5 === 0 ) {
            temp1.push(m)
          }
          m.setEnabled(false);
          glowArrow.addIncludedOnlyMesh(m)
        }
        scene1.getNodeByID("MASH1_Instancer_objects")._children = temp1


        //target
        temp1 = [];
        for (let [i,m] of scene1.getNodeByID("MASH3_Instancer_objects")._children.entries()) {
          if( i % 3 === 0 ) {
            temp1.push(m)
          }
          m.setEnabled(false);
          glowTarget.addIncludedOnlyMesh(m)
        }
        scene1.getNodeByID("MASH3_Instancer_objects")._children = temp1

        
        // temp1 = [];
        // //animation optimisation
        // console.log(scene1.animationGroups[1]._animatables)
        // console.log(scene1.animationGroups[1]._animatables.entries())
        // for (let [i,m] of scene1.animationGroups[1]._animatables.entries()) {
        //   if( i % 5 === 0 ) 
        //     temp1.push(m)
        // }
        // console.log(temp1)
        // scene1.animationGroups[1]._animatables = temp1
        // console.log(scene1.animationGroups[1]._animatables)

          // arow and target animation
          scene1.animationGroups[1].stop();


        // for(let mesh of scene.meshes){
        //   mesh.setEnabled(false);
        // }
        // console.log(scene)
        // console.log(scene.animationGroups[0].pause())
        // console.log(scene.animationGroups[0].stop())
        // console.log(a.animationGroups[0].play())
        // scene.animationGroups[0].stop()
      }
    )


    // const arrowWarpTargetCamera =  SceneLoader.Append(
    //   require('../assets/scenes/Arrow/ArrowWarpTargetCamera.glb'),
    //     '',
    //     scene,
    //     (scene) => {
          // for(let mesh of scene.meshes){
            // mesh.setEnabled(false);
          // }
    //       console.log(scene)
    //       console.log(scene.animationGroups)
    //       console.log(scene.meshes)
    //       console.log(scene.cameras)
    //       // console.log(scene.animationGroups[0].pause())
    //       // console.log(scene.animationGroups[0].stop())
    //       // console.log(a.animationGroups[0].play())
    //       // scene.animationGroups[0].stop()
    //       // let camera = scene1.cameras[1];
    //       // scene1.activeCamera =camera;
    //       // let camera1 =scene1.getCameraByName("camera_Arrow");
    //       scene1.activeCamera =scene1.getCameraByName("camera_Arrow");
    //       // camera1.attachControl(canvas, false) 
    //       // camera1.wheelPrecision = 30;
    //       // camera1.minZ = 0.1;
    //       // camera1.setTarget(Vector3.Zero())
    //     }
    //   )



    // const warp_straight =  SceneLoader.Append(
    // require('../assets/scenes/Arrow/warp_straight.glb'),
    //   '',
    //   this.scene,
    //   (scene) => {
    //     arrow = scene;
    //     for(let mesh of scene.meshes){
    //       mesh.setEnabled(false);
    //     }
    //     console.log(scene)
    //     // console.log(scene.animationGroups[0].pause())
    //     // console.log(scene.animationGroups[0].stop())
    //     // console.log(a.animationGroups[0].play())
    //     scene.animationGroups[0].stop()
    //   }
    // )
  // const arrowTarget = SceneLoader.ImportMesh(
  //   '',
  //   require('../assets/scenes/Arrow/ArrowTarget.glb'),
  //   '',
  //   scene
  // )
  // arrowTarget.animations
  // console.log(warpStraight)

  // set glow
  // var glow = new GlowLayer("glow", scene);
  // glow.intensity = 222;
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

async function changeChildrenVisibility(nodeName, enable){
  // new Promise((resolve,reject) =>{
    
    console.log("start :" + Date.now() + " :"+nodeName)
    for(let m of scene1.getNodeByID(nodeName)._children){
      m.setEnabled(enable);
    }
    console.log("end :" + Date.now() + " :"+nodeName)
  }
  // )

// }
function test () {
  // for(let m of scene1.meshes){
  //   m.setEnabled(true);
  // }

  console.log(scene1.animationGroups)
  console.log("anim start :" + Date.now() + " :")
  // console.log(scene1.animationGroups[1]._animatables)
  scene1.animationGroups[1].start()
  console.log("anim end :" + Date.now() + " :")

  // arrow 
  changeChildrenVisibility("MASH1_Instancer_objects", true);
  // setTimeout(() => changeChildrenVisibility("MASH1_Instancer_objects", true),0)

  //target
  changeChildrenVisibility("MASH3_Instancer_objects", true);
  // setTimeout(() => changeChildrenVisibility("MASH3_Instancer_objects", true),0)

  // // wrap with timeout
  setTimeout(() => {
    changeChildrenVisibility("MASH2_Instancer_objects", false)
    console.log("anim start  :" + Date.now() + " :")
    scene1.animationGroups[0].stop();
    console.log("anim end :" + Date.now() + " :")
  }, 500)


  scene1.activeCamera = scene1.cameras[2];
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

export default () => (
  <div>
    <SceneHook antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
    <p id="fps"></p>
    <Button onClick={test}>
        Test
    </Button>
  </div>
);
