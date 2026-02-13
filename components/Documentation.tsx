
import React from 'react';

const Documentation: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Configuração do Ambiente',
      description: 'Inicie o projeto utilizando a estrutura base ZB para garantir performance e escalabilidade no agendamento.',
      type: 'Terminal',
      code: 'npm create zb-app@latest\ncd premium-barber'
    },
    {
      number: '02',
      title: 'Instalação do Design System',
      description: 'Instale as dependências visuais. Utilizamos Tailwind CSS para um visual moderno e responsivo.',
      type: 'Terminal',
      code: 'npm install tailwindcss @tailwindcss/vite'
    },
    {
      number: '03',
      title: 'Configuração do Motor (Vite)',
      description: 'Configure o plugin para processar os componentes React e os estilos premium.',
      type: 'vite.config.ts',
      code: `import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})`
    },
    {
      number: '04',
      title: 'Importação de Estilos Globais',
      description: 'Adicione os gradientes dourados e as animações customizadas no arquivo CSS principal.',
      type: 'css',
      code: '@import "tailwindcss";\n@import "./style.css";'
    },
    {
      number: '05',
      title: 'Inicialização do Sistema',
      description: 'Inicie o servidor de desenvolvimento para rodar o dashboard e o sistema de reservas.',
      type: 'Terminal',
      code: 'npm run dev'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-24 px-6 animate-fade-in">
      <div className="mb-20">
        <h2 className="text-xs font-black text-[#d4af37] tracking-[0.5em] uppercase mb-4">Desenvolvedor</h2>
        <h3 className="text-6xl font-black tracking-tighter uppercase italic mb-6">Guia de Instalação.</h3>
        <p className="text-white/40 text-lg max-w-2xl font-medium">
          Aprenda como replicar a estrutura técnica por trás da ZB Barbearia Premium. 
          Seguimos os padrões mais modernos da indústria.
        </p>
      </div>

      <div className="space-y-16">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Esquerda: Descrição */}
            <div className="lg:w-1/3 flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center font-black text-white/20">
                [{step.number}]
              </div>
              <div>
                <h4 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{step.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed font-medium">{step.description}</p>
              </div>
            </div>

            {/* Direita: Código Estilo Tailwind Docs */}
            <div className="lg:w-2/3 w-full">
              <div className="bg-[#0b0e14] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center px-6 py-3 border-b border-white/5 bg-white/2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{step.type}</span>
                  <button className="text-white/20 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                    </svg>
                  </button>
                </div>
                <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto">
                  <pre className="whitespace-pre">
                    {step.code.split('\n').map((line, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-white/10 select-none w-4">{i + 1}</span>
                        <code className="text-white/80">
                          {line.split(/(\s+|"|'|@|npm|run|import|export|default|defineConfig|plugins|tailwindcss)/).map((part, j) => {
                            if (['npm', 'run', 'import', 'export', 'default', 'defineConfig', 'plugins'].includes(part)) return <span key={j} className="text-[#f472b6]">{part}</span>;
                            if (part === 'tailwindcss') return <span key={j} className="text-[#38bdf8]">{part}</span>;
                            if (part === '"' || part === "'") return <span key={j} className="text-[#94a3b8]">{part}</span>;
                            if (part.startsWith('zb-') || part.includes('.ts')) return <span key={j} className="text-[#4ade80]">{part}</span>;
                            return <span key={j}>{part}</span>;
                          })}
                        </code>
                      </div>
                    ))}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/20 text-center">
        <h4 className="text-3xl font-black mb-4 uppercase italic">Tudo configurado?</h4>
        <p className="text-white/40 mb-8 max-w-lg mx-auto font-medium">Agora que você entende a base técnica, está pronto para gerenciar a maior barbearia de Nine.</p>
        <button className="gold-bg text-black px-12 py-4 rounded-full font-black uppercase text-sm tracking-widest shadow-2xl">Voltar ao Início</button>
      </div>
    </div>
  );
};

export default Documentation;
