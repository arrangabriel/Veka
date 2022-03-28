import React from 'react'
import './MyOwnListing.css';
import fest from './img/fest.jpg'
import APIservice from '../../APIservice';
import {useCookies} from "react-cookie";
import Popup from '../Popup/Popup';
import { useState } from 'react';

const MyOwnListing = ({header,date,description,img,publisher,type, id, interestedUsers}) => {

    const [cookies, setCookies] = useCookies()
    const [interestedProfiles, setInterestedProfiles] = useState([])

    const handleSold = (id) => {
        APIservice.SetAsSold(id, cookies)
    }

    const getInterestedUser = (interestedUsers, token) => {
        setInterestedProfiles([])    
        interestedUsers.map((interestedUser) => (
            APIservice.getUser(interestedUser, token)
            .then(resp=>resp.json())
            .then(resp=>setInterestedProfiles(oldArray => [...oldArray, resp]))
        ))
    }

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
        getInterestedUser(interestedUsers, cookies);
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
                        <p className='card-text' style={{color:'green'}}>{type==='b' ? 'Til salgs' : 'Ønskes kjøpt'}</p>
                        <p className='card-text'>{publisher}</p>
                    </div>
                </div>
                <div className='listingButtonsDiv col-sm-3'>
                    <div className='container'>
                        <div className='row justify-content-end no-gutters'>
                            <button className="btn btn-primary" onClick={togglePopup}>Vis interesserte</button>
                        </div>
                        <div className='row justify-content-end'>
                            <button value={id} className="btn btn-primary" onClick={e=>handleSold(e.target.value)}>Marker som solgt</button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <Popup
                content={<>
                <h2>Interesserte brukere</h2>
                {Object.keys(interestedProfiles).length === 0
                    ?<h4>Ingen brukere interessert</h4>
                    :<>
                    {interestedProfiles.map((profile, index)=> (
                            <h4 key={index}>Brukernavn: {profile.user.username}  Email: {profile.user.email}</h4>
                        ))}
                </>
                }
                </>}
                handleClose={togglePopup}
            />}
        </div>
    </div>
  )
}

export default MyOwnListing 