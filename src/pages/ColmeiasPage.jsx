import React from 'react';
import { Link } from 'react-router-dom';
import './ColmeiasPage.css';

function ColmeiasPage({ communities, onCreateCommunity }) {
    const handleCreate = () => { /* ... lógica de prompt ... */ };

    return (
        <div className="colmeias-container">
            <header className="colmeias-header">
                <Link to="/dashboard" className="back-button">← Voltar</Link>
                <h1>Explore as Colmeias 🐝</h1>
            </header>
            <div className="colmeias-list">
                <div className="colmeia-card create-card" onClick={handleCreate}>
                    <div className="plus-icon">+</div>
                    <h4>Formar uma<br/>Nova Colmeia</h4>
                </div>
                {communities.map(community => (
                    <Link to={`/colmeias/${community.id}`} key={community.id} className="colmeia-card-link">
                        <div className="colmeia-card">
                            <h4>{community.name}</h4>
                            <p>{community.members} membro(s)</p>
                            <div className="recursos">🍯 {community.favos || 0}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ColmeiasPage;
