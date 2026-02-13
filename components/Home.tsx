
import React from 'react';
import { User } from '../types.ts';

interface HomeProps {
  user: User | null;
  onBook: () => void;
  onAdmin: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onBook, onAdmin }) => {
  const testimonials = [
    { name: "Carlos M.", text: "Melhor corte de Portugal. O atendimento é outro nível.", role: "Cliente VIP" },
    { name: "Ricardo S.", text: "Ambiente foda e profissionais que entendem de verdade.", role: "Cliente Frequente" }
  ];

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#0a0a0a] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2000&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover scale-110 animate-pulse-slow" 
          alt="Barber Shop Interior" 
          style={{ animationDuration: '20s' }}
        />
        
        <div className="relative z-20 max-w-6xl px-6 text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/80">Premium Experience</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter leading-[0.85]">
            DOMINE O SEU <br />
            <span className="gold-gradient italic">PRÓPRIO ESTILO.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/40 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            Mais que um corte, uma declaração de poder. <br className="hidden md:block" />
            Em Nine, Portugal, elevamos o padrão da estética masculina.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onBook}
              className="gold-bg text-black px-12 py-6 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-gold-500/20 active:scale-95 w-full sm:w-auto uppercase"
            >
              RESERVAR AGORA
            </button>
            {!user && (
              <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
                Novos clientes ganham <span className="text-[#d4af37]">10% OFF</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 px-6 bg-black relative z-30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Cortes/Mês", val: "500+" },
            { label: "Satisfação", val: "99.8%" },
            { label: "Anos de Exp.", val: "12+" },
            { label: "Prêmios", val: "05" }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-4xl md:text-5xl font-black mb-2 gold-gradient group-hover:scale-110 transition-transform">{stat.val}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-xs font-black text-[#d4af37] tracking-[0.5em] uppercase mb-4">Nossa Galeria</h2>
              <h3 className="text-5xl font-black tracking-tighter italic">O PADRÃO ZB.</h3>
            </div>
            <button onClick={onBook} className="text-white/40 hover:text-[#d4af37] text-xs font-black tracking-widest uppercase border-b border-white/10 pb-2 transition-all">Ver todos os serviços</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1621605815841-28d944683b9e?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1512690199101-8d8eb8bbd5d4?q=80&w=800&auto=format&fit=crop'
            ].map((img, i) => (
              <div key={i} className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5">
                <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8">
                  <span className="text-[10px] font-black text-[#d4af37] tracking-widest uppercase">Estilo #{i+1}</span>
                  <h4 className="text-2xl font-black text-white mt-1 uppercase tracking-tighter">Corte Clássico</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 bg-[#050505] px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-10">
            {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
          </div>
          <div className="space-y-16">
            {testimonials.map((t, i) => (
              <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 200}ms` }}>
                <p className="text-2xl md:text-3xl font-medium italic text-white/80 leading-relaxed mb-6">"{t.text}"</p>
                <div className="text-xs font-black uppercase tracking-widest text-[#d4af37]">{t.name} • <span className="text-white/20">{t.role}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
