import React from 'react'
import { useState, useEffect } from 'react';
import MyOwnListing from './MyOwnListing';


const MyOwnListingsHandler = ({userID}) => {

  const [MyListings, setMyListings] = useState([])

  useEffect(() => {
    let url = 'http://127.0.0.1:8000/api/listings/?user=' + userID
    fetch(url, {
      'method': 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    })
      .then(resp => resp.json())
      .then(resp => setMyListings(resp))
      .catch(error => console.log(error))
  },[userID])

  return (

    <div>
      {MyListings.map((Mylisting, index) => (
        <MyOwnListing key={index} header={Mylisting.title} description={Mylisting.description} publisher={Mylisting.usernam} type={Mylisting.event_type}></MyOwnListing>
      ))}
    </div>
  )
}

export default MyOwnListingsHandler