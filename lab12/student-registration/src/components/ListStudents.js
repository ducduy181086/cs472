import './ListStudents.css';

import ListStudentsRow from './ListStudentsRow';

function ListStudents({ students, onDelete }) {
  return (
    <section>
      <h2>All Students</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Program</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => <ListStudentsRow key={s.id} onDelete={onDelete} {...s} />)}
        </tbody>
      </table>
    </section>
  );
}

export default ListStudents;
