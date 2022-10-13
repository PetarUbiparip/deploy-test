import { Engine, Scene, ArcRotateCamera, Vector3, FreeCamera } from "@babylonjs/core";
import { loadAllData } from "../util/Loading";
import { createPlatonicScene } from "../scenes/PlatonicScene"
import { createWhoWeAreScene } from "../scenes/WhoWeAreScene"
import { createHomeScene } from "../scenes/HomeScene"
import { createOurOrganizationScene } from "../scenes/OurOrganizationScene"
import { createContactScene } from "../scenes/ContactScene"
import { createSolutionsScene } from "../scenes/SolutionsScene"
import { createBusinessConsultingScene } from "../scenes/BusinessConsultingScene"
import SceneHook from "../hooks/SceneHook/SceneHook"
import { Routes, Route } from "react-router-dom";
import { Home } from "../components/Home"
import { WhoWeAre } from "../components/WhoWeAre"
import { OurOrganization } from "../components/OurOrganization"
import { Contact } from "../components/Contact"
import { Pixels2Pixels } from "../components/Pixels2Pixels"
import { BusinessConsulting } from "../components/BusinessConsulting"
import { Solutions } from "../components/Solutions"
import { Academy } from "../components/Academy"
import { ResearchAndDevelopment } from "../components/ResearchAndDevelopment"
import CustomRouter from '../routes/CustomRouter';
import history from '../routes/history';

export class HomePage {

    activeSceneName;
    activeScene;
    homeScene;
    whoWeAreScene;
    platonicScene;
    ourOrganizationScene;
    contactScene;
    solutionsScene;
    businessConsultingScene;
    camera;


    constructor(engine, sceneOptions) {

        history.listen(data => {
            this.switchScene(data.location.pathname)
        })

        this.whoWeAreScene = new Scene(engine, sceneOptions);
        this.platonicScene = new Scene(engine, sceneOptions);
        this.ourOrganizationScene = new Scene(engine, sceneOptions);
        this.contactScene = new Scene(engine, sceneOptions);
        this.solutionsScene = new Scene(engine, sceneOptions);
        this.businessConsultingScene = new Scene(engine, sceneOptions);
        this.homeScene = new Scene(engine, sceneOptions);
        this.createScenes(engine)
        this.switchScene(history.location.pathname)
    }

    async createScenes(engine) {
        let homeCamera = new ArcRotateCamera('default_camera', Math.PI / 2, Math.PI / 2, .3, new Vector3(.1, 0, 0), this.homeScene);
        let whoWeAreCamera = new ArcRotateCamera('default_camera', 0, 0, 0, new Vector3(0, 0, 0), this.whoWeAreScene);
        let ourOrganizationCamera = new ArcRotateCamera('default_camera', 0, 0, 0, new Vector3(0, 0, 0), this.ourOrganizationScene);
        let contactCamera = new ArcRotateCamera('default_camera', 0, 0, 0, new Vector3(0, 0, 0), this.contactScene);
        let platonicCamera = new ArcRotateCamera('default_camera', 1.5708, 1.5708, 0.2370, new Vector3(0, 0.12, 0), this.platonicScene);
        let solutionsCamera = new FreeCamera("default_camera", new Vector3(0, .1, .4), this.solutionsScene);
        let businessConsultingCamera = new FreeCamera("default_camera", new Vector3(0, .1, .4), this.businessConsultingScene);

        await loadAllData(this.homeScene, this.whoWeAreScene, this.platonicScene, this.solutionsScene, engine).then(() => {
            this.createScene(this.homeScene, homeCamera, 'Home');
            this.createScene(this.whoWeAreScene, whoWeAreCamera, 'WhoWeAre');
            this.createScene(this.ourOrganizationScene, ourOrganizationCamera, 'OurOrganization');
            this.createScene(this.contactScene, contactCamera, 'Contact');
            this.createScene(this.platonicScene, platonicCamera, 'Platonic');
            this.createScene(this.solutionsScene, solutionsCamera, 'Solutions');
            this.createScene(this.businessConsultingScene, businessConsultingCamera, 'BusinessConsulting');
        });
        engine.hideLoadingUI();
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
        console.log("!!!! history.location", this.activeSceneName);

        //stop prev scene
        if (this.activeSceneName)
            document.dispatchEvent(new CustomEvent("/" + this.activeSceneName + "-stop"));

        //start new scene
        document.dispatchEvent(new CustomEvent(sceneName));


        switch (sceneName) {
            case '/':
                this.activeScene = this.homeScene;
                this.activeSceneName = Scenes.Home
                break;
            case '/our-organization':
                this.activeScene = this.ourOrganizationScene;
                this.activeSceneName = Scenes.OurOrganization
                break;
            case '/contact':
                this.activeScene = this.contactScene;
                this.activeSceneName = Scenes.Contact
                break;
            case '/who-we-are':
                this.activeScene = this.whoWeAreScene;
                this.activeSceneName = Scenes.WhoWeAre
                break;
            case '/solutions':
                this.activeScene = this.solutionsScene;
                this.activeSceneName = Scenes.Solutions
                break;
            case '/business-consulting':
                this.activeScene = this.businessConsultingScene;
                this.activeSceneName = Scenes.BusinessConsulting
                break;


            // case '/platonic':
            //     this.activeScene = this.platonicScene;
            //     break;
            // case '/pixels-2-pixels':
            //     this.activeScene = this.platonicScene;
            //     break;
            // case '/business-consulting':
            //     this.activeScene = this.platonicScene;
            //     break;
        }
    }
}

const onSceneReady = async (s, c, selectedScene) => {
    console.log("onSceneReady", selectedScene)

    switch (selectedScene) {
        case "Home":
            await createHomeScene(s, c);
            break;
        case "WhoWeAre":
            await createWhoWeAreScene(s, c);
            break;
        case "Platonic":
            await createPlatonicScene(s, c);
            break;
        case "OurOrganization":
            await createOurOrganizationScene(s, c);
            break;
        case "Contact":
            await createContactScene(s, c);
            break;
        case "Solutions":
            await createSolutionsScene(s, c);
            break;
        case "BusinessConsulting":
            await createBusinessConsultingScene(s, c);
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
                    <Route exact path='/pixels-2-pixels' element={< Pixels2Pixels />}></Route>
                    <Route exact path='/business-consulting' element={< BusinessConsulting />}></Route>
                    <Route exact path='/solutions' element={< Solutions />}></Route>
                    <Route exact path='/academy' element={< Academy />}></Route>
                    <Route exact path='/research-and-development' element={< ResearchAndDevelopment />}></Route>
                </Routes>
            </CustomRouter>
        </div>
    );
}

const Scenes = {
    Home: "home",
    WhoWeAre: "who-we-are",
    OurOrganization: "our-organization",
    Contact: "contact",
    Solutions: "solutions",
    BusinessConsulting: "business-consulting",
}