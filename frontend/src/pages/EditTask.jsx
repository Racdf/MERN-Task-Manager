import { useEffect, useState } from "react";
import { getTask, updateTask } from "../services/api";
import { CircleX } from 'lucide-react';

export default function EditTask({ id, onClose, onUpdated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getTask(id);
        setForm({
          title: data.title,
          description: data.description,
          status: data.status,
        });
      } catch {
        setErr("Task not found");
      }
    })();
  }, [id]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setErr("Title cannot be empty");

    await updateTask(id, form);
    onUpdated && onUpdated();
    onClose && onClose();
  };

  return (
    <section className="card">
      <header className="app-header">
        <div className="app-title">Edit Task</div>
        <button className="btn" style={{background: "transparent" }} onClick={onClose}><CircleX color="#dd4040" /></button>
      </header>

      <form className="task-form" onSubmit={submit}>
        {err && <p style={{ color: "var(--danger)" }}>{err}</p>}

        <div className="field">
          <label>Title</label>
          <input
            className="input"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div className="field">
          <label>Description</label>
          <textarea
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

        <button className="btn btn-primary">Save Changes</button>
      </form>
    </section>
  );
}
