import React from "react";
import "./ScrollModal.css";
import { X } from "lucide-react";

function ScrollModal({ open, activity, onClose }) {
  if (!open || !activity) return null;

  return (
    <div className="scroll-overlay">
      <div className="scroll-modal">
        <button className="scroll-close" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="scroll-title">{activity.label}</h2>

        <div className="scroll-content">
          <p>
            {activity.description}
          </p>

          {activity.example && (
            <pre className="scroll-code">
              {activity.example}
            </pre>
          )}
        </div>

        <button className="scroll-confirm" onClick={onClose}>
          Fechar pergaminho 📜
        </button>
      </div>
    </div>
  );
}

export default ScrollModal;
