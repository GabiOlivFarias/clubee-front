import React from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';
import SchoolIcon from "../assets/icons/SchoolIcon";
import CombIcon from "../assets/icons/CombIcon";


function Layout({ user, pageTitle, children }) {
    return (
        <div className="app-container">
            <header className="main-header">
                <div className="logo">CLUBEE - {pageTitle}</div>
                
                <nav className="main-nav">
                    <Link to="/dashboard" className="nav-btn" style={{ textDecoration: "none" }}>
                        <SchoolIcon className="btn-icon"/>
                        <span className="nav-text">Dashboard</span>
                    </Link>
                    <Link to="/colmeias" className="nav-btn" style={{ textDecoration: "none" }}>
                        <CombIcon className="btn-icon"/>
                        <span className="nav-text">Colmeias</span>
                    </Link>
                </nav>

                <div className="user-info">
                    <span>Olá, {user ? user.displayName : 'Visitante'}</span>
                </div>
            </header>
            
            <main className="page-content">
                {children}
            </main>
        </div>
    );
}

export default Layout;
