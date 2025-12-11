import React, { useState } from "react";
import "./HtmlTrailPage.css";
import ArrowIcon from "../assets/icons/ArrowIcon";
import wizardPhoto from "../assets/images/bruxo.png";
import { Link, useNavigate } from "react-router-dom";
import {  
  Scroll,
  Crown,
  Sword,
  Shield,
  Map as MapIcon,
  Compass,
  Skull,
  Gem,
  ArrowLeft,
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

const activities = [
  { id: "start", label: "A Jornada", type: "start", icon: MapIcon },
  { id: "head", label: "O Capacete: a Tag <head>", type: "activity", icon: Shield },
  { id: "title", label: "O Estandarte <title>", type: "activity", icon: Flag },
  { id: "obstacle-1", label: "Emboscada: Pratique", type: "obstacle", icon: Sword },
  { id: "body", label: "A Armadura: a Tag <body>", type: "activity", icon: Shield },
  { id: "h", label: "Hierarquia Real: a Tag <H>", type: "activity", icon: Crown },
  { id: "obstacle-2", label: "Masmorra: Pratique", type: "obstacle", icon: Skull },
  { id: "p", label: "Pergaminho: a Tag <p>", type: "activity", icon: Scroll },
  { id: "br", label: "Fenda: a Tag <br>", type: "activity", icon: Flame },
  { id: "div", label: "Baú: a Tag <div>", type: "activity", icon: Tent },
  { id: "l", label: "Inventário: a Tag <ul>", type: "activity", icon: Scroll },
  { id: "obstacle-3", label: "Acampamento: Pratique", type: "obstacle", icon: Tent },
  { id: "img", label: "Retrato: a Tag <img>", type: "activity", icon: Scroll },
  { id: "table", label: "O Banquete: a Tag <table>", type: "activity", icon: Scroll },
  { id: "a", label: "Portal: a Tag <a>", type: "activity", icon: Compass },
  { id: "input", label: "Conjuração: a Tag <input>", type: "activity", icon: Scroll },
  { id: "button", label: "Gatilho: a Tag <button>", type: "activity", icon: Gem },
  { id: "end", label: "O Tesouro Final: teste", type: "final", icon: Crown },
];

const tilesPerRow = 5;
const boardRows = [];
for (let i = 0; i < activities.length; i += tilesPerRow) {
  boardRows.push(activities.slice(i, i + tilesPerRow));
}

function HtmlTrailPage() {
  const navigate = useNavigate();
  const [checks, setChecks] = useState({});

  const toggleCheck = (id, type) => {
    if (type !== "activity") return;
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTileClick = (id, type) => {
    if (type === "final") {
      navigate("/trilha/html/teste");
    } else if (type === "activity") {
      toggleCheck(id, type);
    }
  };

  return (
    <div className="rpg-container">
      <div className="map-texture"></div>

      <div className="rpg-decoration">
        <hr />
        <img src={wizardPhoto} alt="wizard" className="wizard-rose"/>
        <div className="dragon-silhouette"></div>
      </div>

      <h2 className="rpg-title">Crônicas do HTML</h2>
      <div className="game-board-container">
        {boardRows.map((row, rowIndex) => {
          const isReverse = rowIndex % 2 !== 0;
          const isLastRow = rowIndex === boardRows.length - 1;

          return (
            <React.Fragment key={rowIndex}>
              
              <div className={`board-row ${isReverse ? "reverse" : ""}`}>
                <div className="stone-path"></div>

                {row.map((activity) => {
                  const Icon = activity.icon;
                  const isCompleted = checks[activity.id];

                  return (
                    <div key={activity.id} className="tile-wrapper">
                      <div
                        className={`rpg-tile ${activity.type} ${isCompleted ? "completed" : ""}`}
                        onClick={() => handleTileClick(activity.id, activity.type)}
                      >
                        <div className="tile-inner">
                          {Icon && <Icon className="rpg-icon" />}
                          <span className="rpg-label">{activity.label}</span>
                        </div>

                        {activity.type === "activity" && (
                          <div className={`wax-seal ${isCompleted ? "stamped" : ""}`}>
                            {isCompleted && <Check size={16} strokeWidth={4} />}
                          </div>
                        )}

                        <div className="corner c-tl"></div>
                        <div className="corner c-tr"></div>
                        <div className="corner c-bl"></div>
                        <div className="corner c-br"></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!isLastRow && (
                <div className={`path-connector ${isReverse ? "left-turn" : "right-turn"}`}>
                  <div className="stone-connector"></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <Link to="/development" className="rpg-back-btn" style={{ textDecoration: "none" }}>
        <ArrowIcon className="btn-icon"/>
        <span className="nav-text">Retornar à trilha</span>
      </Link>
    </div>
  );
}

export default HtmlTrailPage;
