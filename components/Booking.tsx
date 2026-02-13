
import React, { useState, useEffect } from 'react';
import { Service, User } from '../types';

const Booking: React.FC<{ user: User | null }> = ({ user }) => {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Mock service loading
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
      <div className="h-[60vh] flex flex-col items-center justify-center text-center px-6 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/20">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-black mb-2">AGENDADO COM SUCESSO!</h2>
        <p className="text-white/60">Te esperamos no dia {selectedDate.split('-').reverse().join('/')} às {selectedTime}.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-black gold-gradient">AGENDAMENTO</h2>
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-10 h-2 rounded-full ${step >= i ? 'gold-bg' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-3xl p-8 min-h-[400px]">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <h3 className="text-xl font-bold mb-6 text-white/70">1. Escolha o serviço</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedService(s); setStep(2); }}
                  className={`flex flex-col text-left p-6 rounded-2xl border transition-all hover:scale-[1.02] ${selectedService?.id === s.id ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-white/5 bg-black/40 hover:border-white/20'}`}
                >
                  <span className="font-black text-lg mb-1">{s.name}</span>
                  <span className="text-white/40 text-sm mb-4">{s.duration_min} min</span>
                  <span className="text-2xl font-black gold-gradient">R$ {(s.price_cents / 100).toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white/70">2. Escolha data e hora</h3>
              <button onClick={() => setStep(1)} className="text-xs text-[#d4af37] hover:underline">Voltar</button>
            </div>
            
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 mb-8 text-white outline-none focus:border-[#d4af37]"
            />

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {slots.map(t => (
                <button
                  key={t}
                  onClick={() => { setSelectedTime(t); setStep(3); }}
                  className={`py-3 rounded-xl font-bold border transition-all ${selectedTime === t ? 'border-[#d4af37] gold-bg text-black' : 'border-white/10 bg-black/40 hover:border-white/30 text-white/70'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && selectedService && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white/70">3. Confirmar agendamento</h3>
              <button onClick={() => setStep(2)} className="text-xs text-[#d4af37] hover:underline">Voltar</button>
            </div>

            <div className="bg-black/60 border border-white/5 p-8 rounded-2xl mb-8 space-y-4">
              <div className="flex justify-between">
                <span className="text-white/40">Serviço:</span>
                <span className="font-bold">{selectedService.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Data:</span>
                <span className="font-bold">{selectedDate.split('-').reverse().join('/')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Horário:</span>
                <span className="font-bold">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Duração aprox:</span>
                <span className="font-bold">{selectedService.duration_min} min</span>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                <span className="text-white/40">Total:</span>
                <span className="text-3xl font-black gold-gradient">R$ {(selectedService.price_cents / 100).toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleBook}
              className="w-full gold-bg text-black py-5 rounded-2xl font-black text-xl shadow-2xl shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              CONFIRMAR E AGENDAR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
