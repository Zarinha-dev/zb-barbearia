
import React, { useState } from 'react';
import { User } from '../types';
import { db } from '../services/database';

const Login: React.FC<{ onLogin: (user: User) => void; onGoRegister: () => void }> = ({ onLogin, onGoRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = db.findUserByEmail(email);
    
    if (user) {
      onLogin(user);
    } else {
      setError('Usuário não encontrado ou senha inválida.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 animate-in fade-in zoom-in duration-500">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-black text-center mb-8 gold-gradient uppercase">Acesso VIP</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-bold mb-6 text-center uppercase tracking-widest">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">E-mail</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#d4af37] transition-all"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Senha</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#d4af37] transition-all"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full gold-bg text-black py-4 rounded-xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-gold-500/10">
            ENTRAR
          </button>
        </form>
        <p className="mt-8 text-center text-white/40 text-sm">
          Ainda não é do time? <button onClick={onGoRegister} className="text-[#d4af37] font-bold hover:underline">Cadastre-se</button>
        </p>
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-white/20 uppercase tracking-[4px]">Admin: admin@zb.com</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
