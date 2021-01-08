import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function UpdateCourse (props) {

    // Declare history variable.
    let history = useHistory();
    
    // Declare id variable.
    const { id } = useParams();

    // Set State
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ estimatedTime, setEstimatedTime ] = useState(null);
    const [ materialsNeeded, setMaterialsNeeded ] = useState("");
    const [errors, setErrors] = useState([]);
    
    // Fetch the course data from the Api
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            await axios.get(`http://localhost:5000/api/courses/${id}`)
                .then((res) => {
                    if (res.data.course === null && res.status === 200) {
                        history.push("/notfound");
                    } else if (props.authenticatedUser === null || props.authenticatedUser.id !== res.data.course.User.id) {
                        history.push(`/forbidden`);
                    }

                    console.log(res.data);

                    setTitle(res.data.course.title);
                    setDescription(res.data.course.description);
                    setEstimatedTime(res.data.course.estimatedTime);
                    setMaterialsNeeded(res.data.course.materialsNeeded);
                })
                .catch(err=>{
                    console.log(err);
                    history.push("/error");
            });
        }
        fetchData();
        return () => { isMounted = false };
    }, [id, history, props.authenticatedUser]);

    // Create a function that handles creating a course with our api.
    const handleUpdate = async (e) => {
        e.preventDefault();

        await axios.put(`http://localhost:5000/api/courses/${id}`, {
            title: title,
            description: description,
            userid: props.authenticatedUser.id,
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded
        },
        {headers: {
            Authorization: `Basic ${props.userCredentials}`
        }})
        .then(res => {
            console.log(res);
            if (res.status === 204) {
                history.push(`/courses/${id}`);
            } else if (res === 401) {
                history.push(`/forbidden`);
            }
        })
        .catch((error) => {
            console.log(error);
            history.push("/error");
        })
    }

    return (
        <div>
            <div className="bounds course--detail">
                <h1>Update Course</h1>
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
                        <div><input id="title" name="title" type="text" className="input-title course--title--input" onChange={ e => setTitle(e.target.value) } value={title}/></div>
                        <p>{props.authenticatedUser ? props.authenticatedUser.firstName + " " + props.authenticatedUser.lastName : ""}</p>
                    </div>
                    <div className="course--description">
                        <div><textarea id="description" name="description" className="" onChange={ e => setDescription(e.target.value) } value={description}></textarea></div>
                    </div>
                    </div>
                    <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" onChange={ e => setEstimatedTime(e.target.value) } value={estimatedTime !== null ? estimatedTime : "Not specified."}/></div>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div><textarea id="materialsNeeded" name="materialsNeeded" className="" onChange={ e => setMaterialsNeeded(e.target.value) } value={materialsNeeded !== null ? materialsNeeded : "None."}></textarea></div>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="grid-100 pad-bottom"><button className="button" onClick={e => handleUpdate(e)} type="submit">Update Course</button><Link to="/" className="button button-secondary">Cancel</Link></div>
                </form>
                </div>
            </div>
        </div>
    );
}