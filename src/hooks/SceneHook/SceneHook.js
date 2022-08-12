import { useEffect, useRef } from "react";
import { Engine, Scene, ArcRotateCamera, Vector3 } from "@babylonjs/core";
import { loadAllData  } from "../../Loading";
import { startArrowAnim } from "../../pages/ArrowScene"

export default ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest }) => {
  const reactCanvas = useRef(null);

  // set up basic engine and scene

  let engine;
  let scene;
  let arrowScene;
  let platonicScene;
  let selectedScene = "Arrow";



  let camera;
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    arrowScene = new Scene(engine, sceneOptions);
    platonicScene = new Scene(engine, sceneOptions);
    scene = platonicScene
    // camera = new ArcRotateCamera('camera1', 1.5708, 1.5708, 0.2370, new Vector3(0, 0.12, 0), scene);
    let arrowCamera = new ArcRotateCamera('default_camera', 0, 0, 0, new Vector3(0, 0, 0), arrowScene);
    let platonicCamera = new ArcRotateCamera('default_camera', 1.5708, 1.5708, 0.2370, new Vector3(0, 0.12, 0), platonicScene);
    camera = platonicCamera;
    // let camera = new ArcRotateCamera('default_camera', 3.14, 1.55, 6.5, new Vector3(0, 0, 0), scene);
    // console.log(camera)
    loadAllData(arrowScene, platonicScene).then(() => {
      createScene(platonicScene, platonicCamera, 'Platonic');
      createScene(arrowScene, arrowCamera, 'Arrow');
    });


    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
      scene.render();
      let divFps = document.getElementById("fps");
      divFps.innerHTML = engine.getFps().toFixed() + " fps";
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

  function switchScene(sceneName) {
    switch (sceneName) {
      case "Arrow":
        scene = arrowScene;
        break;
      case "Platonic":
        scene = platonicScene;
        break;
    }


    // scene = platonicScene;

    // createScene('Platonic');
    // createScene('Arrow');


  }

  return (
    <div>
      <canvas ref={reactCanvas} {...rest} />
      <button onClick={() => switchScene('Arrow')}>
        Arrow
      </button>

      <button onClick={() => switchScene('Platonic')}>
        Platonic
      </button>


      <button onClick={() => startArrowAnim()}>
        Start anim
      </button>

    </div>

  );



  function createScene(scene, camera, sceneName) {
    // engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    // scene = new Scene(engine, sceneOptions);
    // camera = new ArcRotateCamera('camera1', 1.5708, 1.5708, 0.2370, new Vector3(0, 0.12, 0), scene);
    // // let camera = new ArcRotateCamera('default_camera', 3.14, 1.55, 6.5, new Vector3(0, 0, 0), scene);
    // // console.log(camera)
    // loadAll(scene);
    if (scene.isReady()) {
      onSceneReady(scene, camera, sceneName);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene, camera, sceneName));
    }
  }
};



