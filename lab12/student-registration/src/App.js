import { useState, useEffect } from 'react';

import './App.css';

import Header from './components/Header';
import CreateStudent from './components/CreateStudent';
import ListStudents from './components/ListStudents';
import Footer from './components/Footer';

function App() {
  const [students, setStudents] = useState([]);
  const [refreshList, setRefreshList] = useState({});

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/api/v1/students');
      setStudents(await res.json());
    })()
  }, [refreshList]);

  const createStudentHandler = async function (student) {
    const res = await fetch('http://localhost:3000/api/v1/students', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    });
    if (res.ok) {
      setRefreshList({});
    } else {
      const errData = await res.json();
      alert(errData.error);
    }
  }

  const deleteStudentHandler = async function (id) {
    const res = await fetch(`http://localhost:3000/api/v1/students/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      setRefreshList({});
    }
  }

  return (
    <div className="container">
      <Header />
      <CreateStudent onSubmited={createStudentHandler} />
      <ListStudents students={students} onDelete={deleteStudentHandler} />
      <Footer />
    </div>
  );
}

export default App;
