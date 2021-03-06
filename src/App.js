import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
//import { AutoContexts } from './contexts/AutoContexts'
import {  AutoProvider } from './contexts/AutoContexts'

import '../src/ui.css'
import '../src/index.css'

import firebase from './firebase'

import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Verifyemail from './components/Verifyemail'
import Logout from './components/Logout'

const App = React.memo((ckemailVerified) => {
	const [loggedinuser, setLoggedinUser] = useState('')
	const [emailVerified, setEmailVerified] = useState(false)
	const [rendered, setRendered] = useState(false)

//	const auto = useContext(AutoContexts)
//	auto.somefunction()

    useEffect( () => {
        firebase.auth().onAuthStateChanged((user) => {
			debugger
            if (user) { 

			console.log("Logged In User")
			// eslint-disable-next-line
			ckemailVerified = user.emailVerified
			setEmailVerified(user.emailVerified)
			setLoggedinUser(user.email)
			setRendered(true)

			console.log("APP user", user)
			console.log("APP useremail", user.email)
			console.log("APP loggedin", loggedinuser)
			console.log("APP Length", loggedinuser.length)
			console.log("APP verified 1", emailVerified)
			console.log("APP verified 2", user.emailVerified)
			console.log("APP ckemailverified", ckemailVerified)

            } else {

			console.log("ckemailVerified", emailVerified)
			setEmailVerified(false)
			setLoggedinUser('')
			console.log("Not Logged In")
			setRendered(true)
			//return <Redirect to='/login'  />

			}
		})

    }, [])

    return (
        <AutoProvider>
            <Router>
                <Switch>
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/verifyemail" component={Verifyemail} />
                    <Route exact path="/logout" component={Logout} />
					<Route exact path="/login" component={Login} />

					{ loggedinuser.length <= 0 && rendered && <Route exact path="/" component={Login} /> }
					{ loggedinuser.length > 0 && !ckemailVerified && rendered && <Route exact path="/" component={Verifyemail} /> }
					{ loggedinuser.length > 0 && ckemailVerified && rendered && <Route exact path="/" component={Home} /> }

                </Switch>  
            </Router>
        </AutoProvider>
    )
})

export default App
