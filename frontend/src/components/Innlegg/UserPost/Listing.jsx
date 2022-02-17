import React from 'react'
import './listing.css';

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

  <div class="card mb-3">
  <h5 class="card-header">{header}</h5>
    <div class="card-body">
      <p class="card-text">{description}</p>
      <p class="card-text"><small class="text-muted">{date}</small></p>
      <button class="button1">{publisher}</button>
      <button class="intr button">Se annonse</button>
    </div>
  </div>
  )
}

export default Listing 