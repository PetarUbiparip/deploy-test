import HomePage from './pages/HomePage'

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
