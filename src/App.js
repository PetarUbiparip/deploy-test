// import ArrowPage from './pages/ArrowPage'
// import PlatonicPage from './pages/PlatonicPage'
import SceneView from './pages/SceneView'
// import { button } from "react-babylonjs";
import { onSceneReady } from "./pages/SceneView"
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link
// } from 'react-router-dom';

// export let selectedScene;

// function switchScene(scene) {
//   console.log(scene);
//   selectedScene = scene
//   onSceneReady();
// }


function App() {
  return (
    // <div className="App">
    //   <button onClick={() => switchScene('Arrow')}>
    //     Arrow
    //   </button>

    //   <button onClick={() => switchScene('Platonic')}>
    //     Platonic
    //   </button>
      < SceneView />
    // </div>

  );
}

export default App;



{/* <Router>
<div className="App">
  <li>
    <Link to="/platonic">Platonic</Link>
  </li>
  <li>
    <Link to="/arrow">Arrow</Link>
  </li>
  <Routes>
    <Route exact path='/platonic' element={< PlatonicPage />}></Route>
    <Route exact path='/arrow' element={< ArrowPage />}></Route>
  </Routes>
</div>
</Router> */}
