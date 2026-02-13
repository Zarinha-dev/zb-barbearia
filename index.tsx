
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Erro ao inicializar React:", err);
    rootElement.innerHTML = `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: black; color: white; flex-direction: column; font-family: sans-serif;">
        <h1 style="color: #d4af37">ZB BARBEARIA</h1>
        <p>Houve um erro no carregamento. Verifique o console.</p>
      </div>
    `;
  }
}
