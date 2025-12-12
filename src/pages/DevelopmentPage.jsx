import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import './DevelopmentPage.css';

const HtmlIcon = () => <span style={{ fontSize: '1.5rem' }}>📄</span>;
const CssIcon = () => <span style={{ fontSize: '1.5rem' }}>🎨</span>;
const JsIcon = () => <span style={{ fontSize: '1.5rem' }}>⚡</span>;
const BossIcon = () => <span style={{ fontSize: '1.2rem' }}>🏆</span>;
const LockIcon = () => <span style={{ fontSize: '1.2rem' }}>🔒</span>;

function DevelopmentPage({ currentUser }) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [progressByTrail, setProgressByTrail] = useState({});
  const [loading, setLoading] = useState(true);

  const levels = [
    { id: 1, trail: 'html', endActivityId: 'end', title: 'HTML: O Esqueleto', type: 'html', description: 'Aprenda as tags básicas' },
    { id: 2, trail: 'css',  endActivityId: 'end', title: 'CSS: Colorindo o Mundo', type: 'css', description: 'Cores e Fundos' },
    { id: 3, trail: 'git',  endActivityId: 'end', title: 'Git/GitHub: Mostrando seu código para o mundo', type: 'js', description: 'Versionamento' },
    { id: 4, trail: 'js',   endActivityId: 'end', title: 'JS: A Mágica Acontece', type: 'js', description: 'Variáveis e Alertas' },
    { id: 5, trail: 'boss', endActivityId: 'end', title: 'Desafio Final', type: 'boss', description: 'Construa seu site' },
  ];

  useEffect(() => {
    const trails = levels.map(l => l.trail);
    const uniqueTrails = Array.from(new Set(trails));
    setLoading(true);

    Promise.all(
      uniqueTrails.map(trail =>
        fetch(`${API_URL}/api/progress?trail=${encodeURIComponent(trail)}`, { credentials: "include" })
          .then(res => res.json())
          .then(data => {
            if (data && data.success) {
              const map = {};
              data.records.forEach(r => { map[r.activityId] = r.completed; });
              return { trail, map };
            }
            return { trail, map: {} };
          })
          .catch(err => {
            console.error(`Erro ao buscar progresso (${trail})`, err);
            return { trail, map: {} };
          })
      )
    ).then(results => {
      const byTrail = {};
      results.forEach(r => { byTrail[r.trail] = r.map; });
      setProgressByTrail(byTrail);
      setLoading(false);
    });
  }, []);

  const getPlayerTrailIndex = () => {
    for (let i = 0; i < levels.length; i++) {
      const lvl = levels[i];
      const trailProgress = progressByTrail[lvl.trail] || {};
      if (trailProgress[lvl.endActivityId] !== true) {
        return i;
      }
    }
    return levels.length - 1;
  };

  const playerIndex = getPlayerTrailIndex();

  const getStatus = (index, level) => {
    const trailProgress = progressByTrail[level.trail] || {};
    const isCompleted = trailProgress[level.endActivityId] === true;

    if (isCompleted) return 'completed';
    if (index === playerIndex) return 'current';
    if (index > playerIndex) return 'locked';
    return 'locked';
  };

  const handlePlayLevel = (level, status) => {
    if (status === 'locked') {
      alert("Esta fase está bloqueada! Complete a anterior.");
      return;
    }
    if (level.trail === 'html') {
      navigate('/trilha/html');
      return;
    }
    navigate(`/trilha/${level.trail}`);
  };

  return (
    <Layout user={currentUser} pageTitle="Trilha de Código">
      <div className="development-page-container">
        <header className="dev-header">
          <h1 className="dev-title">Trilha de Programação 🚀</h1>
          <p className="dev-subtitle">Complete os desafios para liberar o próximo mundo!</p>
        </header>

        <div className="game-board">
          <div className="path-line"></div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 20 }}>Carregando progresso...</div>
          ) : (
            levels.map((level, index) => {
              const status = getStatus(index, level);
              const isLeft = index % 2 === 0;

              return (
                <div key={level.id} className={`level-row ${isLeft ? 'left' : 'right'} ${status}`}>
                  <div
                    className="level-card"
                    onClick={() => handlePlayLevel(level, status)}
                  >
                    <div className="card-header">
                      <span className="level-number">Mundo {level.id}</span>
                      {status === 'locked' && <LockIcon />}
                      {status === 'completed' && <span>✅</span>}
                    </div>

                    <h3>{level.title}</h3>
                    <p>{level.description}</p>

                    <button
                      className="start-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayLevel(level, status);
                      }}
                    >
                      ENTRAR
                    </button>
                  </div>

                  <div className="level-node">
                    {level.type === 'html' && <HtmlIcon />}
                    {level.type === 'css' && <CssIcon />}
                    {level.type === 'js' && <JsIcon />}
                    {level.type === 'boss' && <BossIcon />}

                    {status === 'current' && (
                      <div className="user-avatar-marker">
                        <img
                          src={`https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser?.displayName || "Bee"}`}
                          alt="Avatar"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
}

export default DevelopmentPage;
