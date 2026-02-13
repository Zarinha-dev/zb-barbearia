
import React, { useState, useEffect } from 'react';
import { Service, User } from '../types';
import { db } from '../services/database';

const Booking: React.FC<{ user: User | null }> = ({ user }) => {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setServices([
      { id: 1, name: 'CORTE PREMIUM', price_cents: 3500, duration_min: 45 },
      { id: 2, name: 'BARBA THERAPY', price_cents: 2500, duration_min: 30 },
      { id: 3, name: 'COMBO ZB MASTER', price_cents: 5500, duration_min: 75 },
      { id: 4, name: 'COLORIMETRIA / PLATINADO', price_cents: 8500, duration_min: 120 },
    ]);
  }, []);

  const handleBook = () => {
    if (!user || !selectedService) return;

    db.saveAppointment({
      user_id: user.id,
      service_id: selectedService.id,
      date: selectedDate,
      time: selectedTime,
      status: 'booked',
      price_cents: selectedService.price_cents,
      client_name: user.name,
      client_email: user.email,
      service: selectedService.name
    });

    setIsSuccess(true);
    setTimeout(() => {
      window.location.reload(); // Recarregar para resetar estado
    }, 4000);
  };

  if (isSuccess) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center px-6 animate-slide-up">
        <div className="relative mb-10">
           <div className="absolute inset-0 bg-[#d4af37] blur-3xl opacity-20 animate-pulse" />
           <div className="relative w-32 h-32 gold-bg rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
           </div>
        </div>
        <h2 className="text-5xl font-black mb-4 gold-gradient italic tracking-tighter uppercase">Reserva Confirmada!</h2>
        <p className="text-white/50 font-medium text-lg max-w-md mx-auto italic">
          Tudo pronto, <span className="text-white font-bold">{user?.name}</span>! Te esperamos em <span className="text-white">{selectedDate.split('-').reverse().join('/')}</span> às <span className="text-white font-black">{selectedTime}</span>.
        </p>
        <div className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Finalizando experiência...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-24 px-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-xs font-black text-[#d4af37] tracking-[0.5em] uppercase mb-4">Passo 0{step}</h2>
          <h3 className="text-6xl font-black tracking-tighter uppercase italic">O seu momento.</h3>
        </div>
        <div className="flex gap-3 pb-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-700 ${step >= i ? 'w-16 gold-bg' : 'w-8 bg-white/5'}`} />
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-[3rem] p-8 md:p-16 shadow-3xl">
        {step === 1 && (
          <div className="animate-slide-up">
            <p className="text-xs font-black uppercase tracking-[0.3em] mb-12 text-white/30">Selecione o serviço premium</p>
            <div className="grid sm:grid-cols-2 gap-6">
              {services.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedService(s); setStep(2); }}
                  className={`group relative flex flex-col text-left p-10 rounded-3xl border transition-all duration-500 overflow-hidden ${selectedService?.id === s.id ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-white/5 bg-black/40 hover:border-white/20'}`}
                >
                  <div className="relative z-10">
                    <h4 className="font-black text-2xl mb-1 group-hover:text-[#d4af37] transition-colors">{s.name}</h4>
                    <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-8">{s.duration_min} min</p>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-black gold-gradient">R$ {(s.price_cents / 100).toFixed(2)}</span>
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all transform group-hover:translate-x-1">
                        <svg className="w-5 h-5 text-white group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-12">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Agenda Disponível</p>
              <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] hover:underline transition-all">Alterar serviço</button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Data</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl p-6 text-white outline-none focus:border-[#d4af37] transition-all font-black text-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Horário</label>
                <div className="grid grid-cols-3 gap-3">
                  {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'].map(t => (
                    <button
                      key={t}
                      onClick={() => { setSelectedTime(t); setStep(3); }}
                      className={`py-5 rounded-2xl font-black text-sm border transition-all duration-300 ${selectedTime === t ? 'border-[#d4af37] gold-bg text-black' : 'border-white/5 bg-black/20 hover:border-white/20 text-white/30 hover:text-white'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && selectedService && (
          <div className="animate-slide-up max-w-2xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-center mb-12 text-white/30">Revisão Final</p>

            <div className="bg-black/60 border border-white/5 p-12 rounded-[2.5rem] mb-12 space-y-8 relative overflow-hidden">
              <div className="flex justify-between items-end border-b border-white/5 pb-6">
                <div className="space-y-1">
                  <span className="text-white/20 text-[10px] font-black uppercase tracking-widest block">Experiência</span>
                  <span className="font-black text-2xl uppercase italic gold-gradient">{selectedService.name}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <span className="text-white/20 text-[10px] font-black uppercase tracking-widest block">Data</span>
                  <span className="font-black text-xl text-white/80">{selectedDate.split('-').reverse().join('/')}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-white/20 text-[10px] font-black uppercase tracking-widest block">Hora</span>
                  <span className="font-black text-xl text-white/80">{selectedTime}</span>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">Total</span>
                <span className="text-4xl font-black gold-gradient">R$ {(selectedService.price_cents / 100).toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleBook}
              className="w-full gold-bg text-black py-7 rounded-3xl font-black text-xl shadow-2xl shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tighter"
            >
              Confirmar Agendamento
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
