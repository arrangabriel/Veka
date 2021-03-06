import React from 'react'
import Profile from './Profile'
import MyOwnListingsHandler from '../MyListings/MyOwnListingsHandler'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'
import APIservice from '../../APIservice';

const ProfilePage = ({ token }) => {

  const [userID, setUserID] = useState(1)
  const [profile, setProfile] = useState({
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
  })

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/profiles/me/', {
      'method': 'GET',
      headers: {
        'Content-type': 'text',
        'Authorization': 'Token ' + token.mytoken,
      },
      credentials: 'include',
    })
      .then(resp => resp.json())
      .then(resp => setUserID(resp))
      .then(APIservice.getUser(userID, token)
        .then(resp => resp.json())
        .then(resp => setProfile(resp)))
      .catch(error => console.log(error))
  }, [userID])


  return (
    <div>
      <Profile user={profile.user} first_name={profile.first_name} last_name={profile.last_name} bio={profile.bio} location={profile.location} avatar="blank_profile" token={token} userID={userID}></Profile>
      {profile.user.username === ""
      ?<h1 className="siteElements">Ingen billetter ute</h1>
      :<MyOwnListingsHandler userID={userID}></MyOwnListingsHandler>
      }
    </div>
  )
}

export default ProfilePage