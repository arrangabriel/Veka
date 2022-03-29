import './Login.css';
import React, { useEffect } from "react";
import {useState} from 'react';
import APIservice from "../../APIservice";
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';





const LoginForm = () => {
    const [password, setPassword] = useState('');
    const [username,setUsername]=useState('');
    const [token, setToken]=useCookies(['mytoken']);
    let navigate=useNavigate();
    const [fail,setFail]=useState('');


    const bug=()=>{
        if(password===''){
            setFail('Vennligst skriv inn passord')
        }
        else if(username===''){
            setFail('Vennligst skriv inn brukernavn')
        }
        else{
            APIservice.Login({username,password})
            .then(resp=>{
                if(resp.status!==200){
                    setFail('Brukernavn eller passord er feil')
                }else{
                    (resp.json()).then(
                        data=>{
                            setToken('mytoken',data.token)
                            navigate('../',{replace: true})
                        }
                    )
                }
            })
        }
    }


  return (
  <div className='siteElements'>
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
    <br></br>
    <p style={{color:'red'}}>{fail}</p>
    <br></br>
    <button id="logIn" className="btn btn-primary btn-block" onClick={bug}>Logg inn</button>
    <p id="forgPas" className="forgot-password text-right"> <a href="#">Glemt passord?</a></p>
    <br></br>
    <br></br>
    <a href="/sign-up" className="btn btn-secondary"> Registrer bruker</a>
</div>);


}

export default LoginForm