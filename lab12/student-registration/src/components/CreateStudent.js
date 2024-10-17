import {useState} from 'react';

import './CreateStudent.css';

function CreateStudent({ onSubmited }) {
  const [student, setStudent] = useState({ id: '', name: '', program: '' });
  const resetFormHandler = (e) => {
    setStudent({ id: '', name: '', program: '' });
  }
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (onSubmited) onSubmited(student);
  }
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setStudent({...student, [name]: value});
  };

  return (
    <section className="create-student">
      <h2>Create a student</h2>
      <form id="student-form" onSubmit={submitFormHandler} onReset={resetFormHandler}>
        <div className="form-group">
          <label htmlFor="student-id">id:</label>
          <input type="text" id="student-id" name="id" placeholder="Enter student id" value={student.id} onChange={handleChanged} />
        </div>
        <div className="form-group">
          <label htmlFor="student-name">name:</label>
          <input type="text" id="student-name" name="name" placeholder="Enter student name" value={student.name} onChange={handleChanged} />
        </div>
        <div className="form-group">
          <label htmlFor="student-program">program:</label>
          <input type="text" id="student-program" name="program" placeholder="Enter student program" value={student.program} onChange={handleChanged} />
        </div>
        <div className="form-actions">
          <button type="reset" className="btn-reset">Reset</button>
          <button type="submit" className="btn-register">Register</button>
        </div>
      </form>
    </section>
  );
}

export default CreateStudent;
