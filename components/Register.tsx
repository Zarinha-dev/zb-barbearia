
import React, { useState } from 'react';

const Register: React.FC<{ onGoLogin: () => void }> = ({ onGoLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Conta criada com sucesso! (Simulação)');
    onGoLogin();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 animate-in fade-in zoom-in duration-500">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-black text-center mb-8 gold-gradient">CRIAR CONTA</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Nome Completo</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#d4af37]"
              placeholder="Como quer ser chamado?"
            />
          </div>
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
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <button className="w-full gold-bg text-black py-4 rounded-xl font-black text-lg hover:scale-[1.02] transition-transform">
            CRIAR MINHA CONTA
          </button>
        </form>
        <p className="mt-8 text-center text-white/40 text-sm">
          Já possui conta? <button onClick={onGoLogin} className="text-[#d4af37] font-bold hover:underline">Faça login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
