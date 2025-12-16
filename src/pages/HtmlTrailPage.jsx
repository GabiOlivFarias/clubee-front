import "./HtmlTrailPage.css";
import ArrowIcon from "../assets/icons/ArrowIcon";
import React, { useState, useEffect } from "react";
import ScrollModal from "../components/ScrollModal";
import wizardPhoto from "../assets/images/bruxo.png";
import { Link, useNavigate } from "react-router-dom";
import { htmlActivities } from "../data/htmlActivities";

import {
  Scroll,
  Crown,
  Sword,
  Shield,
  Map as MapIcon,
  Compass,
  Skull,
  Gem,
  Check,
  Flame,
  Tent
} from "lucide-react";

function Flag(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

const activities = htmlActivities;

const tilesPerRow = 5;
const boardRows = [];
for (let i = 0; i < activities.length; i += tilesPerRow) {
  boardRows.push(activities.slice(i, i + tilesPerRow));
}

function HtmlTrailPage() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [checks, setChecks] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/progress?trail=html`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const saved = {};
          data.records.forEach(r => {
            saved[r.activityId] = r.completed;
          });
          setChecks(saved);
        }
      })
      .catch(err => console.error("Erro ao carregar progresso:", err));
  }, []);

  const saveProgress = (id, completed) => {
    fetch(`${API_URL}/api/progress`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trail: "html", activityId: id, completed })
    }).catch(err => console.error("Erro ao salvar progresso:", err));
  };

  const handleTileClick = (activity) => {
    if (activity.type === "start" || activity.type === "obstacle") return;
    setSelectedActivity(activity);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    if (selectedActivity && !checks[selectedActivity.id]) {
      const updated = { ...checks, [selectedActivity.id]: true };
      setChecks(updated);
      saveProgress(selectedActivity.id, true);

      if (selectedActivity.id === "end") {
        setTimeout(() => navigate("/trilha/html/teste"), 800);
      }
    }

    setModalOpen(false);
    setSelectedActivity(null);
  };

  return (
    <div className="rpg-container">
      <div className="map-texture" />

      <div className="rpg-decoration">
        <hr />
        <img src={wizardPhoto} alt="wizard" className="wizard-rose" />
        <div className="dragon-silhouette" />
      </div>

      <h2 className="rpg-title">Crônicas do HTML</h2>

      <div className="game-board-container">
        {boardRows.map((row, rowIndex) => {
          const isReverse = rowIndex % 2 !== 0;
          const isLastRow = rowIndex === boardRows.length - 1;

          return (
            <React.Fragment key={rowIndex}>
              <div className={`board-row ${isReverse ? "reverse" : ""}`}>
                <div className="stone-path" />

                {row.map(activity => {
                  const Icon = activity.icon;
                  const isCompleted = checks[activity.id];

                  return (
                    <div key={activity.id} className="tile-wrapper">
                      <div
                        className={`rpg-tile ${activity.type} ${isCompleted ? "completed" : ""}`}
                        onClick={() => handleTileClick(activity)}
                      >
                        <div className="tile-inner">
                          {Icon && <Icon className="rpg-icon" />}
                          <span className="rpg-label">{activity.label}</span>
                        </div>

                        {activity.type !== "start" && activity.type !== "obstacle" && (
                          <div className={`wax-seal ${isCompleted ? "stamped" : ""}`}>
                            {isCompleted && <Check size={16} strokeWidth={4} />}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {!isLastRow && (
                <div className={`path-connector ${isReverse ? "left-turn" : "right-turn"}`}>
                  <div className="stone-connector" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <Link to="/development" className="rpg-back-btn" style={{ textDecoration: "none" }}>
        <ArrowIcon className="btn-icon" />
        <span className="nav-text">Retornar à trilha</span>
      </Link>
      <ScrollModal
        open={modalOpen}
        activity={selectedActivity}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default HtmlTrailPage;
