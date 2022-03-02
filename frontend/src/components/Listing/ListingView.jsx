import React from 'react'
import data from '../data.json';
import Listing from './Listing';

import { useState, useEffect } from 'react';


const ListingView = () => {
  const [listings,setListings] = useState([])

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/listings2/', {
      'method':'GET',
      headers:{
        'Content-type':'application/json',
        // 'X-CSRFToken':'SCazQ7huOf4Rvk2YoFB1WQ2blyg0sbYGIUffnz0p4hrv9MDV54ACiMwOnAbZ82MU'

      }
    })
    .then(resp=>resp.json())
    .then(resp=>setListings(resp))
    .catch(error=>console.log(error))
  },[])

  console.log(listings)
  return (
    <div className='listingView'>
        {listings.map((listing, index)=>(
            <Listing key={index} header={listing.title} description={listing.description} publisher={listing.owner}></Listing>
        ))}
    </div>
  )
}

// date,description,img,publisher

export default ListingView