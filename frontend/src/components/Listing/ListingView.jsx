import Listing from './Listing';
import Popup from '../Popup/Popup';
import { useState, useEffect } from 'react';
import CreateListing from './CreateListing';
import './ListingView.css'


const ListingView = () => {

  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [listings,setListings] = useState([])

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/listings/', {
      'method':'GET',
      headers:{
        'Content-type':'application/json',
        // 'X-CSRFToken':'SCazQ7huOf4Rvk2YoFB1WQ2blyg0sbYGIUffnz0p4hrv9MDV54ACiMwOnAbZ82MU'

      }
    })
    .then(resp=>resp.json())
    .then(resp=>setListings(resp))
    .catch(error=>console.log(error))
  },[])


  
  return (
    <div className='listingPage'>
      <div className='filterbox container'>
          <h6>Velg kategori</h6>
          <input type="checkbox" id="tilsalg" name="tilsalg"></input>
          <label htmlFor="tilsalg">Til salg</label>
          <input type="checkbox" id="onskeskjopt" name="onskeskjopt"></input>
          <label htmlFor="onskeskjopt">Ønskes kjøpt</label>
          <br/>
          <br/>

          <h6>Sted</h6>
          <input type="checkbox" id="bergen" name="bergen"></input>
          <label htmlFor="bergen">Bergen</label>
          <input type="checkbox" id="oslo" name="oslo"></input>
          <label htmlFor="oslo">Oslo</label>
          <input type="checkbox" id="stavanger" name="stavanger"></input>
          <label htmlFor="stavanger">Stavanger</label>
          <br/>
          <br/>
          <h6>Arrangement</h6>
          <input type="checkbox" id="konsert" name="konsert"></input>
          <label htmlFor="konsert">Konsert</label>
          <input type="checkbox" id="teater" name="teater"></input>
          <label htmlFor="teater">Teater</label>
          <input type="checkbox" id="stavanger" name="festival"></input>
          <label htmlFor="festival">Festival</label> 
      </div>

      <div className='listingView'>
          {listings.map((listing, index)=>(
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