import { useState } from "react";
import Button from "../components/Button";

export default function HomePage() {
  const [records, setRecords] = useState([
    {
      id: 1,
      name: "Endal",
    },
    {
      id: 2,
      name: "Rokon",
    },
    {
      id: 3,
      name: "Inus",
    },
  ]);

  const deleteRecord = (id) => {
    if (window.confirm("Are you sure deleting this record"))
      setRecords(records.filter((item) => item.id !== id));
  };

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
                <Button
                  variant="danger"
                  onClick={() => deleteRecord(record.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
