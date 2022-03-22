import React from 'react'
import { useState, useEffect } from 'react';
import MyOwnListing from './MyOwnListing';


const MyOwnListingsHandler = ({userID}) => {

  userID = 2

  const [listings, setListings] = useState([])

  useEffect(() => {
    let url = 'http://127.0.0.1:8000/api/listings/?user=' + userID + '/'
    console.log(url)
    fetch(url, {
      'method': 'GET',
      headers: {
        'Content-type': 'application/json',
        // 'X-CSRFToken':'SCazQ7huOf4Rvk2YoFB1WQ2blyg0sbYGIUffnz0p4hrv9MDV54ACiMwOnAbZ82MU'

      }
    })
      .then(resp => resp.json())
      .then(resp => setListings(resp))
      .catch(error => console.log(error))
  }, [])

  return (
    <div className='listingView'>
      {listings.map((listing, index) => (
        <MyOwnListing key={index} header={listing.title} description={listing.description} publisher={listing.owner} type={listing.type}></MyOwnListing>
      ))}
    </div>
  )
}

export default MyOwnListingsHandler