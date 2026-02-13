
import React, { useState } from 'react';
import { db } from '../services/database';

const Register: React.FC<{ onGoLogin: () => void }> = ({ onGoLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (db.findUserByEmail(email)) {
      alert('Este e-mail já está cadastrado.');
      return;
    }

    db.saveUser({
      name,
      email,
      role: 'user'
    });

    setIsSuccess(true);
    setTimeout(() => onGoLogin(), 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-20 h-20 gold-bg rounded-full flex items-center justify-center mb-6 shadow-2xl animate-bounce">
          <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-3xl font-black gold-gradient uppercase">Conta Criada!</h2>
        <p className="text-white/40 mt-2 font-bold uppercase text-[10px] tracking-[0.3em]">Preparando seu acesso...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 animate-in fade-in zoom-in duration-500">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-black text-center mb-8 gold-gradient uppercase">Novo Cadastro</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Nome Completo</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#d4af37] transition-all"
              placeholder="Ex: João Silva"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">E-mail</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#d4af37] transition-all"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <button className="w-full gold-bg text-black py-4 rounded-xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-gold-500/10 uppercase">
            Criar Minha Conta
          </button>
        </form>
        <p className="mt-8 text-center text-white/40 text-sm">
          Já faz parte do clube? <button onClick={onGoLogin} className="text-[#d4af37] font-bold hover:underline">Faça login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
