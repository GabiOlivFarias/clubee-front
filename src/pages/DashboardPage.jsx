import React from 'react';
import './DashboardPage.css';
import { Link } from 'react-router-dom'; 
import BuildingScene from '../components/BuildingScene';
//import HoneycombIcon from "../assets/icons/honeycombIcon";
import ClassesIcon from "../assets/icons/ClassesIcon";
import BeeIcon from "../assets/icons/BeeIcon";
import QueenIcon from "../assets/icons/QueenIcon";

function DashboardPage({ user, onLogout }) {
  const queenBee = {
    name: user.displayName, 
    photo: user.photos[0].value,
    class: "6ºC",
    achievement: "Maior pontuador em 'Zunzuns' esta semana!"
  };

  return (
    <div className="dashboard-container">   
      <header className="dashboard-header">
        <h2 className="dashboard-title">Painel Principal</h2>
        <div className="action-buttons-header">
          <button className="action-btn">
            <BeeIcon className="btn-icon" />
            <span className="btn-text">Zunzum</span>
          </button>
          <Link to="/colmeias" className="action-btn" style={{textDecoration: 'none'}}>
            🍯
            <span className="btn-text">Colmeias</span>
          </Link>
          
          <button className="action-btn">
            <ClassesIcon className="btn-icon" />
            <span className="btn-text">Aulas</span>
          </button>
          <button className="action-btn">
            <QueenIcon className="btn-icon" />
            <span className="btn-text">Abelha Rainha</span>
          </button>
        </div>
        <button onClick={onLogout} className="logout-button">Sair</button>
      </header>

      <main className="dashboard-main-content">
        <div className="main-hub">
          <div className="hub-title">Centro Criativo</div>
          <BuildingScene />
        </div>

        <div className="queen-bee-card">
            <div className="queen-bee-header">
                <h3>👑 Abelha Rainha da Semana</h3>
            </div>
            <div className="queen-bee-profile">
                <img src={queenBee.photo} alt={`Foto de ${queenBee.name}`} className="profile-pic" />
                <h4>{queenBee.name}</h4>
                <p className="class-info">Turma {queenBee.class}</p>
            </div>
            <div className="queen-bee-achievement">
                <p>"{queenBee.achievement}"</p>
            </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
