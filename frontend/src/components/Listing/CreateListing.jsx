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
                <input className="form-control" placeholder="Pris i kr" type="number" min="0" onkeydown="console.log('HEEEI')"/>
            </div>

            <div className="form-group">
                <label for="exampleFormControlSelect1">Arrangementtype</label>
                <select class="form-control" id="exampleFormControlSelect1" >
                    <option value="" disabled selected>Velg...</option>
                    <option>Konsert</option>
                    <option>Teater</option>
                    <option>Fest</option>
                </select>
            </div>

            <label htmlFor="Dato">Dato</label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

            <div className="form-group">
                <label for="exampleFormControlSelect1">Sted</label>
                <select class="form-control" id="LocationSelect">
                    <option value="" disabled selected>Velg...</option>
                    <option>Oslo</option>
                    <option>Bergen</option>
                    <option>Trondheim</option>
                </select>
            </div>

            <div className="form-group">
                <label for="exampleFormControlSelect1">Antall billetter</label>
                <select class="form-control" id="TicketNumberSelect">
                    <option value="" disabled selected>Velg...</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                </select>
            </div>

            <div className="form-group">
                <label for="exampleFormControlTextarea1">Mer om arrangementet</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" maxLength="150"></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Publiser</button>
        </form>
  )
}

export default UserPost