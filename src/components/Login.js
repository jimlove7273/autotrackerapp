import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from '../firebase'

const Login = ({ history }) => {

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    return (
        <div className="logincontainer" style={{marginTop: "40px"}}>
            <h2 className="mb4">Log in</h2>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input name="email" type="email" placeholder="Email" />
                <label>Password</label>
                <input name="password" type="password" placeholder="Password" />
                <br /><br />
                <button className="btn btn-primary" type="submit">Log in</button>
                <a className="btn btn-success pull-right" href="/signup">Sign Up</a>
            </form>
        </div>
    );
};

export default withRouter(Login);