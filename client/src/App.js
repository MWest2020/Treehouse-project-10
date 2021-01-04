import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios.get('http://localhost:5000/api/courses')
          .then(res => {
            setCourses(res.data.courses);
          })
          .catch(err=>{
            console.log(err);
      });
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {
            courses.map(course => {
              return <div>{ course.title }</div>
            })
          }
        </div>
      </header>
    </div>
  );
}

export default App;
