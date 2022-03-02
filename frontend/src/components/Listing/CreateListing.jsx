import React, { useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"


const UserPost = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <form>
            <h3>Nytt innlegg</h3>

            <div className="form-group">
                <label>Tittel</label>
                <input type="text" className="form-control" placeholder="F.eks: 2 billetter til Rosenborg - Brann" required="required" maxLength="40"/>
            </div>

            <div className="form-group">
                <label>Pris</label>
                <input className="form-control" placeholder="Pris i kr" type="number" min="0"/>
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Arrangementtype</label>
                <select defaultValue="" className="form-control" id="exampleFormControlSelect1" >
                    <option value="" disabled>Velg...</option>
                    <option>Konsert</option>
                    <option>Teater</option>
                    <option>Fest</option>
                </select>
            </div>

            <label htmlFor="Dato">Dato</label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Sted</label>
                <select defaultValue="" className="form-control" id="LocationSelect">
                    <option value="" disabled>Velg...</option>
                    <option>Oslo</option>
                    <option>Bergen</option>
                    <option>Trondheim</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Antall billetter</label>
                <select defaultValue="" className="form-control" id="TicketNumberSelect">
                    <option value="" disabled>Velg...</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Mer om arrangementet</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" maxLength="150"></textarea>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
                <label className="form-check-label" for="flexRadioDefault2">
                    Til salg
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked></input>
                <label className="form-check-label" for="flexRadioDefault2">
                    Ønskes kjøpt
                </label>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Publiser</button>
        </form>
  )
}

export default UserPost