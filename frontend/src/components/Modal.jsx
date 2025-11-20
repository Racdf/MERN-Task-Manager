export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--card)",
          padding: "24px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "600px",
          boxShadow: "var(--shadow)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}