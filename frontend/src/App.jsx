import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ListingView from './components/Listing/ListingView'
import CreateListing from './components/Listing/CreateListing';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import React from 'react';
import ProfilePage from './components/Profile/ProfilePage';
import { useCookies } from 'react-cookie'


function App() {

  const [token, setToken] = useCookies(['mytoken'])

  // console.log(token)
  // useEffect(()=>{
  //   fetch('http://127.0.0.1:8000/api/listings/', {
  //     'method':'POST',
  //     credentials:'include',
  //     headers:{
  //       'Content-type':'application/json',
  //       'Authorization': 'Token '+token.mytoken
  //     },

  //     body: JSON.stringify({ title: 'Lise ska ha fest', description: 'aent nivå av syra', location:'oslo', listing_type:'b', price:'500', event_type:'konsert'})
  //   })
  //   .then(resp=>resp.json())
  // },[])



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


        <Routes>
          <Route exact path='/' element={<ListingView />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-up#" element={<Login />} />
          <Route path="/add-post" element={<CreateListing />} />
          <Route path="/my-user" element={<ProfilePage />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
