import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from '../firebase'

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div className="logincontainer" style={{marginTop: "40px"}}>
            <h2 className="mb4">Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <label>Email</label>
                <input name="email" type="email" placeholder="Email" />
                <label>Password</label>
                <input name="password" type="password" placeholder="Password" />
                <button className="btn btn-primary"  type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default withRouter(SignUp);