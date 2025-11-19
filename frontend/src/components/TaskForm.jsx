import { useState } from "react";
import { createTask } from "../services/api";

export default function TaskForm({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [err, setErr] = useState("");

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setErr("Title cannot be empty");

    try {
      await createTask(form);
      setErr("");
      setForm({ title: "", description: "", status: "pending" });
      onCreated && onCreated();
    } catch {
      setErr("Failed to create task");
    }
  };

  return (
    <form className="task-form" onSubmit={submit}>
      {err && <p style={{ color: "var(--danger)" }}>{err}</p>}

      <div className="field">
        <label>Title</label>
        <input
          className="input"
          placeholder="Enter task title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="field">
        <label>Description</label>
        <textarea
          placeholder="Enter a short description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="field">
        <label>Status</label>
        <select
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button className="btn btn-primary" type="submit">
        Add Task
      </button>
    </form>
  );
}
