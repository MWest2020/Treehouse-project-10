// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function Courses () {
//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//     async function fetchData() {
//         await axios.get('http://localhost:5000/api/courses')
//             .then(res => {
//             setCourses(res.data.courses);
//             })
//             .catch(err=>{
//             console.log(err);
//         });
//     }
//     fetchData();
//     }, []);

//     return (
//         <div
//         {
//             courses.map(course => {
//               return <div>{ course.title }</div>
//             })
//         }
//     );
// }