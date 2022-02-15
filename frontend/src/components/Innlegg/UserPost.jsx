import React from 'react'


const UserPost = () => {
  return (
    <form>
        <h3>Nytt innlegg</h3>

        <div className="form-group">
            <label>Tittel</label>
            <input type="text" className="form-control" placeholder="F.eks: 2 billetter til Rosenborg - Brann" />
        </div>

        <div className="form-group">
            <label>Pris</label>
            <input type="text" className="form-control" placeholder="Pris i kr" />
        </div>

        <div className="form-group">
            <label for="exampleFormControlSelect1">Arrangementtype</label>
            <select class="form-control" id="exampleFormControlSelect1">
                <option>Velg..</option>
                <option>Konsert</option>
                <option>Teater</option>
                <option>Fest</option>
            </select>
        </div>


        <div className="form-group">
            <label for="exampleFormControlSelect1">Sted</label>
            <select class="form-control" id="LocationSelect">
                <option>Velg..</option>
                <option>Oslo</option>
                <option>Bergen</option>
                <option>Trondheim</option>
            </select>
        </div>

        <div className="form-group">
            <label for="exampleFormControlSelect1">Antall billetter</label>
            <select class="form-control" id="TicketNumberSelect">
                <option>Velg..</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5+</option>
            </select>
        </div>

        {/* Bruke datepicker til å få dato på riktig format */}
        <div className="form-group">
            <label class="control-label" for="date">Dato for arrangementet</label>
            <input class="form-control" id="date" name="date" placeholder="MM/DD/YYY" type="text"/>
        </div>
        
        <div>
            <div class="col-sm-10">
                <div class="input-group">
                    <div class="input-group-addon">
                        <i class="fa fa-calendar">
                        </i>
                    </div>
                    <input class="form-control" id="date" name="date" placeholder="MM/DD/YYYY" type="text"/>
                </div>
            </div>
        </div>        
    
        <div className="form-group">
            <label for="exampleFormControlTextarea1">Mer om arrangementet</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <div class="form-group">
            <input type="file" class="custom-file-input" id="customFile"/>
            <label class="custom-file-label" for="customFile">Legg ved fil</label>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Publiser</button>
    </form>
  )
}

export default UserPost