import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function CreateCourse (props) {

    // Declare history variable.
    let history = useHistory();

    // Set State
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ estimatedTime, setEstimatedTime ] = useState(null);
    const [ materialsNeeded, setMaterialsNeeded ] = useState("");
    const [errors, setErrors] = useState([]);

    const handleCreation = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                <div>
                    { errors !== [] && <h2 className="validation--errors--label">Validation errors</h2> &&
                        <ul className="validation--errors--label">{errors.map(error => { return <li key={'error' + error.index}><p>{error}</p></li> })}</ul>
                    }
                </div>
                <form>
                    <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div><input id="title" name="title" type="text" className="input-title course--title--input" onChange={ e => setTitle(e.target.value) } placeholder="Course title..."/></div>
                        <p>{props.authenticatedUser.firstName + " " + props.authenticatedUser.lastName}</p>
                    </div>
                    <div className="course--description">
                        <div><textarea id="description" name="description" className="" onChange={ e => setDescription(e.target.value) } placeholder="Course description..."></textarea></div>
                    </div>
                    </div>
                    <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" onChange={ e => setEstimatedTime(e.target.value) } placeholder="Hours"/></div>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div><textarea id="materialsNeeded" name="materialsNeeded" className="" onChange={ e => setMaterialsNeeded(e.target.value) } placeholder="List materials..."></textarea></div>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="grid-100 pad-bottom"><button className="button" onClick={e => handleCreation(e)} type="submit">Create Course</button><Link to="/" className="button button-secondary">Cancel</Link></div>
                </form>
                </div>
            </div>
        </div>
    );

}