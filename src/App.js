import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import useForm from "./hooks/useForm";

function App() {
  const [records, setRecords] = useState([
    { id: 1, name: "Endal", address: "Dhaka" },
    { id: 2, name: "Rokon", address: "Madaripur" },
  ]);

  const [editableRecord, setEditableRecord] = useState(null);

  const storeRecord = (name, address) => {
    setRecords((records) => {
      return [
        ...records,
        {
          id: records.length + 1,
          name,
          address,
        },
      ];
    });
  };
  const updateRecord = (id, name, address) => {
    setRecords((records) => {
      const oldRecords = [...records];
      const editableRecordIndex = oldRecords.findIndex(
        (record) => record.id == id
      );
      oldRecords[editableRecordIndex] = {
        id,
        name,
        address,
      };

      return oldRecords;
    });
  };

  const form = useForm(
    // initialValues
    {
      name: "",
      address: "",
    },
    // Validation
    {
      name: ["required"],
      address: ["required"],
    },
    // afterSubmitCallback
    (values) => {
      !editableRecord
        ? storeRecord(values.name, values.address)
        : updateRecord(editableRecord.id, values.name, values.address);
    }
  );

  const switchToCreateRecordFrom = (name, address) => {
    setEditableRecord(null);
    form.resetFieldValues();
  };

  const switchToEditRecordFrom = (record) => {
    setEditableRecord(record);
    form.setFieldValue("name", record.name);
    form.setFieldValue("address", record.address);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <th scope="row">{record.id}</th>
              <td>{record.name}</td>
              <td>{record.address}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => switchToEditRecordFrom(record)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <br />

      <form onSubmit={form.handleSubmit}>
        <p>{editableRecord ? "Edit Record" : "Create Record"} </p>
        <input
          type="text"
          value={form.values.name}
          onChange={(e) => form.setFieldValue("name", e.target.value)}
          className="form-control"
          placeholder="Name"
        />
        <br />
        <input
          type="text"
          value={form.values.address}
          onChange={(e) => form.setFieldValue("address", e.target.value)}
          className="form-control"
          placeholder="Address"
        />
        <br />
        <div className="d-flex gap-2">
          <button className="btn btn-primary mt-1">
            {editableRecord ? "Save" : "Create"}
          </button>
          {editableRecord && (
            <button
              className="btn btn-outline-primary mt-1"
              onClick={switchToCreateRecordFrom}
            >
              Switch to Create Record From
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
