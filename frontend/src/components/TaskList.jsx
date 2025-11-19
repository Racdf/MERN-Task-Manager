import { useEffect, useState, useCallback, startTransition } from "react";
import { fetchTasks } from "../services/api";
import { SquarePen, Trash } from "lucide-react";

export default function TaskList({ reload, onEdit, onDelete }) {
  const [tasks, setTasks] = useState([]);

  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const load = useCallback(async () => {
    const { data } = await fetchTasks();
    setTasks(data);
    setPage(1);
  }, []);

  useEffect(() => {
    startTransition(() => load());
  }, [reload, load]);

  const filteredTasks =
    statusFilter === "all"
      ? tasks
      : tasks.filter((t) => t.status === statusFilter);

  const totalPages = Math.ceil(filteredTasks.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedTasks = filteredTasks.slice(start, start + pageSize);

  if (tasks.length === 0)
    return <div className="empty">No tasks yet. Add one →</div>;

  return (
    <>
      <div className="row" style={{ marginBottom: "16px" }}>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          style={{ width: "150px" }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="space" />
        <div className="row">
          <button
            className="btn btn-ghost"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span style={{ color: "var(--muted)", fontSize: "14px" }}>
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-ghost"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {paginatedTasks.map((t) => (
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
