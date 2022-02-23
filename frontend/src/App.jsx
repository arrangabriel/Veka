import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ListingView from './components/Listing/ListingView'
import Popup from './components/Popup/Popup';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateListing from './components/Listing/CreateListing';

function App() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Veka</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/my-user"}>Min bruker</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/add-post"}>Nytt innlegg</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {isOpen && <Popup
      content={<>
        <CreateListing></CreateListing>
      </>}
      handleClose={togglePopup}
      />}

          <Routes>
            <Route exact path='/' element={<ListingView/>} />
            <Route path="/sign-in" element={<Login/>} />
            <Route path="/sign-up" element={<SignUp/>} />
            <Route path="/sign-up#" element={<Login/>} />
            <Route path="/add-post" element={<CreateListing/>} />
            <Route path="/my-user" element={Login} />

          </Routes>
          
    </div>
    <input
      type="button"
      value="Klikk her for å legge ut innlegg"
      onClick={togglePopup}
    />
    </Router>
  );
}

export default App;
