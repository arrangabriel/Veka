import Listing from './Listing';
import Popup from '../Popup/Popup';
import { useEffect, useState} from 'react';
import CreateListing from './CreateListing';
import './ListingView.css'
import APIservice from '../../APIservice';


const ListingView = ({token}) => { 

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [listings, setListings] = useState([])

  const [sorting, setSorting] =useState('date')
  const handleSort = (e)=>{
    let {name,value}=e.target
    setSorting(value)
  }
  const [state, setState] = useState({})

  const handleChangedChx = (e) => {
    setState(prevState => ({
      ...prevState,
      [e.target.id]: e.target.checked
    }));
  }

  const [update,setUpdate]=useState(true)
  const handleInterest=()=>{
    setUpdate(!update)
  }


  useEffect(()=>{
    let params='?'
  
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
  },[state,sorting,token,update]
  )
  console.log(listings)
  
  
  


  return (
    <div className='listingPage'>
      <div className='filterbox'>
        <h6>Velg kategori</h6>
        <input type="checkbox" id="listing_type=s" name="tilsalg" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="tilsalg">Til salg</label><br/>
        <input type="checkbox" id="listing_type=b" name="onskeskjopt" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="onskeskjopt">Ønskes kjøpt</label><br/>
        <br/>
        <br/>
        <h6>Sted</h6>
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
        <h6>Arrangement</h6>
        <input type="checkbox" id="event_type=c" name="konsert" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="konsert">Konsert</label><br/>
        <input type="checkbox" id="event_type=t" name="teater" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="teater">Teater</label><br/>
        <input type="checkbox" id="event_type=f" name="festival" onChange ={e => handleChangedChx(e)}></input>
        <label htmlFor="festival">Festival</label> <br/>

        <br/>
        <br/>
        <h6>Sortering</h6>
        <select defaultValue="" className="form-select" aria-label="Default select example" onChange={e=>handleSort(e)}>
          {/* setSorting(e.target.name) */}
          <option value="date">Dato</option>
          <option value="-price">Pris Høy-Lav</option>
          <option value="price">Pris Lav-Høy</option>
          <option value="-date">Senest først</option>
        </select>
      </div>

      <div className='listingView'>
        {listings.map((listing, index) => (
          <Listing owner={listing.owner.id} key={index} header={listing.title} description={listing.description} publisher={listing.username} type={listing.listing_type} id={listing.id} interested={listing.interested} setListings={handleInterest}></Listing>
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