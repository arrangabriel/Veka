import Listing from './Listing';
import Popup from '../Popup/Popup';
import { useState, useEffect } from 'react';
import CreateListing from './CreateListing';
import './ListingView.css'
import APIservice from '../../APIservice';

let state = {
  tilsalg: false,
  onskeskjopt: false,
  bergen: false,
  oslo: false,
  stavanger: false,
  trondheim: false,
  konsert: false,
  teater: false,
  festival: false
};

const handleChangedChx = (e) => {
  state[e.target.id] = e.target.checked
  console.log(state)
  useEffect('http://127.0.0.1:8000/api/listings/?location=oslo&location=bergen')
}




const ListingView = () => {

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [listings, setListings] = useState([])

  APIservice.getListings('')
  .then(resp=>resp.json())
  .then(resp=>console.log(resp))
  .then(error=>console.log(error))
  


  return (
    <div className='listingPage'>
      <div className='filterbox'>
        <h6>Velg kategori</h6>
        <input type="checkbox" id="listing_type=s" name="tilsalg" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="tilsalg">Til salg</label>
        <input type="checkbox" id="onskeskjopt" name="onskeskjopt"></input>
        <label htmlFor="onskeskjopt">Ønskes kjøpt</label>

        <h6>Sted</h6>
        <input type="checkbox" id="location=bergen" name="bergen"></input>
        <label htmlFor="bergen">Bergen</label>
        <input type="checkbox" id="location=oslo" name="oslo"></input>
        <label htmlFor="oslo">Oslo</label>
        <input type="checkbox" id="stavanger" name="stavanger"></input>
        <label htmlFor="stavanger">Stavanger</label>

        <h6>Arrangement</h6>
        <input type="checkbox" id="event_type=c" name="konsert"></input>
        <label htmlFor="konsert">Konsert</label>
        <input type="checkbox" id="teater" name="teater"></input>
        <label htmlFor="teater">Teater</label>
        <input type="checkbox" id="stavanger" name="festival"></input>
        <label htmlFor="festival">Festival</label>
      </div>

      <div className='listingView'>
        {listings.map((listing, index) => (
          <Listing key={index} header={listing.title} description={listing.description} publisher={listing.owner} type={listing.type}></Listing>
        ))}
      </div>
      {isOpen && <Popup
        content={<>
          <CreateListing></CreateListing>
        </>}
        handleClose={togglePopup}
      />}

      <button type="button" className="addListing btn btn-primary" onClick={togglePopup}>Nytt innlegg</button>
    </div>
  )
}

// date,description,img,publisher

export default ListingView