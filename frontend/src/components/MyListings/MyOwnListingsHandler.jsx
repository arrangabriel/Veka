import React from 'react'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import MyOwnListing from './MyOwnListing';


const MyOwnListingsHandler = ({userID}) => {

  const [token, setToken] = useCookies()
  const [MyListings, setMyListings] = useState([])
  const [update,setUpdate]=useState(true)


  useEffect(() => {
    let url = 'http://127.0.0.1:8000/api/listings/?user=' + userID
    fetch(url, {
      'method': 'GET',
      headers: {
        'Authorization': 'Token ' + token.mytoken,
        'Content-type': 'application/json',
      },
      credentials: 'include',

    })
      .then(resp => resp.json())
      .then(resp => setMyListings(resp))
      .catch(error => console.log(error))
  },[userID,update])


  return (

    <div>
      {MyListings.map((Mylisting, index) => (
        <MyOwnListing key={index} header={Mylisting.title} description={Mylisting.description} publisher={Mylisting.usernam} type={Mylisting.event_type} id={Mylisting.id} interestedUsers={Mylisting.interested_users} setUpdate={setUpdate} sold={Mylisting.sold}></MyOwnListing>
      ))}
    </div>
  )
}

export default MyOwnListingsHandler