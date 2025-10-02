import React, { useState } from 'react';
import './CreateZunzum.css';

function CreateZunzum({ onZunzumPosted, backendUrl }) {
    const [text, setText] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const maxLength = 280;

    const API_BASE = backendUrl || 'http://localhost:3001';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() || isPosting) return;

        setIsPosting(true);

        try {
            const response = await fetch(`${API_BASE}/api/zunzuns`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text.trim(),
                    isAnonymous,
                }),
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                onZunzumPosted(data.zunzum);
                setText('');
                setIsAnonymous(false);
            } else {
                const error = await response.json();
                console.error("Erro ao postar Zunzum:", error.message);
                alert(`Falha ao postar: ${error.message}`);
            }
        } catch (error) {
            console.error("Erro de rede:", error);
            alert("Erro de conexão ao tentar postar.");
        } finally {
            setIsPosting(false);
        }
    };

    const remainingChars = maxLength - text.length;
    const isButtonDisabled = remainingChars < 0 || text.trim().length === 0 || isPosting;

    return (
        <form className="zunzum-form" onSubmit={handleSubmit}>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Qual o zunzum de hoje na colmeia? (Máx. 280 caracteres)"
                rows="4"
                maxLength={maxLength}
                disabled={isPosting}
            />

            <div className="form-controls">
                <div className="anon-option">
                    <input
                        type="checkbox"
                        id="anonymous"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        disabled={isPosting}
                    />
                    <label htmlFor="anonymous">Postar como Abelha Anônima 🤫</label>
                </div>

                <div className="post-metadata">
                    <span className={`char-count ${remainingChars < 10 ? 'low-chars' : ''}`}>
                        {remainingChars}
                    </span>
                    <button
                        type="submit"
                        className="post-button"
                        disabled={isButtonDisabled}
                    >
                        {isPosting ? 'Zumbindo...' : 'Postar Zunzum'}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default CreateZunzum;
