import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserSignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailAddress: '',
            password: '',
            errors: [],
        }
    }    
    
    render() {
        const {
            emailAddress,
            password,
            errors,
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                    <div>
                        <form>
                        <div><input id="emailAddress" name="emailAddress" type="text" className="" onChange={ this.change } placeholder="Email Address"/></div>
                        <div><input id="password" name="password" type="password" className="" onChange={ this.change } placeholder="Password"/></div>
                        <div className="grid-100 pad-bottom"><button className="button" onClick={this.submit} type="submit">Sign In</button><Link to="/" className="button button-secondary">Cancel</Link></div>
                        </form>
                    </div>
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    }

    // Create a function that signs in a user.
    submit = (event) => {
        event.preventDefault();

        // console.log('Submit')

        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;
    
        this.props.handleSignIn(emailAddress, password)
          .then((user) => {
            if (!user) {
              this.setState(() => {
                return { errors: [ 'Sign-in was unsuccessful' ] };
              });
            } else {
              this.props.history.push(from);
            }
          })
          .catch((error) => {
            console.error(error);
            this.props.history.push('/error');
          });
      }

    // Create Change function for use by the form inputs.
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
            [name]: value
            };
        });
    }
}