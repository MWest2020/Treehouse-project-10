import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function CourseDetail () {

    // Set the id equal to the id parameter from the url.
    const { id } = useParams();
    
    // State for the course details
    const [course, setCourse] = useState({ title: "", User: {} });

    // A function that sends a delete request for a specified course.
    const deleteCourse = async () => {
        // await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        //     headers: {
        //         Authorization: 
        //     }
        // })
        //     .catch(err=>{
        //         console.log(err);
        // });
        console.log('Deleted');
    }

    // Fetch the course data from the Api
    useEffect(() => {

        async function fetchData() {
            const response = await axios.get(`http://localhost:5000/api/courses/${id}`)
                .then((res) => {
                    setCourse(res.data.course);
                })
                .catch(err=>{
                    console.log(err);
            });
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        console.log(course);
    }, [course])

    return (
        <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <span>
                        <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
                        <button onClick={deleteCourse} className="button">Delete Course</button>
                        </span>
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
                    <div className="course--description">
                        { course.description }
                    </div>
                </div>
            </div>
        </div>
    );
}

{/*
    
    

    <div class="grid-25 grid-right">
        <div class="course--stats">
            <ul class="course--stats--list">
            <li class="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>14 hours</h3>
            </li>
            <li class="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ul>
                <li>1/2 x 3/4 inch parting strip</li>
                <li>1 x 2 common pine</li>
                <li>1 x 4 common pine</li>
                <li>1 x 10 common pine</li>
                <li>1/4 inch thick lauan plywood</li>
                <li>Finishing Nails</li>
                <li>Sandpaper</li>
                <li>Wood Glue</li>
                <li>Wood Filler</li>
                <li>Minwax Oil Based Polyurethane</li>
                </ul>
            </li>
            </ul>
        </div>
    </div>
        */}