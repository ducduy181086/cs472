import './ListStudentsRow.css';

function ListStudentsRow({ id, name, program, onDelete }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{program}</td>
      <td><button type="button" className="btn" onClick={() => onDelete && onDelete(id)}>Delete</button></td>
    </tr>
  );
}

export default ListStudentsRow;
