import { Engine, Scene, ArcRotateCamera, Vector3 } from "@babylonjs/core";
import { loadAllData } from "../util/Loading";
import { createPlatonicScene } from "../scenes/PlatonicScene"
import { createWhoWeAreScene } from "../scenes/WhoWeAreScene"
import { createHomeScene } from "../scenes/HomeScene"
import { createOurOrganizationScene } from "../scenes/OurOrganizationScene"
import { createContactScene } from "../scenes/ContactScene"
import SceneHook from "../hooks/SceneHook/SceneHook"
import { Routes, Route } from "react-router-dom";
import { Home } from "../scenes/components/Home"
import { WhoWeAre } from "../scenes/components/WhoWeAre"
import { OurOrganization } from "../scenes/components/OurOrganization"
import { Contact } from "../scenes/components/Contact"
import CustomRouter from '../customRoutes/CustomRouter';
import history from '../customRoutes/history';

export class HomePage {
    activeScene;
    homeScene;
    whoWeAreScene;
    platonicScene;
    ourOrganizationScene;
    contactScene;
    camera;

    constructor(engine, sceneOptions) {

        history.listen(data => {
            this.switchScene(data.location.pathname)
        })

        this.whoWeAreScene = new Scene(engine, sceneOptions);
        this.platonicScene = new Scene(engine, sceneOptions);
        this.ourOrganizationScene = new Scene(engine, sceneOptions);
        this.contactScene = new Scene(engine, sceneOptions);
        this.homeScene = new Scene(engine, sceneOptions);
        this.createScenes()
        this.switchScene(history.location.pathname)
    }

    createScenes() {
        let homeCamera = new ArcRotateCamera('default_camera', Math.PI / 2, Math.PI / 2, 1.2, new Vector3(0, 0, 0), this.homeScene);
        let whoWeAreCamera = new ArcRotateCamera('default_camera', 0, 0, 0, new Vector3(0, 0, 0), this.whoWeAreScene);
        let ourOrganizationCamera = new ArcRotateCamera('default_camera', 0, 0, 0, new Vector3(0, 0, 0), this.ourOrganizationScene);
        let contactCamera = new ArcRotateCamera('default_camera', 0, 0, 0, new Vector3(0, 0, 0), this.contactScene);
        let platonicCamera = new ArcRotateCamera('default_camera', 1.5708, 1.5708, 0.2370, new Vector3(0, 0.12, 0), this.platonicScene);

        loadAllData(this.homeScene, this.whoWeAreScene, this.platonicScene).then(() => {
            this.createScene(this.homeScene, homeCamera, 'Home');
            this.createScene(this.whoWeAreScene, whoWeAreCamera, 'WhoWeAre');
            this.createScene(this.ourOrganizationScene, ourOrganizationCamera, 'OurOrganization');
            this.createScene(this.contactScene, contactCamera, 'Contact');
            this.createScene(this.platonicScene, platonicCamera, 'Platonic');
        });
    }

    createScene(scene, camera, sceneName) {
        if (scene.isReady()) {
            onSceneReady(scene, camera, sceneName);
        } else {
            scene.onReadyObservable.addOnce((scene) => onSceneReady(scene, camera, sceneName));
        }
    }

    switchScene(sceneName) {
        console.log("!!!! Switch Scene", sceneName);
        switch (sceneName) {
            case '/':
                this.activeScene = this.homeScene;
                break;
            case '/our-organization':
                this.activeScene = this.ourOrganizationScene;
                break;
            case '/contact':
                this.activeScene = this.contactScene;
                break;
            case '/who-we-are':
                this.activeScene = this.whoWeAreScene;
                break;


            case '/platonic':
                this.activeScene = this.platonicScene;
                break;
        }
    }
}

const onSceneReady = async (s, c, selectedScene) => {
    console.log("onSceneReady", selectedScene)

    switch (selectedScene) {
        case "Home":
            console.log("Home scene loading")
            await createHomeScene(s, c);
            console.log("Home scene load finished")
            break;
        case "WhoWeAre":
            console.log("WhoWeAre scene loading")
            await createWhoWeAreScene(s, c);
            console.log("WhoWeAre scene load finished")
            break;
        case "Platonic":
            console.log("Platonic scene loading")
            await createPlatonicScene(s, c);
            console.log("Platonic scene load finished")
            break;
        case "OurOrganization":
            console.log("OurOrganization scene loading")
            await createOurOrganizationScene(s, c);
            console.log("OurOrganization scene load finished")
            break;
        case "Contact":
            console.log("Contact scene loading")
            await createContactScene(s, c);
            console.log("Contact scene load finished")
            break;
    }
};

const onRender = (scene) => {
};

export default () => {
    return (
        <div>
            <SceneHook antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
            <p id="fps"></p>

            <CustomRouter history={history}>
                <Routes>
                    <Route exact path='/' element={< Home />}></Route>
                    <Route exact path='/who-we-are' element={< WhoWeAre />}></Route>
                    <Route exact path='/our-organization' element={< OurOrganization />}></Route>
                    <Route exact path='/contact' element={< Contact />}></Route>
                </Routes>
            </CustomRouter>
        </div>
    );
}