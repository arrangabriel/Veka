import React from 'react'
import './Listing.css';
import fest from './img/fest.jpg'
import APIservice from '../../APIservice';
import { useCookies } from "react-cookie";
import { useState } from 'react';
import ListingView from './ListingView';
import Popup from '../Popup/Popup';
import UserProfile from '../Profile/UserProfile';

const Listing = ({header,date,description,img,publisher,type,id,interested,setListings,owner}) => {

    const [cookies, setCookies] = useCookies()

    const handleShowInterest= (id)=>{
        APIservice.ShowInterest(id,cookies)
        setListings()
    }

    const handleVisitOwner=(ownerId)=>{
        togglePopup();
    }

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
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
                        <p className='card-text' style={{color:'green'}}>{type==='b' ? 'Ønskes kjøpt' : 'Til salgs'}</p>
                        <p className='card-text'>{publisher}</p>
                    </div>
                </div>
                <div className='listingButtonsDiv col-sm-3'>
                {(typeof(cookies.mytoken)==='undefined')?
                ''
                :<>
                    <div className='container'>
                        <div className='row justify-content-end no-gutters'>
                            <button value={owner} className="btn btn-primary" onClick={e=>handleVisitOwner(e.target.value)}>Besøk bruker</button>
                        </div>
                        <div className='row justify-content-end'>
                            {interested==='true'
                                ?<button value={id} className="btn btn-success" disabled>Interesse vist</button>
                                :<button value={id} className="btn btn-success" onClick={e=>handleShowInterest(e.target.value)}>Meld interesse</button>
                            }
                        </div>
                    </div>
                </>}
                </div>
            </div>
        </div>

        {isOpen && <Popup
        content={<>
          <UserProfile ownerId={owner} togglePopup={togglePopup}></UserProfile>
        </>}
        handleClose={togglePopup}
      />}

    </div>
  )
}

export default Listing 