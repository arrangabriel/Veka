import React from 'react'
import APIservice from '../../APIservice'
import Popup from '../Popup/Popup'

const EditProfile = ({userID}) => {

    const edit = () => {

        APIservice.EditUser()
    }

    return (
        <div>
            <h1>ASDFGHJKLØ</h1>
        </div>
    )
}

export default EditProfile