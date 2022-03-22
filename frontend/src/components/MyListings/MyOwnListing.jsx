import React from 'react'
import './MyOwnListing.css';
import fest from './img/fest.jpg'

const MyOwnListing = ({header,date,description,img,publisher,type}) => {
  return (
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
                        <p className='card-text'>{publisher}</p>
                    </div>
                </div>
                <div className='listingButtonsDiv col-sm-3'>
                    <div className='container'>
                        <div className='row justify-content-end no-gutters'>
                            <button className="btn btn-primary">Besøk bruker</button>
                        </div>
                        <div className='row justify-content-end'>
                            <button className="btn btn-primary">Marker som solgt</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyOwnListing 