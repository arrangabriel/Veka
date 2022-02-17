import React from 'react'
import data from '../data.json';
import Listing from './Listing';


const ListingView = () => {
  return (
    <div>
        {data.map(innlegg=>(
            <Listing header={innlegg.event} description={innlegg.description} publisher={innlegg.publisher}></Listing>
        ))}
    </div>
  )
}

// date,description,img,publisher

export default ListingView