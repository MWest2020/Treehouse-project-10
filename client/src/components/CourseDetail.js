import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

export default function CourseDetail (props) {

    // Set the id equal to the id parameter from the url.
    const { id } = useParams();
    
    // State for the course details
    const [course, setCourse] = useState({ title: "", User: {}, description: null, estimatedTime: null, materialsNeeded: null });

    // A function that sends a delete request for a specified course.
    const deleteCourse = async () => {
        await axios.delete(`http://localhost:5000/api/courses/${id}`, {
            headers: {
                Authorization: `Basic ${props.userCredentials}`
            }
        })
            .catch(err=>{
                console.log(err);
        });
    }

    // Fetch the course data from the Api
    useEffect(() => {

        async function fetchData() {
            await axios.get(`http://localhost:5000/api/courses/${id}`)
                .then((res) => {
                    setCourse(res.data.course);
                })
                .catch(err=>{
                    console.log(err);
            });
        }
        fetchData();
    }, [id]);

    return (
        <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        { props.authenticatedUser && props.authenticatedUser.id.toString() === id.toString() &&
                            <span>
                                <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
                                <button onClick={deleteCourse} className="button">Delete Course</button>
                            </span>
                        }
                        <Link to={"/"} className="button button-secondary">Return to List</Link>
                    </div>
                </div>
            </div>
            <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                        <p>{course.User.firstName + " " + course.User.lastName}</p>
                    </div>
                    <ReactMarkdown source={course.description}/>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                { course.estimatedTime !== null &&
                                    <h3>{course.estimatedTime}</h3>
                                }
                                { course.estimatedTime === null &&
                                    <h3>Not specified.</h3>
                                }
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <ReactMarkdown source={course.materialsNeeded}/>
                                { course.materialsNeeded === null &&
                                    <p>None.</p>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}