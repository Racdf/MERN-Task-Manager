import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";
import EditTask from "./EditTask";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { deleteTask } from "../services/api";

export default function Home() {
  const [reload, setReload] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (id) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    await deleteTask(deleteId);
    setIsDeleteModalOpen(false);
    setDeleteId(null);
    setReload((v) => !v);
  };

  return (
    <div className="container">
      <header className="app-header">
        <div className="app-title" style={{textDecoration: "underline"}}>Task Manager</div>
      </header>

      {/* LEFT: Task List */}
      <section className="card task-list">
        <TaskList
          reload={reload}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>

      {/* RIGHT: Task Form */}
      <aside className="card">
        <TaskForm onCreated={() => setReload((v) => !v)} />
      </aside>

      <Modal open={isModalOpen} onClose={closeEditModal}>
        <EditTask
          id={editingId}
          onClose={closeEditModal}
          onUpdated={() => setReload((v) => !v)}
        />
      </Modal>
      
      <DeleteConfirmModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
