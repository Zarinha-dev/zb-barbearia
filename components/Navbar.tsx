
import React, { useState } from 'react';
import { User } from '../types.ts';

interface NavbarProps {
  user: User | null;
  currentView: string;
  onNavigate: (view: any) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, currentView, onNavigate, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink = ({ to, label }: { to: any, label: string }) => (
    <button
      onClick={() => { onNavigate(to); setIsMenuOpen(false); }}
      className={`text-sm font-semibold transition-all hover:text-[#d4af37] ${currentView === to ? 'text-[#d4af37]' : 'text-white/70'}`}
    >
      {label}
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button onClick={() => onNavigate('home')} className="text-2xl font-black tracking-tighter gold-gradient">
          ZB BARBEARIA
        </button>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="home" label="Início" />
          
          {user ? (
            <>
              {user.role === 'admin' ? (
                <NavLink to="admin" label="Dashboard" />
              ) : (
                <NavLink to="booking" label="Agendar" />
              )}
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                <span className="text-xs text-white/40">{user.name}</span>
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 rounded-full border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 transition-colors"
                >
                  Sair
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate('login')} className="text-white/70 hover:text-white text-sm">Login</button>
              <button 
                onClick={() => onNavigate('register')}
                className="gold-bg text-black px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-gold-500/20 hover:scale-105 active:scale-95 transition-transform"
              >
                Cadastrar
              </button>
            </div>
          )}
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 flex flex-col p-6 gap-6 items-center animate-fade-in-down">
          <NavLink to="home" label="Início" />
          {user ? (
            <>
              {user.role === 'admin' ? <NavLink to="admin" label="Dashboard" /> : <NavLink to="booking" label="Agendar" />}
              <button onClick={onLogout} className="text-red-400 font-bold">Sair</button>
            </>
          ) : (
            <>
              <button onClick={() => onNavigate('login')} className="text-white/70">Login</button>
              <button onClick={() => onNavigate('register')} className="gold-bg text-black px-8 py-3 rounded-full font-bold w-full">Cadastrar</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
