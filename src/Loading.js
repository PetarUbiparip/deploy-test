import { SceneLoader } from "@babylonjs/core"

export let ArrowScene;
export let ArrowWarp;
export let PlatonicShader;

export async function loadAllData(arrowScene, platonicScene) {
    console.log('Load start');
            
    PlatonicShader = await SceneLoader.LoadAssetContainerAsync(
        require('./assets/scenes/Platonic/platonic_shader.glb'),
        '',
        platonicScene,
        (container) => {
            console.log("PlatonicShader loaded")
        }
    )

    ArrowWarp = await SceneLoader.LoadAssetContainerAsync(
        require('./assets/scenes/Arrow/warp_straight.glb'),
        '',
        arrowScene,
        (container) => {
            console.log("ArrowWarp loaded")
        }
    )

    ArrowScene = await  SceneLoader.LoadAssetContainerAsync(
        require('./assets/scenes/Arrow/Slide_09_mission_all.glb'),
        // require('./assets/scenes/Arrow/all.glb'),
        '',
        arrowScene,
        (container) => {
            console.log('ArrowScene loaded');
        }

    )


            

        
        
    // console.log(await PlatonicShader)
    // await PlatonicShader.addAllToScene();
    // await PlatonicShader.instantiateModelsToScene();
    // console.log(await cont)
    // console.log(scene)

    // await cont.addAllToScene();



    console.log('Load end');
}