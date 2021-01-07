import React from 'react';
import { Link } from 'react-router-dom';

export default function Header (props) {
    return (
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    {props.authenticatedUser ? (
                        <React.Fragment>
                            <span>Welcome, {props.authenticatedUser.firstName + " " + props.authenticatedUser.lastName}!</span>
                            <Link to="/signout">Sign Out</Link>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Link to="/signup" className="signup">Sign Up</Link>
                            <Link to="/signin" className="signin">Sign In</Link>
                        </React.Fragment>
                    )}
                </nav>
            </div>
        </div>
    );
}
