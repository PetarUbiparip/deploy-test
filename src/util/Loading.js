import { SceneLoader } from "@babylonjs/core"

export let Arrow;
export let Warp;
export let PlatonicShader;
export let HomeSceneData;
export let Compass;

export async function loadAllData(homeScene, whoWeAreScene, platonicScene) {
    console.log('Load start');
            
    PlatonicShader = await SceneLoader.LoadAssetContainerAsync(
        require('./../assets/scenes/Platonic/platonic_shader.glb'),
        '',
        platonicScene,
        (container) => {
            console.log("PlatonicShader loaded")
        }
    )

    Warp = await SceneLoader.LoadAssetContainerAsync(
        require('./../assets/scenes/whoWeAre/Warp.glb'),
        '',
        whoWeAreScene,
        (container) => {
            console.log("Warp loaded")
        }
    )

    Arrow = await  SceneLoader.LoadAssetContainerAsync(
        require('./../assets/scenes/whoWeAre/Arrow.glb'),
        // require('./assets/scenes/whoWeAre/all.glb'),
        '',
        whoWeAreScene,
        (container) => {
            console.log('Arrow loaded');
        }

    )

    Compass = await  SceneLoader.LoadAssetContainerAsync(
        require('./../assets/scenes/whoWeAre/Compass.glb'),
        // require('./assets/scenes/whoWeAre/all.glb'),
        '',
        whoWeAreScene,
        (container) => {
            console.log('Compass loaded');
        }

    )


    // HomeSceneData = await SceneLoader.LoadAssetContainerAsync(
    //     require('./../assets/scenes/Platonic/platonic_shader.glb'),
    //     '',
    //     homeScene,
    //     (container) => {
    //         console.log("PlatonicShader loaded")
    //     }
    // )

            

        
        



    console.log('Load end');
}