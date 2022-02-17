import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Popup from './components/Innlegg/Popup';

import Innlegg from './components/Innlegg/Innlegg'
import LoginForm from './components/Innlegg/LoginForm';
import SignUp from './components/Innlegg/SignUp';
import Button from 'react-bootstrap/Button';
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
                <Link className="nav-link" to={"/sign-in"}>LoginForm</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <input
      type="button"
      value="Click to Open Popup"
      onClick={togglePopup}
      />

      {isOpen && <Popup
      content={<>
        <UserPost></UserPost>
      </>}
      handleClose={togglePopup}
    />}

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route exact path='/' element={<Innlegg/>} />
            <Route path="/sign-in" element={<LoginForm/>} />
            <Route path="/sign-up" element={<SignUp/>} />
            <Route path="/add-post" element={<UserPost/>} />
            
          </Routes>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
