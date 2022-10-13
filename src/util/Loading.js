import { SceneLoader } from "@babylonjs/core"

export let Logo;
export let Platonic;
export let Planet;
export let Arrow;
export let Warp;
export let PlatonicShader;
export let HomeSceneData;
export let Compass;
export let Chess;
export let Bulb;

export async function loadAllData(homeScene, whoWeAreScene, platonicScene, solutionsScene) {
    console.log('Load start');
    let startTime = Date.now();

    Logo = await SceneLoader.LoadAssetContainerAsync(
        require('./../assets/scenes/home/Logo.glb'),
        '',
        homeScene,
        (container) => {
            console.log("Logo loaded")
        }
    )

    Platonic = await SceneLoader.LoadAssetContainerAsync(
        require('./../assets/scenes/home/Platonic.glb'),
        '',
        homeScene,
        (container) => {
            console.log("Platonic loaded")
        }
    )

    Planet = await SceneLoader.LoadAssetContainerAsync(
        require('./../assets/scenes/home/Planet.glb'),
        '',
        homeScene,
        (container) => {
            console.log("Planet loaded")
        }
    )

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

    Arrow = await SceneLoader.LoadAssetContainerAsync(
        require('./../assets/scenes/whoWeAre/Arrow.glb'),
        '',
        whoWeAreScene,
        (container) => {
            console.log('Arrow loaded');
        }
    )

    Compass = await SceneLoader.LoadAssetContainerAsync(
        require('./../assets/scenes/whoWeAre/Compass.glb'),
        '',
        whoWeAreScene,
        (container) => {
            console.log('Compass loaded');
        }
    )

    Chess = await SceneLoader.LoadAssetContainerAsync(
        require('./../assets/scenes/whoWeAre/Chess.glb'),
        '',
        whoWeAreScene,
        (container) => {
            console.log('Chess loaded');
        }
    )

    Bulb = await SceneLoader.LoadAssetContainerAsync(
        require('./../assets/scenes/ourOrganization/solutions/Bulb.glb'),
        '',
        solutionsScene,
        (container) => {
            console.log('Bulb loaded');
        }
    )
    
    console.log(Logo)


    console.log('Load end');
    console.log('Load duration :' + ( Date.now() - startTime)/1000);
}