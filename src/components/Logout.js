import React, { useEffect } from 'react'
import firebase from '../firebase'
import { Redirect } from 'react-router-dom'

const Logout = () => {

    useEffect(() => {
        firebase.auth().signOut()
        return <Redirect to={"/"} />
    }, [])

    return (
        <div>
            Logout
        </div>
    )
}

export default Logout
