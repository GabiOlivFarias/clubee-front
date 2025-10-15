import React, { useState } from 'react';
import './ConteudoTurma.css';

const MATERIAS = ["Português", "Matemática", "Ciências", "História", "Geografia", "Artes", "Ed. Física", "Inglês"];

function ConteudoTurma({ turma, conteudosDaTurma, onAbrirModal }) {
    const [materiaAtiva, setMateriaAtiva] = useState(MATERIAS[0]);
    const conteudosFiltrados = conteudosDaTurma[materiaAtiva] || [];

    return (
        <div className="conteudo-turma-container">
            <div className="conteudo-turma-header">
                <h2>{turma.nome}</h2>
                <button className="btn-adicionar" onClick={onAbrirModal}>+ Adicionar Conteúdo</button>
            </div>
            <div className="tabs-materias">
                {MATERIAS.map(materia => (
                    <button key={materia} className={`tab ${materiaAtiva === materia ? 'active' : ''}`} onClick={() => setMateriaAtiva(materia)}>
                        {materia}
                    </button>
                ))}
            </div>
            <div className="feed-conteudo">
                {conteudosFiltrados.length > 0 ? (
                    conteudosFiltrados.slice().reverse().map(item => (
                        <div key={item.id} className="post-conteudo">
                            <div className="post-header">
                                <span className="post-autor">👤 {item.autor}</span>
                                <span className="post-data">🗓️ {item.data}</span>
                            </div>
                            <div className="post-body">
                                {item.tipo === 'imagem' ? (
                                    <div className="post-imagens-container">
                                        {Array.isArray(item.conteudo) ? (
                                            item.conteudo.map((imgSrc, index) => (
                                                <img key={index} src={imgSrc} alt={`Conteúdo ${index + 1}`} className="post-imagem"/>
                                            ))
                                        ) : (
                                            <img src={item.conteudo} alt="Conteúdo do caderno" className="post-imagem"/>
                                        )}
                                    </div>
                                ) : (
                                    <p>{item.conteudo}</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="sem-conteudo">
                        <p>Nenhum conteúdo adicionado para {materiaAtiva} ainda.</p>
                        <p>Seja o primeiro a colaborar!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ConteudoTurma;
