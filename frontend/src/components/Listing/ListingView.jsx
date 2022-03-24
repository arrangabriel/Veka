import Listing from './Listing';
import Popup from '../Popup/Popup';
import { useState, useEffect } from 'react';
import CreateListing from './CreateListing';
import './ListingView.css'


const ListingView = ({token}) => { 

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [listings, setListings] = useState([])

  useEffect(() => {
    let params = '?'

    for(const key in state){
      if(state[key]){
        params += key + '&'
      }
    }

    params+='sort='+sorting
    params+='&ignore_self'

    APIservice.getListings(params,token)
    .then(resp=>resp.json())
    .then(resp=>setListings(resp))
  },[state,sorting,token]
  )
  
  
  


  return (
    <div className='listingPage'>
      <div className='filterbox container'>
          <h6>Velg kategori</h6>
          <input type="checkbox" id="tilsalg" name="tilsalg"></input>
          <label htmlFor="tilsalg">Til salg</label> <br/>
          <input type="checkbox" id="onskeskjopt" name="onskeskjopt"></input>
          <label htmlFor="onskeskjopt">Ønskes kjøpt</label><br/>
          <br/>
          <br/>

          <h6>Sted</h6>
          <input type="checkbox" id="bergen" name="bergen"></input>
          <label htmlFor="bergen">Bergen</label><br/>
          <input type="checkbox" id="oslo" name="oslo"></input>
          <label htmlFor="oslo">Oslo</label><br/>
          <input type="checkbox" id="stavanger" name="stavanger"></input>
          <label htmlFor="stavanger">Stavanger</label><br/>
          <input type="checkbox" id="trondheim" name="trondheim"></input>
          <label htmlFor="stavanger">Trondheim</label><br/>
          <br/>
          <br/>
          <h6>Arrangement</h6>
          <input type="checkbox" id="konsert" name="konsert"></input>
          <label htmlFor="konsert">Konsert</label><br/>
          <input type="checkbox" id="teater" name="teater"></input>
          <label htmlFor="teater">Teater</label><br/>
          <input type="checkbox" id="stavanger" name="festival"></input>
          <label htmlFor="festival">Festival</label> <br/>
      </div>

      <div className='listingView'>
        {listings.map((listing, index) => (
<<<<<<< HEAD
          <Listing key={index} header={listing.title} description={listing.description} publisher={listing.owner} type={listing.type}></Listing>
=======
          <Listing key={index} header={listing.title} description={listing.description} publisher={listing.username} type={listing.listing_type} id={listing.id}></Listing>
>>>>>>> b1d0eaf484243eff556bf257e7e3dd8d29fd227d
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