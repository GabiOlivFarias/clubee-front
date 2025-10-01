import React from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';

function Layout({ user, pageTitle, children, onLogout }) {
    return (
        <div className="app-container">
            <header className="main-header">
                <div className="logo">CLUBEE - {pageTitle}</div>
                
                <nav className="main-nav">
                    {/* LINKS DE NAVEGAÇÃO PARA TESTAR */}
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/zunzuns">Zunzuns</Link>
                    <Link to="/colmeias">Colmeias</Link>
                </nav>

                <div className="user-info">
                    <span>Olá, {user ? user.displayName : 'Visitante'}</span>
                    {user && (
                        <Link to="/dashboard" className="back-button">← Voltar</Link>
                    )}
                </div>
            </header>
            
            <main className="page-content">
                {children} {/* Aqui entra o conteúdo da página (Zunzuns) */}
            </main>
        </div>
    );
}

export default Layout;
