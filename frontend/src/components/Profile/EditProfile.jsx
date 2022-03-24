import React from 'react'
import APIservice from '../../APIservice'
import { useState } from 'react'

const EditProfile = ({userID, token}) => {

    // Får ikke inn verdier for userID og token fra ProfilePage

    const [firstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');

    
    const editUser = () => {

        let body = {
            first_name: firstName,
            last_name: LastName,
            bio: bio,
            location: location

        }


        APIservice.EditUser(body, userID, token)
        .then(resp => console.log(resp))
    }

    return (
        <div>

            <div className="form-group">
                <label>Fornavn</label>
                <input value={firstName} onInput={e => setFirstName(e.target.value)} type="text" className="form-control" placeholder="Fornavn" required="required" maxLength="40" />
            </div>

            <div className="form-group">
                <label>Etternavn</label>
                <input value={LastName} onInput={e => setLastName(e.target.value)} type="text" className="form-control" placeholder="Etternavn" required="required" maxLength="40" />
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Bio</label>
                <textarea value={bio} onInput={e => setBio(e.target.value)} type="text" className="form-control" maxLength="150" rows="3" ></textarea>
            </div>

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

            <button onClick={editUser} type="submit" className="btn btn-primary btn-block">Publiser</button>

        </div>
    )
}

export default EditProfile