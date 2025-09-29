import React, { useState } from 'react';
import './AttackModal.css';

function AttackModal({ attacker, defender, onResolveAttack, onClose }) {
  const [isResolving, setIsResolving] = useState(false);
  const [result, setResult] = useState(null); // null, 'victory', ou 'defeat'

  const handleAttackClick = () => {
    setIsResolving(true);
    // simula um suspense de batalha por 2 segundos
    setTimeout(() => {
      const attackResult = onResolveAttack(); // Chama a lógica principal do App.jsx
      setResult(attackResult);
      setIsResolving(false);
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="attack-modal">
        {!result ? (
          <>
            <h2>Confirmar Ataque</h2>
            <div className="battle-arena">
              <div className="combatant attacker">
                <h3>Sua Colmeia</h3>
                <p className="combatant-name">{attacker.name}</p>
                <p>Força: {attacker.members}</p>
              </div>
              <div className="vs-icon">⚔️</div>
              <div className="combatant defender">
                <h3>Alvo</h3>
                <p className="combatant-name">{defender.name}</p>
                <p>Defesa: {defender.members}</p>
              </div>
            </div>
            {isResolving ? (
              <div className="spinner"></div>
            ) : (
              <button className="launch-attack-btn" onClick={handleAttackClick}>
                Lançar Ataque!
              </button>
            )}
          </>
        ) : (
          <div className="result-screen">
            {result === 'victory' ? (
              <>
                <h2>Vitória!</h2>
                <p className="result-icon">🎉</p>
                <p>Sua colmeia roubou 🍯 +1 Favo de Mel!</p>
              </>
            ) : (
              <>
                <h2>Derrota!</h2>
                <p className="result-icon">🛡️</p>
                <p>A defesa da colmeia inimiga foi muito forte.</p>
              </>
            )}
            <button onClick={onClose} className="close-result-btn">Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AttackModal;
