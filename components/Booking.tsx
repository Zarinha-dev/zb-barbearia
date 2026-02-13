
import React, { useState, useEffect } from 'react';
import { Service, User } from '../types.ts';

const Booking: React.FC<{ user: User | null }> = ({ user }) => {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setServices([
      { id: 1, name: 'Corte Premium', price_cents: 3500, duration_min: 40 },
      { id: 2, name: 'Barba Terapia', price_cents: 2500, duration_min: 30 },
      { id: 3, name: 'Combo ZB (Corte + Barba)', price_cents: 5500, duration_min: 70 },
      { id: 4, name: 'Platinado / Pigmentação', price_cents: 8000, duration_min: 120 },
    ]);
  }, []);

  const slots = ['09:00', '09:40', '10:20', '11:00', '14:00', '14:40', '15:20', '16:00', '17:00', '18:00'];

  const handleBook = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
      setSelectedService(null);
      setSelectedTime('');
    }, 4000);
  };

  if (isSuccess) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center px-6 animate-fade-in">
        <div className="w-24 h-24 gold-bg rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-gold-500/20">
          <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-black mb-2 gold-gradient">AGENDADO COM SUCESSO!</h2>
        <p className="text-white/60 font-medium">Te esperamos no dia {selectedDate.split('-').reverse().join('/')} às {selectedTime}.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black gold-gradient tracking-tighter">AGENDAMENTO</h2>
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest mt-1">Reserve seu lugar na elite</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${step >= i ? 'w-12 gold-bg' : 'w-6 bg-white/5'}`} />
          ))}
        </div>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-[#d4af37]">01. Escolha o Serviço</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedService(s); setStep(2); }}
                  className={`flex flex-col text-left p-8 rounded-3xl border transition-all duration-300 group ${selectedService?.id === s.id ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-white/5 bg-black/40 hover:border-white/20'}`}
                >
                  <span className="font-black text-xl mb-1 group-hover:text-[#d4af37] transition-colors">{s.name}</span>
                  <span className="text-white/30 text-xs font-bold uppercase tracking-widest mb-6">{s.duration_min} minutos</span>
                  <div className="mt-auto flex justify-between items-center w-full">
                    <span className="text-2xl font-black gold-gradient">R$ {(s.price_cents / 100).toFixed(2)}</span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all">
                      <svg className="w-4 h-4 text-white group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#d4af37]">02. Selecione Data e Hora</h3>
              <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors underline decoration-[#d4af37]">Voltar</button>
            </div>
            
            <div className="mb-10">
              <label className="block text-[10px] font-black uppercase tracking-widest text-white/20 mb-3">Data da Experiência</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-black border border-white/5 rounded-2xl p-5 text-white outline-none focus:border-[#d4af37] transition-all font-bold text-lg"
              />
            </div>

            <label className="block text-[10px] font-black uppercase tracking-widest text-white/20 mb-3">Horários Disponíveis</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {slots.map(t => (
                <button
                  key={t}
                  onClick={() => { setSelectedTime(t); setStep(3); }}
                  className={`py-4 rounded-2xl font-black text-sm border transition-all duration-300 ${selectedTime === t ? 'border-[#d4af37] gold-bg text-black' : 'border-white/5 bg-black/40 hover:border-white/20 text-white/40 hover:text-white'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && selectedService && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#d4af37]">03. Revisão Final</h3>
              <button onClick={() => setStep(2)} className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors underline decoration-[#d4af37]">Voltar</button>
            </div>

            <div className="bg-black/60 border border-white/5 p-10 rounded-[2rem] mb-10 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-white/20 text-xs font-black uppercase tracking-widest">Serviço</span>
                <span className="font-black text-xl text-white/90">{selectedService.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/20 text-xs font-black uppercase tracking-widest">Data & Hora</span>
                <span className="font-black text-xl text-white/90">{selectedDate.split('-').reverse().join('/')} às {selectedTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/20 text-xs font-black uppercase tracking-widest">Duração</span>
                <span className="font-black text-xl text-white/90">{selectedService.duration_min} min</span>
              </div>
              <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-white/20 text-xs font-black uppercase tracking-widest">Total a Pagar</span>
                <span className="text-4xl font-black gold-gradient">R$ {(selectedService.price_cents / 100).toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleBook}
              className="w-full gold-bg text-black py-6 rounded-[1.5rem] font-black text-xl shadow-2xl shadow-gold-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tighter"
            >
              Confirmar Reserva
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
