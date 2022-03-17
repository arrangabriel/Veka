import React from 'react'
import Profile from './Profile'
import ListingHandler from '../Listing/ListingHandler'
import { useState, useEffect } from 'react';

const ProfilePage = () => {

  const [user, setUser] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/profiles/', {
      'method': 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    })
      .then(resp => resp.json())
      .then(resp => console.log(resp))
      .then(resp => setUser(resp))
      .catch(error => console.log(error))
  }, [])

  return (
    <div>
      <Profile first_name={"Sander"} last_name={"Eikeland"} bio={"Leter etter den feteste festen"} location={"Trondheim"} avatar="blank_profile"></Profile>
      <ListingHandler></ListingHandler>
    </div>
  )
}

export default ProfilePage