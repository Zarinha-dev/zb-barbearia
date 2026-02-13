
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Appointment } from '../types.ts';

interface BlockedSlot {
  date: string;
  time: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agenda' | 'stats'>('agenda');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, time: '09:00', date: selectedDate, client_name: 'João Silva', service: 'Corte Premium', status: 'done', price_cents: 3500, user_id: 1, service_id: 1 },
    { id: 2, time: '10:20', date: selectedDate, client_name: 'Pedro Santos', service: 'Barba', status: 'booked', price_cents: 2500, user_id: 2, service_id: 2 },
    { id: 3, time: '14:40', date: selectedDate, client_name: 'Marcos Oliveira', service: 'Combo ZB', status: 'booked', price_cents: 5500, user_id: 3, service_id: 3 },
  ]);

  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([
    { date: selectedDate, time: '12:00' }
  ]);

  const timeSlots = [
    '09:00', '09:40', '10:20', '11:00', '11:40', 
    '12:20', '13:00', '14:00', '14:40', '15:20', 
    '16:00', '16:40', '17:20', '18:00'
  ];

  const revenueData = [
    { day: 'Seg', total: 120 },
    { day: 'Ter', total: 240 },
    { day: 'Qua', total: 180 },
    { day: 'Qui', total: 320 },
    { day: 'Sex', total: 450 },
    { day: 'Sáb', total: 580 },
  ];

  const handleCancelAppointment = (id: number) => {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      setAppointments(prev => prev.map(app => 
        app.id === id ? { ...app, status: 'canceled' } : app
      ));
    }
  };

  const handleCompleteAppointment = (id: number) => {
    setAppointments(prev => prev.map(app => 
      app.id === id ? { ...app, status: 'done' } : app
    ));
  };

  const toggleBlockSlot = (time: string) => {
    const isBlocked = blockedSlots.some(s => s.date === selectedDate && s.time === time);
    if (isBlocked) {
      setBlockedSlots(prev => prev.filter(s => !(s.date === selectedDate && s.time === time)));
    } else {
      setBlockedSlots(prev => [...prev, { date: selectedDate, time }]);
    }
  };

  const getSlotContent = (time: string) => {
    const app = appointments.find(a => a.time === time && a.date === selectedDate);
    const isBlocked = blockedSlots.some(s => s.date === selectedDate && s.time === time);

    if (app) return { type: 'appointment', data: app };
    if (isBlocked) return { type: 'blocked', data: null };
    return { type: 'available', data: null };
  };

  const dayRevenue = appointments
    .filter(a => a.date === selectedDate && a.status !== 'canceled')
    .reduce((acc, curr) => acc + curr.price_cents, 0);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black gold-gradient tracking-tight mb-2">ADMIN MASTER</h1>
          <p className="text-white/30 text-sm font-bold tracking-widest uppercase">Dashboard Operacional • ZB Premium</p>
        </div>
        
        <div className="flex bg-[#111] p-1.5 rounded-2xl border border-white/5 shadow-xl">
          <button 
            onClick={() => setActiveTab('agenda')}
            className={`px-8 py-3 rounded-xl font-black text-xs tracking-widest uppercase transition-all ${activeTab === 'agenda' ? 'gold-bg text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
          >
            Agenda
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`px-8 py-3 rounded-xl font-black text-xs tracking-widest uppercase transition-all ${activeTab === 'stats' ? 'gold-bg text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
          >
            Métricas
          </button>
        </div>
      </div>

      {activeTab === 'agenda' ? (
        <div className="animate-in fade-in duration-500">
          <div className="grid md:grid-cols-4 gap-4 mb-10">
            <div className="bg-[#111] border border-white/5 p-6 rounded-2xl">
              <span className="text-white/20 text-[10px] font-black uppercase mb-1 block">Data Selecionada</span>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-white font-black text-lg outline-none cursor-pointer w-full"
              />
            </div>
            <div className="bg-[#111] border border-white/5 p-6 rounded-2xl">
              <span className="text-white/20 text-[10px] font-black uppercase mb-1 block">Total do Dia</span>
              <p className="text-[#d4af37] font-black text-xl">R$ {(dayRevenue / 100).toFixed(2)}</p>
            </div>
            <div className="bg-[#111] border border-white/5 p-6 rounded-2xl">
              <span className="text-white/20 text-[10px] font-black uppercase mb-1 block">Ocupação</span>
              <p className="text-white font-black text-xl">{Math.round((appointments.length / timeSlots.length) * 100)}%</p>
            </div>
            <div className="bg-[#111] border border-white/5 p-6 rounded-2xl flex items-center justify-center">
              <div className="flex gap-2">
                 {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" style={{animationDelay: `${i * 200}ms`}} />)}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {timeSlots.map(time => {
              const { type, data } = getSlotContent(time);
              
              return (
                <div 
                  key={time} 
                  className={`border rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 transition-all ${
                    type === 'blocked' ? 'bg-black/40 border-white/5 opacity-40' :
                    type === 'appointment' ? 'bg-[#111] border-[#d4af37]/10' :
                    'bg-black/20 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <span className={`text-2xl font-black min-w-[80px] ${type === 'appointment' ? 'gold-gradient' : 'text-white/10'}`}>
                      {time}
                    </span>
                    
                    {type === 'appointment' && data && (
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="text-xl font-black text-white/90">{data.client_name}</h3>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${
                            data.status === 'done' ? 'bg-green-500/20 text-green-400' : 
                            data.status === 'canceled' ? 'bg-red-500/20 text-red-400' : 
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {data.status === 'booked' ? 'Confirmado' : data.status}
                          </span>
                        </div>
                        <p className="text-xs text-white/30 font-bold uppercase tracking-widest">{data.service} • R$ {(data.price_cents / 100).toFixed(2)}</p>
                      </div>
                    )}

                    {type === 'blocked' && (
                      <span className="text-white/10 font-black uppercase tracking-[0.3em] text-[10px]">Horário Bloqueado</span>
                    )}

                    {type === 'available' && (
                      <span className="text-white/5 font-bold text-xs italic">Nenhum agendamento</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    {type === 'appointment' && data && data.status === 'booked' && (
                      <>
                        <button 
                          onClick={() => handleCompleteAppointment(data.id)}
                          className="px-5 py-2.5 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white text-[10px] font-black transition-all border border-green-500/20"
                        >
                          CONCLUIR
                        </button>
                        <button 
                          onClick={() => handleCancelAppointment(data.id)}
                          className="px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-[10px] font-black transition-all border border-red-500/20"
                        >
                          CANCELAR
                        </button>
                      </>
                    )}

                    {type !== 'appointment' && (
                      <button 
                        onClick={() => toggleBlockSlot(time)}
                        className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all border ${
                          type === 'blocked' 
                          ? 'bg-white/10 text-white border-white/10 hover:bg-white/20' 
                          : 'bg-white/5 text-white/20 border-white/5 hover:border-[#d4af37] hover:text-[#d4af37]'
                        }`}
                      >
                        {type === 'blocked' ? 'REABRIR' : 'BLOQUEAR'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500 space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#111] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/></svg>
              </div>
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Faturamento Mensal</p>
              <h4 className="text-5xl font-black gold-gradient">R$ 14.2k</h4>
              <p className="text-green-400 text-[10px] font-black mt-6 flex items-center gap-1 uppercase tracking-widest">
                ↑ 12% crescimento
              </p>
            </div>
            <div className="bg-[#111] border border-white/5 p-10 rounded-[2.5rem]">
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Cortes Realizados</p>
              <h4 className="text-5xl font-black text-white/90">342</h4>
              <p className="text-white/20 text-[10px] font-black mt-6 uppercase tracking-widest">Ticket médio: R$ 41,50</p>
            </div>
            <div className="bg-[#111] border border-white/5 p-10 rounded-[2.5rem]">
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Retenção</p>
              <h4 className="text-5xl font-black text-blue-400">78%</h4>
              <p className="text-white/20 text-[10px] font-black mt-6 uppercase tracking-widest">Clientes recorrentes</p>
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 p-10 rounded-[2.5rem] h-[450px]">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-10">Volume por Dia da Semana</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={revenueData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}}
                  contentStyle={{backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '15px'}}
                />
                <Bar dataKey="total" radius={[12, 12, 12, 12]} barSize={40}>
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === revenueData.length - 1 ? '#d4af37' : '#222'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
