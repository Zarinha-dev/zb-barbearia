
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Appointment } from '../types';
import { db } from '../services/database';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agenda' | 'stats'>('agenda');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setAppointments(db.getAppointments());
  }, [selectedDate]);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const handleUpdateStatus = (id: number, status: Appointment['status']) => {
    db.updateAppointmentStatus(id, status);
    setAppointments(db.getAppointments());
  };

  // Cálculos de Métricas Reais
  const dayApps = appointments.filter(a => a.date === selectedDate);
  const dayRevenue = dayApps
    .filter(a => a.status === 'done' || a.status === 'booked')
    .reduce((acc, curr) => acc + curr.price_cents, 0);

  const totalRevenue = appointments
    .filter(a => a.status === 'done')
    .reduce((acc, curr) => acc + curr.price_cents, 0);

  const revenueData = [
    { day: 'Seg', total: 0 }, { day: 'Ter', total: 0 }, { day: 'Qua', total: 0 },
    { day: 'Qui', total: 0 }, { day: 'Sex', total: 0 }, { day: 'Sáb', total: 0 },
  ];

  // Preencher gráfico com dados reais (simplificado para demonstração semanal)
  appointments.forEach(app => {
    if (app.status === 'done') {
      const date = new Date(app.date);
      const dayIndex = date.getDay() - 1; // 0=Segunda se considerarmos Seg-Sáb
      if (dayIndex >= 0 && dayIndex < 6) {
        revenueData[dayIndex].total += app.price_cents / 100;
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black gold-gradient tracking-tight mb-2 uppercase italic">Admin Master</h1>
          <p className="text-white/30 text-sm font-bold tracking-widest uppercase">Controle Operacional • ZB Premium</p>
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
              <span className="text-white/20 text-[10px] font-black uppercase mb-1 block">Data</span>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-white font-black text-lg outline-none cursor-pointer w-full"
              />
            </div>
            <div className="bg-[#111] border border-white/5 p-6 rounded-2xl">
              <span className="text-white/20 text-[10px] font-black uppercase mb-1 block">Faturamento Dia</span>
              <p className="text-[#d4af37] font-black text-xl">R$ {(dayRevenue / 100).toFixed(2)}</p>
            </div>
            <div className="bg-[#111] border border-white/5 p-6 rounded-2xl">
              <span className="text-white/20 text-[10px] font-black uppercase mb-1 block">Ocupação</span>
              <p className="text-white font-black text-xl">{Math.round((dayApps.length / timeSlots.length) * 100)}%</p>
            </div>
          </div>

          <div className="space-y-3">
            {timeSlots.map(time => {
              const app = dayApps.find(a => a.time === time);
              
              return (
                <div 
                  key={time} 
                  className={`border rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 transition-all ${
                    app ? 'bg-[#111] border-[#d4af37]/10' : 'bg-black/20 border-white/5 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <span className={`text-2xl font-black min-w-[80px] ${app ? 'gold-gradient' : 'text-white/10'}`}>
                      {time}
                    </span>
                    
                    {app ? (
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="text-xl font-black text-white/90 uppercase italic">{app.client_name}</h3>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${
                            app.status === 'done' ? 'bg-green-500/20 text-green-400' : 
                            app.status === 'canceled' ? 'bg-red-500/20 text-red-400' : 
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-white/30 font-bold uppercase tracking-widest">{app.service} • R$ {(app.price_cents / 100).toFixed(2)}</p>
                      </div>
                    ) : (
                      <span className="text-white/5 font-bold text-xs italic uppercase tracking-widest">Horário Livre</span>
                    )}
                  </div>

                  {app && app.status === 'booked' && (
                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                      <button 
                        onClick={() => handleUpdateStatus(app.id, 'done')}
                        className="px-5 py-2.5 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white text-[10px] font-black transition-all border border-green-500/20 uppercase"
                      >
                        Concluir
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(app.id, 'canceled')}
                        className="px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-[10px] font-black transition-all border border-red-500/20 uppercase"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500 space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#111] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group">
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Faturamento Realizado</p>
              <h4 className="text-5xl font-black gold-gradient">R$ {(totalRevenue / 100).toFixed(1)}</h4>
            </div>
            <div className="bg-[#111] border border-white/5 p-10 rounded-[2.5rem]">
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Total Clientes</p>
              <h4 className="text-5xl font-black text-white/90">{db.getUsers().length - 1}</h4>
            </div>
            <div className="bg-[#111] border border-white/5 p-10 rounded-[2.5rem]">
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Agendamentos</p>
              <h4 className="text-5xl font-black text-blue-400">{appointments.length}</h4>
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 p-10 rounded-[2.5rem] h-[450px]">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-10">Desempenho Semanal (R$)</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={revenueData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}}
                  contentStyle={{backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '15px'}}
                />
                <Bar dataKey="total" radius={[12, 12, 12, 12]} barSize={40}>
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.total > 0 ? '#d4af37' : '#222'} />
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
