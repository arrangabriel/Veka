import React from 'react'
import { useState, useEffect } from 'react';
import Listing from './Listing';


const ListingHandler = () => {

    const [listings,setListings] = useState([])

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/listings/', {
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

  return (
    <div className='listingView'>
          {listings.map((listing, index)=>(
              <Listing key={index} header={listing.title} description={listing.description} publisher={listing.username} type={listing.type}></Listing>
          ))}
      </div>
  )
}

export default ListingHandler