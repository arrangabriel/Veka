import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ListingView from './components/Innlegg/UserPost/ListingView'
import Popup from './components/Innlegg/Popup';

import LoginForm from './components/Innlegg/LoginForm';
import SignUp from './components/Innlegg/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPost from './components/Innlegg/UserPost';

function App() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
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
        <UserPost></UserPost>
      </>}
      handleClose={togglePopup}
      />}

      <div className="auth-wrapper">  
        <div className="auth-inner">
          <Routes>
            <Route exact path='/' element={<ListingView/>} />
            <Route path="/sign-in" element={<LoginForm/>} />
            <Route path="/sign-up" element={<SignUp/>} />
            <Route path="/sign-up#" element={<LoginForm/>} />
            <Route path="/add-post" element={<UserPost/>} />
            <Route path="/my-user" element={LoginForm} />

          </Routes>
        </div>
        <input
          type="button"
          value="Klikk her for å legge ut innlegg"
          onClick={togglePopup}
        />
      </div>
    </div>
    </Router>
  );
}

export default App;
