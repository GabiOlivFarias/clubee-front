import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ZunzunsPage from "./pages/ZunzunsPage";
import DashboardPage from "./pages/DashboardPage";
import ColmeiasPage from "./pages/ColmeiasPage";
import ColmeiaDetailPage from "./pages/ColmeiaDetailPage";
import AttackModal from "./components/AttackModal";
import "./App.css";

function App() {
  // NOVO: Linha mágica que escolhe a URL do backend automaticamente.
  // Em modo de desenvolvimento, usa 'localhost'. No deploy, usa a URL da Vercel.
  const backendUrl = import.meta.env.DEV
    ? "http://localhost:3001"
    : import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [communities, setCommunities] = useState(() => {
    const saved = localStorage.getItem("clubee_communities");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Odeio Acordar Cedo 😴",
            members: 3,
            memberList: [],
            favos: 10,
          },
          {
            id: 2,
            name: "Time de Futsal ⚽",
            members: 12,
            memberList: [],
            favos: 25,
          },
          {
            id: 3,
            name: "Fãs de Roblox 🎮",
            members: 7,
            memberList: [],
            favos: 15,
          },
        ];
  });
  const [isAttackModalOpen, setIsAttackModalOpen] = useState(false);
  const [attackData, setAttackData] = useState({
    attacker: null,
    defender: null,
  });

  // Salva no localStorage sempre que as comunidades são alteradas
  useEffect(() => {
    localStorage.setItem("clubee_communities", JSON.stringify(communities));
  }, [communities]);

  // Verifica o status do login depois de carregar
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // ALTERADO: Usando a variável backendUrl
        const response = await fetch(`${backendUrl}/api/user/me`, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Backend não está rodando ou falhou:", error);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, [backendUrl]); // Adicionado backendUrl como dependência

  const handleLogout = () => {
    setUser(null);
    // ALTERADO: Usando a variável backendUrl
    window.location.href = `${backendUrl}/auth/logout`;
  };

  const handleCreateCommunity = (name) => {
    const newCommunity = {
      id: Date.now(),
      name: name,
      members: 1,
      memberList: [user.displayName],
      favos: 5,
    };
    setCommunities((prev) => [...prev, newCommunity]);
  };

  const handleJoinCommunity = (communityId) => {
    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id === communityId && !c.memberList.includes(user.displayName)) {
          return {
            ...c,
            members: c.members + 1,
            memberList: [...c.memberList, user.displayName],
          };
        }
        return c;
      })
    );
  };

  const handleLeaveCommunity = (communityId) => {
    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id === communityId && c.memberList.includes(user.displayName)) {
          return {
            ...c,
            members: c.members - 1,
            memberList: c.memberList.filter(
              (member) => member !== user.displayName
            ),
          };
        }
        return c;
      })
    );
  };

  const handleOpenAttackModal = (defenderId) => {
    const attacker = communities.find((c) =>
      c.memberList.includes(user.displayName)
    );
    const defender = communities.find((c) => c.id === defenderId);

    if (!attacker) {
      alert("Você precisa fazer parte de uma colmeia para atacar!");
      return;
    }
    if (attacker.id === defender.id) return;

    setAttackData({ attacker, defender });
    setIsAttackModalOpen(true);
  };

  const handleResolveAttack = () => {
    const { attacker, defender } = attackData;
    const successChance = 0.5 + (attacker.members - defender.members) * 0.05;
    const isSuccess =
      Math.random() < Math.max(0.1, Math.min(0.9, successChance));

    if (isSuccess) {
      setCommunities((prev) =>
        prev.map((c) => {
          if (c.id === attacker.id) return { ...c, favos: c.favos + 1 };
          if (c.id === defender.id)
            return { ...c, favos: c.favos > 0 ? c.favos - 1 : 0 };
          return c;
        })
      );
      return "victory";
    } else {
      return "defeat";
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <DashboardPage user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/colmeias"
          element={
            user ? (
              <ColmeiasPage
                communities={communities}
                currentUser={user}
                onCreateCommunity={handleCreateCommunity}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/colmeias/:id"
          element={
            user ? (
              <ColmeiaDetailPage
                communities={communities}
                currentUser={user}
                onJoin={handleJoinCommunity}
                onLeave={handleLeaveCommunity}
                onOpenAttackModal={handleOpenAttackModal}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/zunzuns"
          element={
            user ? (
              <ZunzunsPage
                communities={communities}
                currentUser={user}
                onCreateCommunity={handleCreateCommunity}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={
            user ? (
              <DashboardPage
                user={user}
                onLogout={handleLogout}
                backendUrl={backendUrl} // << ADICIONE ISTO
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      {isAttackModalOpen && (
        <AttackModal
          attacker={attackData.attacker}
          defender={attackData.defender}
          onResolveAttack={handleResolveAttack}
          onClose={() => setIsAttackModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;
