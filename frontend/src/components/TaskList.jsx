import { useEffect, useState, useCallback, startTransition } from "react";
import { fetchTasks } from "../services/api";
import { SquarePen, Trash } from "lucide-react";

export default function TaskList({ reload, onEdit, onDelete }) {
  const [tasks, setTasks] = useState([]);

  const load = useCallback(async () => {
    const { data } = await fetchTasks();
    setTasks(data);
  }, []);

  useEffect(() => {
    startTransition(() => load());
  }, [reload, load]);

  if (tasks.length === 0)
    return <div className="empty">No tasks yet. Add one →</div>;

  return (
    <>
      {tasks.map((t) => (
        <div key={t._id} className="task-item">
          <div className="task-left">
            <div className={`status ${t.status}`}>{t.status}</div>
            <div>
              <div className="task-title">{t.title}</div>
              {t.description && (
                <span className="task-desc">{t.description}</span>
              )}
            </div>
          </div>

          <div className="controls">
            <button className="btn-ghost" onClick={() => onEdit(t._id)}>
              <SquarePen />
            </button>

            <button className="btn" onClick={() => onDelete(t._id)}>
              <Trash color="red" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
