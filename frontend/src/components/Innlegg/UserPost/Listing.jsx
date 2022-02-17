import React from 'react'
import './listing.css';

const Listing = ({header,date,description,img,publisher}) => {
  return (
    <div className='listing'>
      <h5>{header}</h5>
      <p>{date}</p>
      <p>{description}</p>
      <button>{publisher}</button>
    </div>
  )
}

export default Listing