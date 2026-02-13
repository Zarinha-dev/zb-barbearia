
import React, { useState, useEffect } from 'react';
import { getStyleConsultation } from '../services/geminiService';

const StyleConsultant: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Analisando perfil...');
  const [result, setResult] = useState<any>(null);

  const loadingMessages = [
    'Analisando simetria facial...',
    'Afiando a tesoura virtual...',
    'Preparando a toalha quente...',
    'Consultando tendências em Milão...',
    'Verificando densidade capilar...',
    'Quase pronto para o upgrade...'
  ];

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      let i = 0;
      interval = setInterval(() => {
        setLoadingMsg(loadingMessages[i % loadingMessages.length]);
        i++;
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    
    setIsLoading(true);
    const data = await getStyleConsultation(prompt);
    setResult(data);
    setIsLoading(false);
  };

  return (
    <div className="py-20 px-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <span className="text-[#d4af37] font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">Intelligence & Style</span>
        <h2 className="text-5xl md:text-6xl font-black gold-gradient mb-6 tracking-tighter">VISAGISMO IA</h2>
        <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
          Nossa inteligência artificial foi treinada com os melhores conceitos de estética masculina para sugerir o visual que mais valoriza seus traços.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        
        {/* Lado do Input */}
        <div className="lg:col-span-2">
          <div className="bg-[#111] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl sticky top-24">
            <h3 className="text-white font-black mb-6 uppercase text-sm tracking-widest">Descreva seu Estilo</h3>
            <form onSubmit={handleConsult} className="space-y-6">
              <div className="relative">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Tenho o rosto mais largo e queria um corte que alongasse. Tenho pouco tempo para arrumar de manhã."
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 text-white placeholder-white/10 focus:border-[#d4af37] transition-all h-48 resize-none outline-none text-sm leading-relaxed"
                />
                <div className="absolute bottom-4 right-4 text-[10px] text-white/20 font-bold">GEMINI 3 PRO</div>
              </div>
              <button 
                disabled={isLoading || !prompt}
                className={`w-full gold-bg text-black py-5 rounded-2xl font-black text-lg shadow-xl shadow-gold-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm uppercase tracking-widest">{loadingMsg}</span>
                  </>
                ) : (
                  'GERAR CONSULTORIA'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Lado do Resultado */}
        <div className="lg:col-span-3">
          {!result && !isLoading && (
            <div className="h-full min-h-[400px] border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h4 className="text-white/40 font-bold mb-2">Aguardando sua descrição</h4>
              <p className="text-white/20 text-sm max-w-xs">Use o campo ao lado para nos contar como você quer seu novo visual.</p>
            </div>
          )}

          {isLoading && (
            <div className="space-y-6 animate-pulse">
              {[1, 2].map(i => (
                <div key={i} className="bg-[#111] border border-white/5 p-8 rounded-3xl h-48" />
              ))}
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in slide-in-from-right duration-700">
              <div className="grid gap-6">
                {result.suggestions?.map((item: any, i: number) => (
                  <div key={i} className="bg-[#111] border border-white/10 p-8 rounded-[2.5rem] hover:border-[#d4af37]/40 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-black gold-gradient">{item.name}</h3>
                      <span className="text-[10px] font-black text-[#d4af37] border border-[#d4af37]/30 px-3 py-1 rounded-full">RECOMENDADO</span>
                    </div>
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">{item.description}</p>
                    <div className="bg-black/40 p-5 rounded-2xl border-l-4 border-[#d4af37] text-sm">
                      <p className="text-[#d4af37] font-black text-[10px] uppercase tracking-widest mb-2">Por que funciona:</p>
                      <p className="text-white/50 italic leading-relaxed">"{item.reason}"</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/20 p-8 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.45l7.7 13.55H4.3L12 5.45zM11 11h2v4h-2v-4zm0 6h2v2h-2v-2z"/></svg>
                </div>
                <h4 className="font-black text-white mb-3 uppercase text-xs tracking-widest">Dica do Especialista</h4>
                <p className="text-white/60 italic text-sm leading-relaxed">"{result.finalTip}"</p>
              </div>

              <button 
                onClick={onBook}
                className="w-full py-6 rounded-2xl bg-white text-black font-black text-lg hover:bg-[#d4af37] hover:text-black transition-all shadow-xl shadow-white/5 active:scale-95"
              >
                AGENDAR ESSE ESTILO AGORA
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StyleConsultant;
