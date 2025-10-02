import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CreateZunzum from "../components/CreateZunzum";
import ZunzumPost from "../components/ZunzumPost";
import "./ZunzunsPage.css";

function ZunzunsPage({ currentUser, backendUrl }) {
  const [zunzuns, setZunzuns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchZunzuns = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/zunzuns`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setZunzuns(data);
      } else {
        console.error("Falha ao buscar Zunzuns:", response.status);
      }
    } catch (error) {
      console.error("Erro de rede ao buscar Zunzuns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZunzuns();
  }, [backendUrl]);

  const handleNewZunzum = (newZunzum) => {
    setZunzuns((prevZunzuns) => [newZunzum, ...prevZunzuns]);
  };

  return (
    <Layout user={currentUser} pageTitle="Zunzuns">
      <div className="zunzum-page-container">
        <h1 className="zunzum-page-title">Zunzum na Colmeia 🐝</h1>

        <div className="zunzum-feed-wrapper">
          <CreateZunzum
            onZunzumPosted={handleNewZunzum}
            backendUrl={backendUrl}
          />

          <div className="feed-separator">
            <span className="separator-text">Posts Recentes</span>
          </div>
          <div className="zunzum-feed">
            {loading ? (
              <p className="loading-message">Carregando zunzuns...</p>
            ) : zunzuns.length === 0 ? (
              <p className="empty-message">
                Ninguém zumbiu ainda. Seja o primeiro!
              </p>
            ) : (
              zunzuns.map((zunzum) => (
                <ZunzumPost key={zunzum.id} zunzum={zunzum} />
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ZunzunsPage;
