import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function UserSignIn (props) { 

    // Declare history variable.
    let history = useHistory();

    // Set State
    const [emailAddress, setemailAddress] = useState("");
    const [password, setpassword] = useState("");
    const [errors, setErrors] = useState([]);

    // Create a function that calls the handleSignIn function when the form is submitted.
    const submit = (event) => {
        event.preventDefault();
    
        // console.log('Submit')
    
        props.handleSignIn(emailAddress, password)
            .then((user) => {
                if (!user) {
                    setErrors([ 'Sign-in was unsuccessful' ]);
                } else {
                    history.push('/');
                }
            })
            .catch((error) => {
                let errorList = errors;
                errorList.push(error)
                setErrors(errorList);
                history.push('/error');
            });
    }

    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
            <h1>Sign In</h1>
                <div>
                    { errors !== [] && 
                        <ul className="validation--errors--label">{errors.map(error => { return <li key={'error' + error.index}><p>{error}</p></li> })}</ul>
                    }
                    <form>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" onChange={ e => setemailAddress(e.target.value) } placeholder="Email Address"/></div>
                    <div><input id="password" name="password" type="password" className="" onChange={ e => setpassword(e.target.value) } placeholder="Password"/></div>
                    <div className="grid-100 pad-bottom"><button className="button" onClick={submit} type="submit">Sign In</button><Link to="/" className="button button-secondary">Cancel</Link></div>
                    </form>
                </div>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </div>
        </div>
    );
}