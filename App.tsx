
import React, { useState, useEffect } from 'react';
import { User } from './types';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Booking from './components/Booking';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Register from './components/Register';
import Documentation from './components/Documentation';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'home' | 'booking' | 'admin' | 'login' | 'register' | 'docs'>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('zb_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Erro ao recuperar sessão:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('zb_user', JSON.stringify(u));
    setView('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('zb_user');
    setView('home');
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-black gold-gradient tracking-[0.3em] animate-pulse">ZB BARBEARIA</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Navbar 
        user={user} 
        onNavigate={setView} 
        onLogout={handleLogout} 
        currentView={view}
      />
      
      <main className="flex-grow">
        {view === 'home' && (
          <Home 
            user={user} 
            onBook={() => setView(user ? 'booking' : 'login')} 
            onAdmin={() => setView('admin')} 
          />
        )}
        {view === 'booking' && <Booking user={user} />}
        {view === 'admin' && user?.role === 'admin' && <AdminDashboard />}
        {view === 'login' && <Login onLogin={handleLogin} onGoRegister={() => setView('register')} />}
        {view === 'register' && <Register onGoLogin={() => setView('login')} />}
        {view === 'docs' && <Documentation />}
      </main>

      <footer className="bg-black border-t border-white/5 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black gold-gradient tracking-tighter">ZB BARBEARIA</h2>
            <p className="text-white/40 mt-2 text-sm uppercase tracking-widest font-bold">Nine, Portugal</p>
          </div>
          <div className="flex gap-8">
            <button onClick={() => setView('docs')} className="text-white/40 hover:text-[#d4af37] transition-colors font-black text-xs tracking-widest uppercase">Tech Docs</button>
            <a href="#" className="text-white/40 hover:text-[#d4af37] transition-colors font-black text-xs tracking-widest uppercase">Instagram</a>
            <a href="#" className="text-white/40 hover:text-[#d4af37] transition-colors font-black text-xs tracking-widest uppercase">WhatsApp</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-[10px] text-white/20 font-bold uppercase tracking-[0.5em]">
          © {new Date().getFullYear()} - Onde o Estilo Encontra a Atitude
        </div>
      </footer>
    </div>
  );
};

export default App;
