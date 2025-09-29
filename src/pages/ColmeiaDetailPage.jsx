import React from 'react';
import { useParams, Link } from 'react-router-dom'; // useParams para pegar o id da URL
import './ColmeiaDetailPage.css';

function ColmeiaDetailPage({ communities, currentUser, onJoin, onLeave, onOpenAttackModal }) {
  const { id } = useParams(); // Pega o id da colmeia da URL
  const community = communities.find(c => c.id === parseInt(id));

  if (!community) {
    return <div>Colmeia não encontrada!</div>;
  }

  const isMember = community.memberList?.includes(currentUser.displayName);
  const playerHasACommunity = communities.some(c => c.memberList?.includes(currentUser.displayName));

  return (
    <div className="detail-container">
      <Link to="/colmeias" className="back-button">← Voltar</Link>
      <div className="detail-header">
        <h1>{community.name}</h1>
        <div className="detail-stats">
          <span>{community.members} membros</span>
          <span>🍯 {community.favos || 0} favos</span>
        </div>
      </div>
      <div className="detail-members">
        <h3>Membros da Colmeia:</h3>
        <ul>
          {community.memberList && community.memberList.length > 0 
            ? community.memberList.map(member => <li key={member}>{member}</li>)
            : <li>Ainda não há membros.</li>
          }
        </ul>
      </div>
      <div className="detail-actions">
        {isMember ? (
          <button className="leave-btn" onClick={() => onLeave(community.id)}>Sair da Colmeia</button>
        ) : (
          <button className="join-btn" onClick={() => onJoin(community.id)}>Entrar na Colmeia</button>
        )}

        {playerHasACommunity && !isMember && (
          <button className="attack-btn" onClick={() => onOpenAttackModal(community.id)}>Atacar Colmeia ⚔️</button>
        )}
      </div>
    </div>
  );
}

export default ColmeiaDetailPage;
