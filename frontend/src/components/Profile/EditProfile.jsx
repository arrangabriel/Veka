import React from 'react'
import APIservice from '../../APIservice'
import Popup from '../Popup/Popup'

const EditProfile = ({userID, token}) => {

    const edit = () => {

        APIservice.EditUser(userID, token)
        .then(resp => console.log(resp))
    }

    return (
        <div>
            <h1>Hei</h1>
        </div>
    )
}

export default EditProfile