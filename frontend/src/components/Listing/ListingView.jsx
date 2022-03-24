import Listing from './Listing';
import Popup from '../Popup/Popup';
import { useState} from 'react';
import CreateListing from './CreateListing';
import './ListingView.css'
import APIservice from '../../APIservice';

const ListingView = () => {

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [listings, setListings] = useState([])

  APIservice.getListings('')
  .then(resp=>resp.json())
  .then(resp=>setListings(resp))
  .then(error=>console.log(error))

  let state = {
  };
  
  const handleChangedChx = (e) => {
    state[e.target.id] = e.target.checked
    console.log(state)
    let params='?'
    
    for(const key in state){
      console.log(state[key])
      if(state[key]){
        params += key + '&'
      }
    }
  
    console.log(params)
    APIservice.getListings(params)
    .then(resp=>resp.json())
    .then(resp=>setListings(resp))
    .then(error=>console.log(error))
  }
  


  return (
    <div className='listingPage'>
      <div className='filterbox'>
        <h6>Kategori:</h6>
        <input type="checkbox" id="listing_type=s" name="tilsalg" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="tilsalg">Til salg</label><br/>
        <input type="checkbox" id="listing_type=b" name="onskeskjopt" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="onskeskjopt">Ønskes kjøpt</label><br/>
        <br/>
        <br/>
        <h6>Sted:</h6>
        <input type="checkbox" id="location=bergen" name="bergen" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="bergen">Bergen</label><br/>
        <input type="checkbox" id="location=oslo" name="oslo" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="oslo">Oslo</label><br/>
        <input type="checkbox" id="location=stavanger" name="stavanger" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="stavanger">Stavanger</label><br/>
        <input type="checkbox" id="location=trondheim" name="trondheim" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="stavanger">Trondheim</label><br/>
        <br/>
        <br/>
        <h6>Arrangement:</h6>
        <input type="checkbox" id="event_type=c" name="konsert" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="konsert">Konsert</label><br/>
        <input type="checkbox" id="event_type=t" name="teater" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="teater">Teater</label><br/>
        <input type="checkbox" id="event_type=f" name="festival" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="festival">Festival</label> <br/>
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