import React, { useEffect } from 'react'
import APIservice from '../../APIservice'
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import Profile from './Profile';
import blank_profile from './img/blank_profile.png'


const UserProfile = ({ownerId, togglePopup}) => {
    const [token,setToken]=useCookies();
    const [profile,setProfile] = useState({
        "id": 1,
        "user": {
          "username": "",
          "email": "",
          "password": ""
        },
        "first_name": "",
        "last_name": "",
        "bio": "",
        "location": ""
      });
    useEffect(()=>
        APIservice.getUser(ownerId, token)
        .then(resp => resp.json())
        .then(resp => setProfile(resp))
        .catch(error => console.log(error))
        ,[]
    )
    


  return (
    <div className="container bcontent">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-sm">
                        <img className="card-img" src={blank_profile} alt="profile"></img>
                    </div>
                    <div className="col-sm-5">
                        <div className="card-body">
                            <h4>{profile.user.username}</h4>
                            <h5>{profile.user.email}</h5>
                            <h5 className="card-title">{profile.first_name} {profile.last_name}</h5>
                            <p className="card-text">{profile.bio}</p>
                            <p className="card-text">{profile.location}</p>
                        </div>
                    </div>
                    <div className='listingButtonsDiv col-sm-3'>
                        <div className='container'>
                            <div className='row justify-content-end no-gutters'>
                                <button className="btn btn-danger" onClick={togglePopup}>Rapporter bruker</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>)
}

export default UserProfile