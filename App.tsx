
import React, { useState, useEffect } from 'react';
import { User } from './types';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Booking from './components/Booking';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Register from './components/Register';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'home' | 'booking' | 'admin' | 'login' | 'register'>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('zb_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
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

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-black text-[#d4af37] font-black">ZB BARBEARIA...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={user} 
        onNavigate={setView} 
        onLogout={handleLogout} 
        currentView={view}
      />
      
      <main className="flex-grow">
        {view === 'home' && <Home user={user} onBook={() => setView('booking')} onAdmin={() => setView('admin')} />}
        {view === 'booking' && <Booking user={user} />}
        {view === 'admin' && user?.role === 'admin' && <AdminDashboard />}
        {view === 'login' && <Login onLogin={handleLogin} onGoRegister={() => setView('register')} />}
        {view === 'register' && <Register onGoLogin={() => setView('login')} />}
      </main>

      <footer className="bg-[#050505] border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black gold-gradient tracking-tighter">ZB BARBEARIA</h2>
            <p className="text-white/40 mt-2">© {new Date().getFullYear()} - Nine, Portugal.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-white/60 hover:text-[#d4af37] transition-colors">Instagram</a>
            <a href="#" className="text-white/60 hover:text-[#d4af37] transition-colors">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
