import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa o roteador
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolvemos o App com o BrowserRouter para que as rotas funcionem */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
