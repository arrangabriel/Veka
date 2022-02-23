import data from '../data.json';
import Listing from './Listing';
import Popup from '../Popup/Popup';
import { useState } from 'react';
import CreateListing from './CreateListing';
import './ListingView.css'




const ListingView = () => {

  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  
  return (
    <div>
      <div className='filterbox'>
          <h6>Velg kategori</h6>
          <input type="checkbox" id="tilsalg" name="tilsalg"></input>
          <label for="tilsalg">Til salg</label>
          <input type="checkbox" id="onskeskjopt" name="onskeskjopt"></input>
          <label for="onskeskjopt">Ønskes kjøpt</label>

          <h6>Sted</h6>
          <input type="checkbox" id="bergen" name="bergen"></input>
          <label for="bergen">Bergen</label>
          <input type="checkbox" id="oslo" name="oslo"></input>
          <label for="oslo">Oslo</label>
          <input type="checkbox" id="stavanger" name="stavanger"></input>
          <label for="stavanger">Stavanger</label>

          <h6>Arrangement</h6>
          <input type="checkbox" id="konsert" name="konsert"></input>
          <label for="konsert">Konsert</label>
          <input type="checkbox" id="teater" name="teater"></input>
          <label for="teater">Teater</label>
          <input type="checkbox" id="stavanger" name="festival"></input>
          <label for="festival">Festival</label> 
      </div>

        {data.map((innlegg, index)=>(
            <Listing key={index} header={innlegg.event} description={innlegg.description} publisher={innlegg.publisher}></Listing>
        ))}


        {isOpen && <Popup
          content={<>
            <CreateListing></CreateListing>
          </>}
          handleClose={togglePopup}
        />}


        <input
          type="button"
          value="Klikk her for å legge ut innlegg"
          onClick={togglePopup}
        />
    </div>
  )
}

// date,description,img,publisher

export default ListingView