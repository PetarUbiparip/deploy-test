import HomePage from './pages/HomePage'
// import { BrowserRouter as Router, Routes, Route ,Link} from "react-router-dom";
// import { OurOrganization } from "./scenes/components/OurOrganization"
// import { Contact } from "./scenes/components/Contact"
// import CustomRouter from './customRoutes/CustomRouter';
// import history from './customRoutes/history';

function App() {
  return (
    <div>

      < HomePage />
      {/* <CustomRouter history={history}>
      <Link to="/our-organization">OurOrganization</Link>
      <Link to="/contact">Contact</Link>
        <div className="App">
          <Routes>
            <Route exact path='/our-organization' element={< OurOrganization />}></Route>
            <Route exact path='/contact' element={< Contact />}></Route>
          </Routes>
        </div>
      </CustomRouter> */}


    </div >
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
