import { useState } from "react";

export default function useStudents() {
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

  const addRecord = (name) => {
    if (!name) return window.alert("Name is empty.");

    setRecords([
      ...records,
      {
        id: records[records.length - 1].id + 1,
        name,
      },
    ]);
  };

  const deleteRecord = (id) => {
    if (window.confirm("Are you sure deleting this record"))
      setRecords(records.filter((item) => item.id !== id));
  };

  return { records, addRecord, deleteRecord };
}
