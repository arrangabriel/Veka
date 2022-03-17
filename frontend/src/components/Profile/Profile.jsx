import React from 'react'
import blank_profile from './img/blank_profile.png'
import ProfilePage from './ProfilePage'
import { useState } from 'react'
import EditProfile from './EditProfile'
import Popup from '../Popup/Popup'


const Profile = ({ first_name, last_name, bio, user, avatar, location }) => {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="container bcontent">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-sm">
                        <img className="card-img" src={blank_profile} alt="Profile picture"></img>
                    </div>
                    <div className="col-sm-5">
                        <div className="card-body">
                            <h5 className="card-title">{first_name} {last_name}</h5>
                            <p className="card-text">{bio}</p>
                            <p className="card-text">{location}</p>
                        </div>
                    </div>
                    <div className='listingButtonsDiv col-sm-3'>
                        <div className='container'>
                            <div className='row justify-content-end no-gutters'>
                                <button onClick={togglePopup} className="btn btn-primary">Rediger bruker</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <Popup
                content={<>
                    <EditProfile></EditProfile>
                </>}
                handleClose={togglePopup}
            />}
        </div>
    )
}

export default Profile