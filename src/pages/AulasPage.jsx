import React, { useState } from "react";
import "./AulasPage.css";
import ConteudoTurma from "../components/ConteudoTurma";
import ModalAdicionarConteudo from "../components/ModalAdicionarConteudo";
import Notebook from "../assets/images/caderno.jpeg";
import Notebook2 from "../assets/images/caderno1.jpeg";

// --- DADOS MOCKADOS
const mockEventos = [
  { id: 1, titulo: "Feira de Ciências 🔬", data: "25/10/2025", descricao: "Apresentação dos projetos de ciências de todas as turmas no pátio principal." },
  { id: 2, titulo: "Festa Junina 🌽", data: "18/06/2025", descricao: "Venha com sua família para nossa tradicional festa com comidas típicas e danças!" },
  { id: 3, titulo: "Dia da Família na Escola 👨‍👩‍👧‍👦", data: "09/11/2025", descricao: "Um dia de atividades e gincanas para alunos e seus familiares." }
];

const mockTurmas = [
  { id: "5A", nome: "5º Ano A" }, { id: "5B", nome: "5º Ano B" }, { id: "5C", nome: "5º Ano C" },
  { id: "6A", nome: "6º Ano A" }, { id: "6B", nome: "6º Ano B" }, { id: "6C", nome: "6º Ano C" },
  { id: "7A", nome: "7º Ano A" }, { id: "7B", nome: "7º Ano B" }, { id: "7C", nome: "7º Ano C" },
  { id: "8A", nome: "8º Ano A" }, { id: "8B", nome: "8º Ano B" }, { id: "8C", nome: "8º Ano C" },
  { id: "9A", nome: "9º Ano A" }, { id: "9B", nome: "9º Ano B" }
];

const mockConteudosIniciais = {
  "5A": { "Português": [ { id: 1, autor: "Maria Clara", data: "13/10/2025", tipo: "texto", conteudo: "A professora disse que na prova de amanhã vai cair interpretação de texto e verbos!" }, { id: 2, autor: "João Marcelo", data: "13/10/2025", tipo: "imagem", conteudo: Notebook } ], "Matemática": [ { id: 3, autor: "Ana Julia", data: "12/10/2025", tipo: "texto", conteudo: "Hoje aprendemos frações equivalentes. Exercícios da página 45 a 48." } ] },
  "5B": { "Português": [], "Ciências": [ { id: 4, autor: "Lucas", data: "13/10/2025", tipo: "texto", conteudo: "Não esquecer de trazer a cartolina para o trabalho sobre o sistema solar amanhã!" } ] },
  "6A": { "Português": [], "Ciências": [ { id: 4, autor: "Lucas", data: "13/10/2025", tipo: "texto", conteudo: "Não esquecer de trazer a cartolina para o trabalho sobre o sistema solar amanhã!" } ] },
  "7B": { "Geografia": [ { id: 1, autor: "Maria Clara", data: "13/10/2025", tipo: "texto", conteudo: "A professora disse que na prova de amanhã vai cair interpretação de texto e verbos!" }, { id: 2, autor: "Isabela", data: "13/10/2025", tipo: "imagem", conteudo: [Notebook, Notebook2] } ], }
};

function AulasPage({ user }) {
  const [visao, setVisao] = useState("eventos"); 
  const [conteudos, setConteudos] = useState(mockConteudosIniciais);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProximoEvento = () => {
    const hoje = new Date();
    const eventosFuturos = mockEventos
      .map(evento => {
        const [dia, mes, ano] = evento.data.split('/');
        return { ...evento, dataObj: new Date(ano, mes - 1, dia) };
      })
      .filter(evento => evento.dataObj >= hoje)
      .sort((a, b) => a.dataObj - b.dataObj);

    return eventosFuturos.length > 0 ? eventosFuturos[0] : null;
  };

  const proximoEvento = getProximoEvento();

  const handleAddConteudo = (novoConteudo) => {
    const { turmaId, materia } = novoConteudo;
    setConteudos(prevConteudos => {
        const novosConteudosDaTurma = { ...prevConteudos[turmaId] };
        const novaListaDeMateria = [...(novosConteudosDaTurma[materia] || []), novoConteudo];
        novosConteudosDaTurma[materia] = novaListaDeMateria;
        return { ...prevConteudos, [turmaId]: novosConteudosDaTurma };
    });
    setIsModalOpen(false);
  };

  const renderConteudoPrincipal = () => {
    if (visao === "eventos") {
      return (
        <div className="eventos-gerais">
          <h2>Eventos da Escola</h2>
          {mockEventos.map(evento => (
            <div key={evento.id} className="card-evento">
              <h3>{evento.titulo}</h3>
              <p className="evento-data">{evento.data}</p>
              <p>{evento.descricao}</p>
            </div>
          ))}
        </div>
      );
    }
    const turmaSelecionada = mockTurmas.find(t => t.id === visao);
    return <ConteudoTurma turma={turmaSelecionada} conteudosDaTurma={conteudos[visao] || {}} onAbrirModal={() => setIsModalOpen(true)} />;
  };

  return (
    <div className="aulas-container">
      <header className="aulas-header">
        <h1>Minhas Aulas</h1>
        <p>Bem-vindo(a) de volta, {user.displayName}!</p>
        
        <div className="header-info-cards">
            <div className="info-card">
                <span className="info-card-title">Próximo Evento</span>
                <span className="info-card-content">{proximoEvento ? proximoEvento.titulo : 'Nenhum evento futuro'}</span>
            </div>
            <div className="info-card">
                <span className="info-card-title">Turmas Disponíveis</span>
                <span className="info-card-content">{mockTurmas.length} Turmas</span>
            </div>
            <div className="info-card">
                <span className="info-card-title">Dica do Dia</span>
                <span className="info-card-content">"Colaborar com os colegas ajuda a fixar o conteúdo!"</span>
            </div>
        </div>
      </header>
      <main className="aulas-main">
        <aside className="aulas-sidebar">
          <h3>Navegação</h3>
          <ul>
            <li className={visao === "eventos" ? "active" : ""} onClick={() => setVisao("eventos")}>
              🎉 Eventos Gerais
            </li>
          </ul>
          <h4>Minha Série</h4>
          <ul>
            {mockTurmas.map(turma => (
              <li key={turma.id} className={visao === turma.id ? "active" : ""} onClick={() => setVisao(turma.id)}>
                📚 {turma.nome}
              </li>
            ))}
          </ul>
        </aside>
        <section className="aulas-conteudo">
          {renderConteudoPrincipal()}
        </section>
      </main>
      
      {isModalOpen && visao !== 'eventos' && (
        <ModalAdicionarConteudo
          turmaId={visao}
          onClose={() => setIsModalOpen(false)}
          onAddConteudo={handleAddConteudo}
          user={user}
        />
      )}
    </div>
  );
}

export default AulasPage;
