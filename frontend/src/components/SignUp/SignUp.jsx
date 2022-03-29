import React from "react";
import {useState} from 'react';
import APIservice from "../../APIservice";

const SignUp = () => {
    const [password, setPassword] =useState('');
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');

    const sendRequest = ()=>{
        let body=  {username: username, email: email, password: password};

        APIservice.Signup(body)
        .then(resp=>console.log(resp))
    }

    return (
        <div>
            <h3>Registrer bruker</h3>

            <div className="form-group">
                <label>Brukernavn</label>
                <input value={username} onInput={e => setUsername(e.target.value)} type="text" className="form-control" placeholder="Brukernavn" />
            </div>

            <div className="form-group">
                <label>E-postadresse</label>
                <input value={email} onInput={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="Skriv E-post" required="required" maxLength="40"/>
            </div>

            <div className="form-group">
                <label>Passord</label>
                <input value={password} onInput={e => setPassword(e.target.value)}type="password" className="form-control" placeholder="Skriv passord" required="required" maxLength="40"/>
            </div>

            <button onClick={sendRequest} className="btn btn-primary btn-block">Registrer meg</button>
            <p className="forgot-password text-right">
                Allerede registrert? <a href="/sign-in">Logg inn</a>
            </p>
        </div>
    );
}

export default SignUp