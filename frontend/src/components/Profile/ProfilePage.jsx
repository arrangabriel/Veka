import React from 'react'
import Profile from './Profile'
import ListingHandler from '../Listing/ListingHandler'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'

const ProfilePage = () => {

  const [userID, setUserID] = useState()
  const [token, setToken] = useCookies(['mytoken'])

  useEffect(() => {
    console.log("token: " + token.mytoken)
    fetch('http://127.0.0.1:8000/api/profiles/me/', {
      'method': 'GET',
      headers: {
        'Content-type': 'text',
        'Authorization': 'Token ' + token.mytoken,
      },
      credentials: 'include',
    })
      .then(resp => console.log(resp))
      .then(resp => setUserID(resp))
      .catch(error => console.log(error))
  })

  return (
    <div>
      <Profile first_name={"Sander"} last_name={"Eikeland"} bio={"Leter etter den feteste festen"} location={"Trondheim"} avatar="blank_profile"></Profile>
      <ListingHandler></ListingHandler>
    </div>
  )
}

export default ProfilePage