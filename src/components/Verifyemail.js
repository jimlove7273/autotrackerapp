import React, { useState, useEffect } from 'react'
import firebase from '../firebase'

const Verifyemail = () => {

	const [sendtoemail, setSendtoemail] = useState('')
	const [emailsent, setEmailsent] = useState(false)

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {

			if (user) {
				console.log("Logged In...", user)
				console.log("Email: " + user.email)
				console.log("Verified: " + user.emailVerified)
				setSendtoemail(user.email)
			}

			if (user.emailVerified === false) {
				console.log("Here")
				//return <Redirect to={"/verifyemail?email=" + user.email} />
			}

		})
	}, [])

	const sendVerifyEmail = () => {
		firebase.auth().currentUser.sendEmailVerification({
			url: 'http://localhost:1234/',
			handleCodeInApp: false
		})
			.then(() => {
				window.localStorage.setItem('emailForSignIn', sendtoemail)
				setEmailsent(true)
			})
			.catch((error) => {
				console.log("Error", error)
			})
	}

	const logout = () => {
		firebase.auth().signOut()
		window.location.href = '/login'
	}

	return (
		<div style={{ marginTop: "40px" }}>
			{emailsent &&
				<div className="infobox infobox-success">
					An email was sent to you, please click the link in the email to complete the verification process.
                </div>
			}
			<div className="logincontainer">
				<h2 className="mb4">Verify Email</h2>
				<p>
					Your email needs to be verified in order to use this app.  You can click "<b>Verify My Email</b>" button
					below to have verification email sent to you.  Please check the link in the email sent to you.  Once you
                  are verified, you can start using the application.<br /><br />

                  If you do not wish to proceed, you can click the Logout button on the right and re-login.
                </p><br /><br />

				<button onClick={sendVerifyEmail} className="btn btn-primary">Verify My Email</button>
				<button onClick={logout} className="btn btn-success pull-right">Logout</button>
			</div>
		</div>
	)
}

export default Verifyemail
