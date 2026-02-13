
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Erro fatal: Elemento root não encontrado no HTML.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Erro ao renderizar a aplicação:", error);
    rootElement.innerHTML = `<div style="color: white; padding: 20px; text-align: center;">
      <h1 style="color: #d4af37;">Erro ao carregar a Barbearia</h1>
      <p>Verifique o console do navegador para mais detalhes.</p>
    </div>`;
  }
}
