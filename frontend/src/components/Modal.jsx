export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
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
  );
}