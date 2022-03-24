import React from 'react'
import './Listing.css';
import fest from './img/fest.jpg'
import APIservice from '../../APIservice';
import { useCookies } from "react-cookie";
import { useState } from 'react';
import ListingView from './ListingView';

const Listing = ({header,date,description,img,publisher,type,id,interested,setListings}) => {

    const [cookies, setCookies] = useCookies()

    const handleShowInterest= (id)=>{
        APIservice.ShowInterest(id,cookies)
        setListings()
    }


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
                        <p className='card-text' style={{color:'green'}}><b>{type==='s' ? 'Til salgs' : 'Ønskes kjøpt'}</b></p>
                        <p className='card-text'>{publisher}</p>
                    </div>
                </div>
                <div className='listingButtonsDiv col-sm-3'>
                    <div className='container'>
                        <div className='row justify-content-end no-gutters'>
                            <button className="btn btn-primary">Besøk bruker</button>
                        </div>
                        <div className='row justify-content-end'>
                            {interested==='true'
                                ?<button value={id} className="btn btn-secondary" disabled>Interesse vist</button>
                                :<button value={id} className="btn btn-primary" onClick={e=>handleShowInterest(e.target.value)}>Meld interesse</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Listing 