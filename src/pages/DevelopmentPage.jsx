import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import './DevelopmentPage.css';

const HtmlIcon = () => <span style={{ fontSize: '1.5rem' }}>📄</span>;
const CssIcon = () => <span style={{ fontSize: '1.5rem' }}>🎨</span>;
const JsIcon = () => <span style={{ fontSize: '1.5rem' }}>⚡</span>;
const LockIcon = () => <span style={{ fontSize: '1.2rem' }}>🔒</span>;

function DevelopmentPage({ currentUser }) {
    const [currentLevelId, setCurrentLevelId] = useState(1);
    const [htmlFinalCompleted, setHtmlFinalCompleted] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/api/progress?trail=html", {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const progressMap = {};
                data.records.forEach(r => {
                    progressMap[r.activityId] = r.completed;
                });

                if (progressMap["end"]) {
                    setHtmlFinalCompleted(true);
                }
            }
        })
        .catch(err => console.error("Erro ao buscar progresso HTML", err));
    }, []);

    const levels = [
        { id: 1, title: 'HTML: O Esqueleto', type: 'html', description: 'Aprenda as tags básicas' },
        { id: 2, title: 'CSS: Colorindo o Mundo', type: 'css', description: 'Cores e Fundos', requiresHtmlFinal: true },
        { id: 3, title: 'CSS: A Arte da Caixa', type: 'css', description: 'Margens e Padding' },
        { id: 4, title: 'JS: A Mágica Acontece', type: 'js', description: 'Variáveis e Alertas' },
        { id: 5, title: 'JS: O Robô Pensante', type: 'js', description: 'Condicionais IF/ELSE' },
        { id: 6, title: 'Desafio Final', type: 'boss', description: 'Construa seu site' },
    ];

    const getStatus = (level) => {
        if (level.requiresHtmlFinal && !htmlFinalCompleted) return 'locked';

        if (level.id < currentLevelId) return 'completed';
        if (level.id === currentLevelId) return 'active';
        return 'locked';
    };

    const handlePlayLevel = (level) => {
        alert(`Iniciando a aula: ${level.title}... 🚀`);
        
        setTimeout(() => {
            setCurrentLevelId((prev) => {
                if (prev < levels.length) return prev + 1;
                alert("Parabéns! Você completou toda a trilha!");
                return prev;
            });
        }, 1000);
    };

    return (
        <Layout user={currentUser} pageTitle="Trilha de Código">
            <div className="development-page-container">
                <header className="dev-header">
                    <h1 className="dev-title">Trilha de Programação 🚀</h1>
                    <p className="dev-subtitle">Complete os desafios para ganhar favos!</p>
                </header>

                <div className="game-board">
                    <div className="path-line"></div>

                    {levels.map((level, index) => {
                        const status = getStatus(level);
                        const isLeft = index % 2 === 0;

                        return (
                            <div key={level.id} className={`level-row ${isLeft ? 'left' : 'right'} ${status}`}>
                                
                                <div className="level-card" onClick={() => {
                                    if (status === 'completed') alert("Você já completou essa fase! (Revisão)");
                                    if (status === 'locked') alert("Esta fase está bloqueada! Complete a anterior.");
                                }}>
                                    <div className="card-header">
                                        <span className="level-number">Fase {level.id}</span>
                                        {status === 'locked' && <LockIcon />}
                                        {status === 'completed' && <span>✅</span>}
                                    </div>

                                    <h3>{level.title}</h3>
                                    <p>{level.description}</p>

                                    {status === 'active' && (
                                        <button 
                                            className="start-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                if (level.type === "html") {
                                                    window.location.href = "/trilha/html";
                                                    return;
                                                }

                                                handlePlayLevel(level);
                                            }}
                                        >
                                            JOGAR
                                        </button>
                                    )}
                                </div>

                                <div className="level-node">
                                    {level.type === 'html' && <HtmlIcon />}
                                    {level.type === 'css' && <CssIcon />}
                                    {level.type === 'js' && <JsIcon />}
                                    {level.type === 'boss' && <span>🏆</span>}
                                </div>

                                <div className="spacer"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

export default DevelopmentPage;
