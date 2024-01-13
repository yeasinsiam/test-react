import React, { useState } from "react";

export default function CreateStudentRecords({ addRecord }) {
  const [addRecordInputValue, setAddRecordInputValue] = useState("");

  const handleAddRecord = () => {
    addRecord(addRecordInputValue);

    setAddRecordInputValue("");
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="name-field" className="form-label">
          Name
        </label>
        <input
          type="email"
          className="form-control"
          id="name-field"
          value={addRecordInputValue}
          onChange={(e) => setAddRecordInputValue(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAddRecord}
      >
        Add
      </button>
    </div>
  );
}
