import React, { useState } from 'react';
import Layout from "../components/Layout";
import './DevelopmentPage.css';

// Ícones simples
const HtmlIcon = () => <span style={{ fontSize: '1.5rem' }}>📄</span>;
const CssIcon = () => <span style={{ fontSize: '1.5rem' }}>🎨</span>;
const JsIcon = () => <span style={{ fontSize: '1.5rem' }}>⚡</span>;
const LockIcon = () => <span style={{ fontSize: '1.2rem' }}>🔒</span>;

function DevelopmentPage({ currentUser }) {
    // Começa na fase 1
    const [currentLevelId, setCurrentLevelId] = useState(1); 

    const levels = [
        { id: 1, title: 'HTML: O Esqueleto', type: 'html', description: 'Aprenda as tags básicas' },
        { id: 2, title: 'CSS: Colorindo o Mundo', type: 'css', description: 'Cores e Fundos' },
        { id: 3, title: 'CSS: A Arte da Caixa', type: 'css', description: 'Margens e Padding' },
        { id: 4, title: 'JS: A Mágica Acontece', type: 'js', description: 'Variáveis e Alertas' },
        { id: 5, title: 'JS: O Robô Pensante', type: 'js', description: 'Condicionais IF/ELSE' },
        { id: 6, title: 'Desafio Final', type: 'boss', description: 'Construa seu site' },
    ];

    const getStatus = (levelId) => {
        if (levelId < currentLevelId) return 'completed';
        if (levelId === currentLevelId) return 'active';
        return 'locked';
    };

    const handlePlayLevel = (level) => {
        alert(`Iniciando a aula: ${level.title}... 🚀`);
        
        setTimeout(() => {
            setCurrentLevelId((prevLevel) => {
                // Se não for a última fase,avança
                if (prevLevel < levels.length) {
                    return prevLevel + 1;
                }
                alert("Parabéns! Você completou toda a trilha!");
                return prevLevel;
            });
        }, 1000);
    };

    return (
        <Layout user={currentUser} pageTitle="Trilha de Código">
            <div className="development-page-container">
                <header className="dev-header">
                    <h1 className="dev-title">Trilha de Programação 🚀</h1>
                    <p className="dev-subtitle">Complete os desafios para ganhar favos!</p>
                    {/* Exibe o progresso atual */}
                    <p style={{fontSize: '0.9rem', color: '#888'}}>Nível Atual: {currentLevelId}</p>
                </header>

                <div className="game-board">
                    <div className="path-line"></div>

                    {levels.map((level, index) => {
                        const status = getStatus(level.id);
                        const isLeft = index % 2 === 0;

                        return (
                            <div key={level.id} className={`level-row ${isLeft ? 'left' : 'right'} ${status}`}>
                                
                                <div className="level-card" onClick={() => {
                                    if (status === 'completed') alert("Você já completou essa fase! (Modo Revisão)");
                                    if (status === 'locked') alert("Complete a fase anterior para desbloquear esta.");
                                }}>
                                    <div className="card-header">
                                        <span className="level-number">Fase {level.id}</span>
                                        {status === 'locked' && <LockIcon />}
                                        {status === 'completed' && <span>✅</span>}
                                    </div>
                                    <h3>{level.title}</h3>
                                    <p>{level.description}</p>
                                    
                                    {status === 'active' && (
                                        //chama o setCUrrentLevelId
                                        <button 
                                            className="start-btn"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Evita clicar no card ao clicar no botao
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
                                    
                                    {status === 'active' && (
                                        <div className="user-avatar-marker">
                                            <img 
                                                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser?.displayName || 'Bee'}`}
                                                alt="Avatar" 
                                            />
                                        </div>
                                    )}
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
