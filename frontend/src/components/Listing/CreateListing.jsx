import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import APIservice from "../../APIservice";
import { useCookies } from 'react-cookie'

import "react-datepicker/dist/react-datepicker.css"


const UserPost = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [eventType, setEventType] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [numTickets, setNumTickets] = useState('');
    const [description, setDescription] = useState('');
    const [listingType, setListingType] = useState('');

    const [token, setToken] = useCookies(['mytoken'])

    const SendRequest = () => {
        let body = {
            title: title,
            description: description,
            date: startDate.toISOString().split('T')[0],
            location: location,
            listing_type: listingType,
            event_type: eventType,
            price: parseInt(price)
        };

        APIservice.CreateListings(body, token)
            .then(resp => console.log(resp))
    }
    return (
        <div>
            <h3>Nytt innlegg</h3>

            <div className="form-group">
                <label>Tittel</label>
                <input value={title} onInput={e => setTitle(e.target.value)} type="text" className="form-control" placeholder="F.eks: 2 billetter til Rosenborg - Brann" required="required" maxLength="40" />
            </div>

            <div className="form-group">
                <label>Pris</label>
                <input value={price} onInput={e => setPrice(e.target.value)} className="form-control" placeholder="Pris i kr" type="number" min="0" />
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Arrangementtype</label>
                <select defaultValue="" onChange={e => setEventType(e.target.value)} className="form-control" id="exampleFormControlSelect1" >
                    <option value="" disabled="disabled">Velg...</option>
                    <option value="c">Konsert</option>
                    <option value="t">Teater</option>
                    <option value="p">Fest</option>
                </select>
            </div>

            <label htmlFor="Dato">Dato</label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Sted</label>
                <select defaultValue="" onChange={e => setLocation(e.target.value)} className="form-control" id="LocationSelect">
                    <option value="" disabled>Velg...</option>
                    <option value="oslo">Oslo</option>
                    <option value="bergen">Bergen</option>
                    <option value="trondheim">Trondheim</option>
                    <option value="stavanger">Stavanger</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Antall billetter</label>
                <select defaultValue="" onChange={e => setNumTickets(e.target.value)} className="form-control" id="TicketNumberSelect">
                    <option value="" disabled>Velg...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5+">5+</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Mer om arrangementet</label>
                <textarea value={description} onInput={e => setDescription(e.target.value)} type="text" className="form-control" maxLength="150" rows="3" ></textarea>
            </div>
            <div onChange={e => setListingType(e.target.value)} className="form-check">
                <input type="radio" value="b" name="listingType" /> Ønskes kjøpt <br></br>
                <input type="radio" value="s" name="listingType" /> Selges
            </div>
            <button onClick={SendRequest} type="submit" className="btn btn-primary btn-block">Publiser</button>
        </div >
    )
}

export default UserPost