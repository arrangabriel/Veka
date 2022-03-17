import React from 'react'
import Profile from './Profile'
import ListingHandler from '../Listing/ListingHandler'

const ProfilePage = () => {
  return (
    <div>
    <Profile first_name={"Sander"} last_name={"Eikeland"} bio={"Leter etter den feteste festen"} location={"Trondheim"} avatar="blank_profile"></Profile>
    <ListingHandler></ListingHandler>
    </div>
  )
}

export default ProfilePage