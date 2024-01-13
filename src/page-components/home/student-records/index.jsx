import Button from "../../../components/Button";
import useStudents from "../../../hooks/useStudents";
import CreateStudentRecords from "./Create";

export default function StudentRecords() {
  const { records, deleteRecord, addRecord } = useStudents();
  return (
    <div>
      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <th scope="row">{record.id}</th>
              <td>{record.name}</td>
              <td>
                <DeleteRecord {...{ record, records, deleteRecord }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Create form */}
      <CreateStudentRecords {...{ records, addRecord }} />
    </div>
  );
}

function DeleteRecord({ record, records, deleteRecord }) {
  return (
    <Button variant="danger" onClick={() => deleteRecord(record.id)}>
      Delete
    </Button>
  );
}
