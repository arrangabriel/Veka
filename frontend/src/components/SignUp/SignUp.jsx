import "./SignUp.css";
import React from "react";
import {useState} from 'react';
import APIservice from "../../APIservice";
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';



const SignUp = () => {
    const [password, setPassword] =useState('');
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    let navigate=useNavigate();
    const [fail,setFail]=useState('');
    const [token, setToken]=useCookies(['mytoken']);


    const sendRequest = ()=>{
        let body=  {username: username, email: email, password: password};

        if(username===''){
            setFail('Vennligst skriv inn bruker')
        }
        else if(email===''){
            setFail('Vennligst skriv inn email')
        }
        else if(!email.includes('@')){
            setFail('Skriv gyldig mail')
        }
        else if(password===''){
            setFail('Vennligst skriv inn passord')
        }
        else{
            APIservice.Signup(body)
            .then(resp=>{
                if(resp.status!==201){
                    setFail('Brukernavn finnes fra før av')
                }else{
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
            })
        }
    }

    return (
        <div className="siteElements">
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
            <br></br>
            <p style={{color:'red'}}>{fail}</p>
            <br></br>
            <button id="regBut" className="btn btn-primary btn-block" onClick={sendRequest}>Registrer meg</button>
            <p id="allLogIn" className="forgot-password text-right"> Allerede registrert? <a href="/sign-in">Logg inn</a></p>
        </div>
    );
}

export default SignUp