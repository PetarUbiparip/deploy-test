import { useEffect, useRef } from "react";
import { Engine, Scene, ArcRotateCamera, Vector3 } from "@babylonjs/core";
import { HomePage  } from "../../pages/HomePage";
import { startArrowAnimation , startArrowAnimShort} from "../../scenes/WhoWeAreScene"
import { test } from "../../scenes/HomeScene"

export let homePage;
export default ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest }) => {
  const reactCanvas = useRef(null);

  let engine;

  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    homePage = new HomePage(engine, sceneOptions);

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(homePage.activeScene);
      homePage.activeScene.render();
      let divFps = document.getElementById("fps");
      divFps.innerHTML = engine.getFps().toFixed() + " fps";
    });

    const resize = () => {
      homePage.activeScene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      homePage.activeScene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);






  return (
    <div>
      <div class='buttons'>
        {/* <button onClick={() => switchScene('Working')}>
          Working
        </button>

        <button onClick={() => switchScene('Arrow')}>
          Arrow
        </button>

        <button onClick={() => switchScene('Platonic')}>
          Platonic
        </button> */}


        <button onClick={() => startArrowAnimation()}>
          Start anim
        </button>
        <button onClick={() => startArrowAnimShort()}>
          Start anim short
        </button>
        
        <button onClick={() => test()}>
         Test
        </button>
      </div>


      <canvas ref={reactCanvas} {...rest} />

    </div>

  );



};



