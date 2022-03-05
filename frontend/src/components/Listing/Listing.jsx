import React from 'react'
import './Listing.css';
import fest from './img/fest.jpg'

const Listing = ({header,date,description,img,publisher,type}) => {
  return (
  //   <div className='listing'>
  //     <h5>{header}</h5>
  //     <p>{date}</p>
  //     <p>{description}</p>
  //     <button>{publisher}</button>
  //   </div>
  // )

// se her for andre versjoner av card klassene: https://getbootstrap.com/docs/4.0/components/card/

  // <div className="card mb-3">
  // <h5 className="card-header">{header}</h5>
  //   <div className="card-body">
  //     <p className="card-text">{description}</p>
  //     <p className="card-text"><small className="text-muted">{date}</small></p>
  //     <button className="button1">{publisher}</button>
  //     <button className="intr button">Se annonse</button>
  //   </div>
  // </div>


  <div className="container bcontent">
        <div className="card"> 
            <div className="row no-gutters">
                <div className="col-sm">
                    <img className="card-img" src={fest} alt="Awesome Party"></img>
                </div>
                <div className="col-sm-5">
                    <div className="card-body">
                        <h5 className="card-title">{header}</h5>
                        <p className="card-text">{description}</p>
                        <p className='card-text' style={{color:'green'}}>{type==='b' ? 'Til salgs' : 'Ønskes kjøpt'}</p>
                    </div>
                </div>
                <div className='listingButtonsDiv col-sm-3'>
                    <div className='container'>
                        <div className='row justify-content-end no-gutters'>
                            <button className="btn btn-primary">Besøk bruker</button>
                        </div>
                        <div className='row justify-content-end'>
                            <button className="btn btn-primary">Meld interesse</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Listing 