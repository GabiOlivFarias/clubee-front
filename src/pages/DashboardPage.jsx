import React, { useState, useEffect } from "react";
import queenPhoto from "../assets/images/roblox.jpg";
import "./DashboardPage.css";
import { Link } from "react-router-dom";
import BuildingScene from "../components/BuildingScene";
import HoneycombIcon from "../assets/icons/HoneycombIcon";
import ClassesIcon from "../assets/icons/ClassesIcon";
import BeeIcon from "../assets/icons/BeeIcon";
import QueenIcon from "../assets/icons/QueenIcon";

function DashboardPage({ user, onLogout, backendUrl }) {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const queenBee = {
    photo: queenPhoto,
    name: "Mauro Oliveira",
    class: "7ºB",
    achievement: "Derrotou mais colméias nos ultimos 15 dias",
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/users`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          console.error("Falha ao buscar usuários:", response.status);
          setUsers([{ displayName: "Erro ao carregar lista" }]);
        }
      } catch (error) {
        console.error("Erro de rede ao buscar usuários:", error);
        setUsers([{ displayName: "Erro de Conexão" }]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [backendUrl]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title">Painel Principal</h2>
        <div className="action-buttons-header">
          <Link
            to="/zunzuns"
            className="action-btn"
            style={{ textDecoration: "none" }}
          >
            <BeeIcon className="btn-icon" />
            <span className="btn-text">Zunzum</span>
          </Link>
          <Link
            to="/colmeias"
            className="action-btn"
            style={{ textDecoration: "none" }}
          >
            <HoneycombIcon  className="btn-icon"/>
            <span className="btn-text">Colmeias</span>
          </Link>
          <Link
            to="/aulas"
            className="action-btn"
            style={{ textDecoration: "none" }}
          >
            <ClassesIcon  className="btn-icon"/>
            <span className="btn-text">Aulas</span>
          </Link>
          <Link
            to="/queen"
            className="action-btn"
            style={{ textDecoration: "none" }}
          >
            <QueenIcon  className="btn-icon"/>
            <span className="btn-text">Abelha Rainha</span>
          </Link>
        </div>
        <button onClick={onLogout} className="logout-button">
          Sair
        </button>
      </header>
          <main className="dashboard-main-content">
          <div className="main-content-row">

            <div className="main-hub">
          <div className="hub-title">Centro Criativo</div>
              <BuildingScene />{" "}
            </div>
            <div className="users-list-section">
              <h3 style={{ marginBottom: "10px" }}>👥 Membros Online</h3>
              {loadingUsers ? (
                <p>Carregando membros...</p>
              ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}> 
              {users.filter((u) => u.id !== user.id).map((u) => (
                <li
                  key={u.id}
                  style={{
                  padding: "5px",
                  borderBottom: "1px solid #333",
                  color: "inherit", 
                  }}
                  >
                  👤 {u.displayName}
                </li>
              ))}
                </ul>
              )}
            </div>
          </div>
        <div className="queen-bee-card">
          <div className="queen-bee-header">
            <h3>👑 Abelha Rei da Semana</h3>
          </div>
          <div className="queen-bee-profile">
            <img
              src={queenBee.photo}
              alt={`Foto de ${queenBee.name}`}
              className="profile-pic"
            />
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
