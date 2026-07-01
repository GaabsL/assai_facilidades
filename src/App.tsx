import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, RefreshCw, Calendar, Sparkles, X, Share2, HelpCircle } from 'lucide-react';
import KPICards from './components/KPICards';
import ChartsSection from './components/ChartsSection';
import PilaresTable from './components/PilaresTable';
import IfoodCrisesHub from './components/IfoodCrisesHub';

export default function App() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(true);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast('Atualizando dados da API e consolidando relatórios...');
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Dados de performance consolidados e atualizados com sucesso!');
    }, 1500);
  };

  const handleExport = () => {
    showToast('Preparando otimização de impressão do relatório Facilidades 2026...');
    setTimeout(() => {
      window.print();
    }, 800);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Dashboard Performance Facilidades Assaí 2026',
        text: 'Confira os resultados consolidados de performance da categoria Facilidades (Jan-Jun 2026).',
        url: window.location.href,
      }).catch(() => {
        showToast('Link do painel copiado para a área de transferência!');
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link de compartilhamento copiado para a área de transferência!');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] selection:bg-assai-orange/20 antialiased font-sans">
      
      {/* 1. Header Area */}
      <header className="sticky top-0 z-50 bg-[#004791] border-b border-[#003d7c] text-white shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Brand/Title */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 self-start md:self-auto shadow-sm">
              <img 
                src="https://i.imgur.com/ihchsJt.png" 
                alt="Logo Assaí" 
                referrerPolicy="no-referrer" 
                className="h-8 w-auto object-contain"
              />
              <div className="h-5 w-px bg-white/20" />
              <img 
                src="https://i.imgur.com/lAyMWKF.png" 
                alt="Logo Agência" 
                referrerPolicy="no-referrer" 
                className="h-7 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-orange-300 font-bold">Assaí Atacadista</span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#002d5e] border border-[#002144] text-slate-300 rounded uppercase">Facilidades</span>
              </div>
              <h1 className="text-lg sm:text-xl font-display font-bold tracking-tight mt-0.5">
                Dashboard de Performance - Facilidades Assaí
              </h1>
            </div>
          </div>

          {/* Interactive actions & date badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#00366f] border border-[#002a57] px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-assai-orange" />
              <span>Jan - Jun de 2026</span>
            </div>

            <button
              onClick={handleShare}
              className="p-2 bg-[#00366f] hover:bg-[#002d5e] active:scale-95 text-slate-200 hover:text-white rounded-lg border border-[#002144] transition-all shadow-sm flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer"
              title="Compartilhar Link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden md:inline">Compartilhar</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intro Analytical Alert / Panel */}
        <AnimatePresence>
          {showInfoPanel && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-slate-100 text-[#1e293b] p-5 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] border-l-4 border-assai-blue relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden"
            >
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-2 text-assai-orange font-bold text-xs uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Sumário Executivo</span>
                </div>
                <h2 className="text-md font-bold text-assai-blue tracking-tight">
                  Performance da Categoria Facilidades (Jan-Jun 2026)
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Este relatório apresenta o diagnóstico consolidado da categoria <strong>Facilidades</strong> do Assaí Atacadista, contemplando o desempenho estratégico dos pilares <strong>Aplicativo Assaí</strong>, <strong>Cartão Passaí</strong>, <strong>iFood</strong>, e <strong>Rappi</strong>. Explore os gráficos interativos, avalie as anomalias detectadas no Hub de Atrito e implemente as diretrizes recomendadas de SAC para mitigar riscos comunitários.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center relative z-10">
                <button
                  onClick={() => setShowInfoPanel(false)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded-lg transition-all flex items-center gap-1 cursor-pointer border border-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Ocultar Painel</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Print Header */}
        <div className="hidden print:block text-center border-b-2 border-slate-200 pb-4 mb-6">
          <h1 className="text-2xl font-black text-assai-blue">ASSAÍ ATACADISTA - CATEGORIA FACILIDADES</h1>
          <p className="text-sm text-slate-500 mt-1">Relatório Consolidado de Performance Digital • Período: Janeiro a Junho de 2026</p>
        </div>

        {/* 3. KPI Grid */}
        <section id="kpi-cards-section">
          <KPICards />
        </section>

        {/* 4. Charts Visualization Section */}
        <section id="charts-visual-section" className="space-y-4">
          <div className="flex items-center gap-2 print:hidden">
            <h2 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Análise Visual de Dados</h2>
            <div className="h-px bg-slate-200 grow" />
          </div>
          <ChartsSection />
        </section>

        {/* 5. Pillars Comparative Table */}
        <section id="pillars-table-section" className="space-y-4">
          <div className="flex items-center gap-2 print:hidden">
            <h2 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Visão Detalhada de Resultados</h2>
            <div className="h-px bg-slate-200 grow" />
          </div>
          <PilaresTable />
        </section>

        {/* 6. iFood Partner Breakdown & Crisis alerts */}
        <section id="ifood-crisis-hub-section" className="space-y-4">
          <div className="flex items-center gap-2 print:hidden">
            <h2 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Raio-X de Parceria & Gerenciamento de Crises</h2>
            <div className="h-px bg-slate-200 grow" />
          </div>
          <IfoodCrisesHub />
        </section>

      </main>

      {/* 7. Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-8 mt-16 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Dashboard ativo • Dados de 2026 consolidados e auditados</span>
          </div>
          <p className="text-center md:text-right">
            © 2026 Assaí Atacadista S.A. • Inteligência de Performance & Social Listening.
          </p>
        </div>
      </footer>

      {/* Floating Interactive Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-950 text-white rounded-lg shadow-2xl p-4 border border-slate-800 flex items-start gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-assai-orange mt-1.5 shrink-0 animate-ping" />
            <div className="grow">
              <p className="text-xs font-semibold text-slate-300">Mensagem do Sistema</p>
              <p className="text-xs font-medium text-slate-100 mt-1">{toastMessage}</p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-500 hover:text-slate-300 transition-colors p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
