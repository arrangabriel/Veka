import React from 'react'
import Profile from './Profile'
import MyOwnListingsHandler from '../MyListings/MyOwnListingsHandler'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'

const ProfilePage = ({token}) => {

  const [userID, setUserID] = useState(-1)

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
      .catch(error => console.log(error))
  },[])

  return (
    <div>
      <Profile first_name={"Sander"} last_name={"Eikeland"} bio={"Leter etter den feteste festen"} location={"Trondheim"} avatar="blank_profile"></Profile>
      <MyOwnListingsHandler userID={userID}></MyOwnListingsHandler>
    </div>
  )
}

export default ProfilePage