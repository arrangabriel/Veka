import React from "react";
import {Link, Router} from "react-router-dom";
import {useState, useEffect} from 'react';
import APIservice from "../../APIservice";
import {useCookies} from 'react-cookie';




const LoginForm = () => {
    const [password, setPassword] = useState('');
    const [username,setUsername]=useState('');
    const [token, setToken]=useCookies(['mytoken']);


    const bug=()=>{
        APIservice.Login({username,password})
        .then(resp=>resp.json())
        .then(resp=>setToken('mytoken',resp.token))
        .then(error=>console.log(error))
    }


  return (
  <div>
    <h3>Logg inn</h3>

    <div className="form-group">
        <label>Brukernavn</label>
        <input value={username} onInput={e => setUsername(e.target.value)} type="username" className="form-control" placeholder="Skriv brukernavn" required/>
    </div>

    <div className="form-group">
        <label>Passord</label>
        <input value={password} onInput={e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Skriv passord" required maxLength="40"/>
    </div>

    <div className="form-group">
        <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">Husk meg</label>
        </div>
    </div>

    <button className="btn btn-primary btn-block" onClick={bug}>Logg inn</button>
    <p className="forgot-password text-right">
        Glemt <a href="#">passord?</a>
    </p>
    <a href="/sign-up" className="btn btn-secondary"> Registrer bruker</a>
</div>);
}

export default LoginForm