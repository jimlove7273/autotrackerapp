import React, { useState, useEffect } from 'react'

import firebase from '../firebase'

import Form from './Form'
import Table1 from './Table1'

export const Home = () => {
	const [dataupdated, setDataupdated] = useState(false)
	const [autorec, setAutorec] = useState([])

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {

			if (!user) {
				console.log("Not Logged In")
				window.location.href = "/login"
				//return <Redirect to="/login" />
			}

			if (user && user.emailVerified === false) {
				//return <Redirect to={"/verifyemail?email=" + user.email} />
				window.location.href = "/verifyemail?email=" + user.email 
			}

			if (user) {
				console.log("Logged In...", user)
				console.log("Email: " + user.email)
				console.log("Verified: " + user.emailVerified)
			}

		})
	}, [])


	const logout = () => {
		firebase.auth().signOut()
		window.location.reload(false)
	}

	return (

		<div className="container">
			<div className="header">
				<h1 className="my3">My Subaru Maintenance Tracker!</h1>
				<div>
					<button className="btn btn-primary" onClick={logout}>Logout</button>
				</div>
			</div>
			<div className="grid grid-sm-gap grid-nav-content">
				<div className="gridform">
					<Form
						dataupdated={dataupdated}
						setDataupdated={setDataupdated}
						autorec={autorec}
						setAutorec={setAutorec}
					/>
				</div>
				<div className="gridtable">
					<Table1
						dataupdated={dataupdated}
						setDataupdated={setDataupdated}
						autorec={autorec}
						setAutorec={setAutorec}
					/>
				</div>
			</div>
		</div>

	)


}

export default Home