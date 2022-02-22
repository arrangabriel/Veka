import React from 'react'
import './Listing.css';

const Listing = ({header,date,description,img,publisher}) => {
  return (
  //   <div className='listing'>
  //     <h5>{header}</h5>
  //     <p>{date}</p>
  //     <p>{description}</p>
  //     <button>{publisher}</button>
  //   </div>
  // )

// se her for andre versjoner av card klassene: https://getbootstrap.com/docs/4.0/components/card/

  <div className="card mb-3">
  <h5 className="card-header">{header}</h5>
    <div className="card-body">
      <p className="card-text">{description}</p>
      <p className="card-text"><small className="text-muted">{date}</small></p>
      <button className="button1">{publisher}</button>
      <button className="intr button">Se annonse</button>
    </div>
  </div>
  )
}

export default Listing 