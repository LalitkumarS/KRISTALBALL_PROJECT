import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Assignments.css";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ personnel: "", equipmentType: "", quantity: "" });

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.getAssignments();
        setAssignments(res.data);
      } catch (err) {
        console.error("Error fetching assignments:", err);
      }
    };
    fetchAssignments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addAssignment({ ...form, date: new Date() });
      const updated = await api.getAssignments();
      setAssignments(updated.data);
      setForm({ personnel: "", equipmentType: "", quantity: "" });
    } catch (err) {
      console.error("Error adding assignment:", err);
    }
  };

  return (
    <div className="assignments-page">
      <h2 className="page-title">📋 Assignments</h2>

      <form onSubmit={handleSubmit} className="assignment-form">
        <input
          type="text"
          placeholder="Personnel"
          value={form.personnel}
          onChange={(e) => setForm({ ...form, personnel: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Equipment Type"
          value={form.equipmentType}
          onChange={(e) => setForm({ ...form, equipmentType: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <button type="submit">Add Assignment</button>
      </form>

      <div className="table-container">
        <table className="assignments-table">
          <thead>
            <tr>
              <th>Personnel</th>
              <th>Equipment Type</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a._id}>
                <td>{a.personnel}</td>
                <td>{a.equipmentType}</td>
                <td>{a.quantity}</td>
                <td>{new Date(a.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assignments;
