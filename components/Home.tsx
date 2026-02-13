
import React from 'react';
import { User } from '../types.ts';

interface HomeProps {
  user: User | null;
  onBook: () => void;
  onAdmin: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onBook, onAdmin }) => {
  const images = [
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1621605815841-28d944683b9e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599351431247-f509403971c7?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512690199101-8d8eb8bbd5d4?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1634441484823-f29b3de90a02?q=80&w=800&auto=format&fit=crop'
  ];

  const availableSlots = ['14:00', '15:20', '16:40', '17:20', '18:00'];

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1512690199101-8d8eb8bbd5d4?q=80&w=1920&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105" 
          alt="Barber Shop" 
        />
        
        <div className="relative z-20 max-w-4xl px-6 text-center">
          <span className="inline-block gold-bg text-black px-5 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-6 uppercase">
            {user ? `Seja bem-vindo, ${user.name}` : 'Estilo & Excelência'}
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            {user ? (
              <>CUIDE DA SUA <br /><span className="gold-gradient italic">PRESENÇA.</span></>
            ) : (
              <>ZB BARBEARIA <br /><span className="gold-gradient italic">PREMIUM.</span></>
            )}
          </h1>
          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            {user 
              ? 'Sua próxima experiência de estilo está a apenas alguns cliques.' 
              : 'A excelência no corte e o rigor no detalhe. O refúgio do homem moderno em Nine, Portugal.'}
          </p>
          {!user && (
            <button 
              onClick={onBook}
              className="gold-bg text-black px-14 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-gold-500/20 active:scale-95"
            >
              AGENDAR EXPERIÊNCIA
            </button>
          )}
        </div>
      </section>

      {user && (
        <section className="relative z-30 -mt-24 px-6 mb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              
              <div className="bg-[#111] border border-[#d4af37]/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] opacity-5 blur-3xl -mr-16 -mt-16 group-hover:opacity-10 transition-opacity" />
                <h3 className="text-xs font-black text-[#d4af37] tracking-widest mb-6 uppercase">Cartão Fidelidade</h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${i < 6 ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-white/5 bg-black/40'}`}
                    >
                      {i < 6 ? (
                        <svg className="w-5 h-5 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      ) : (
                        <span className="text-[10px] text-white/20 font-bold">{i + 1}</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-xs">Faltam <span className="text-white font-bold">4 cortes</span> para sua recompensa!</p>
              </div>

              <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 h-full">
                  <div className="flex-1">
                    <h2 className="text-xs font-black text-white/40 tracking-[0.2em] mb-4 uppercase">Agenda de Hoje</h2>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {availableSlots.map(slot => (
                        <button key={slot} onClick={onBook} className="bg-black/50 border border-white/5 hover:border-[#d4af37] px-5 py-2.5 rounded-xl font-bold text-sm transition-all">{slot}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 min-w-[220px] w-full md:w-auto">
                    <button onClick={onBook} className="w-full gold-bg text-black py-4 rounded-xl font-black text-sm">NOVO AGENDAMENTO</button>
                    {user.role === 'admin' && (
                      <button onClick={onAdmin} className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-xl font-bold text-sm">PAINEL ADMIN</button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-[2rem] border border-white/10 aspect-[4/5]">
              <img src={src} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={`Estilo ${i}`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
