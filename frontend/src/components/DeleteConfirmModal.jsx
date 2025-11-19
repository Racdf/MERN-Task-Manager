import Modal from "./Modal";

export default function DeleteConfirmModal({ open, onClose, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ textAlign: "center" }}>
        <h3 style={{ marginBottom: "12px" }}>Delete Task?</h3>
        <p style={{ color: "var(--muted)" }}>
          Are you sure you want to delete this task? This action cannot be undone.
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "12px" }}>
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
