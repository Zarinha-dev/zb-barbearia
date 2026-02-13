
import React, { useState } from 'react';
import { User } from '../types';

const Login: React.FC<{ onLogin: (user: User) => void; onGoRegister: () => void }> = ({ onLogin, onGoRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login logic
    const role: 'admin' | 'user' = email.includes('admin') ? 'admin' : 'user';
    onLogin({ id: 1, name: email.split('@')[0], email, role });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 animate-in fade-in zoom-in duration-500">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-black text-center mb-8 gold-gradient">BEM-VINDO DE VOLTA</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">E-mail</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#d4af37]"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Senha</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#d4af37]"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full gold-bg text-black py-4 rounded-xl font-black text-lg hover:scale-[1.02] transition-transform">
            ENTRAR
          </button>
        </form>
        <p className="mt-8 text-center text-white/40 text-sm">
          Ainda não tem conta? <button onClick={onGoRegister} className="text-[#d4af37] font-bold hover:underline">Cadastre-se</button>
        </p>
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-white/20 uppercase tracking-[4px]">Dica: Use 'admin@zb.com' para acessar o painel</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
