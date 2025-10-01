import React from "react";
import './ZunzunsPage.css';
import Layout from "../components/Layout"; 

function ZunzunsPage({ currentUser }) {
    // Você não precisa de backendUrl, nem state de posts AINDA. Apenas o HTML básico.
    
    return (
        // Envolvemos o conteúdo no Layout
        <Layout user={currentUser} pageTitle="Zunzuns">
            <div className="zunzuns-page-container">
                <h1>Página de Zunzuns (Posts)</h1>
                <p>Esta página está carregando corretamente. Próximo passo: o formulário de postagem!</p>
                
                {/* Aqui entrará o componente CreateZunzum no futuro */}
                {/* Aqui entrará o Feed de posts no futuro */}
            </div>
        </Layout>
    );
}

export default ZunzunsPage;
