import React from 'react';
import './ZunzumPost.css';

function ZunzumPost({ zunzum }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    const isAnonymous = zunzum.isAnonymous || zunzum.author === "Abelha Anônima 🤫";

    return (
        <div className={`zunzum-card ${isAnonymous ? 'anonymous-post' : ''}`}>
            <div className="post-header">
                <div className="author-info">
                    <span className="author-icon">
                        {isAnonymous ? '🤫' : '👤'} 
                    </span>
                    <span className="author-name">
                        {zunzum.author}
                    </span>
                </div>
                <span className="post-date">
                    {formatDate(zunzum.date)}
                </span>
            </div>
            
            <p className="post-text">
                {zunzum.text}
            </p>

            <div className="post-footer">
                <button className="like-button">
                    💛 {zunzum.likes || 0}
                </button>
                {isAnonymous && <span className="anon-tag">Anônimo</span>}
            </div>
        </div>
    );
}

export default ZunzumPost;
