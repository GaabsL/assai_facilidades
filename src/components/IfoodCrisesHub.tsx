import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, AlertCircle, Sparkles, ShieldAlert, CheckCircle2, TrendingUp, Info, Maximize2, X } from 'lucide-react';
import { sacRecommendations } from '../data';

const commentsImages = [
  {
    id: 'img-1',
    url: 'https://i.imgur.com/LLY7KF2.png',
    alt: 'Evidência de Social Listening - Reclamação de Entrega',
    tag: 'Fricção 01 • Pedido Incompleto',
    desc: 'Manifestação sobre pedido chegar incompleto.'
  },
  {
    id: 'img-2',
    url: 'https://i.imgur.com/97MnOrs.png',
    alt: 'Evidência de Social Listening - Experiência de Compra',
    tag: 'Fricção 02 • Pedido Incompleto',
    desc: 'Usuário reportando manifestação sobre pedido chegar incompleto.'
  },
  {
    id: 'img-3',
    url: 'https://i.imgur.com/i7pweEs.png',
    alt: 'Evidência de Social Listening - Promoção & Cupons',
    tag: 'Fricção 03 • Pedido Incompleto',
    desc: 'Usuário reportando falta de produtos no pedido.'
  },
  {
    id: 'img-4',
    url: 'https://i.imgur.com/YxnuNWw.png',
    alt: 'Evidência de Social Listening - Falta de Itens',
    tag: 'Fricção 04 • Sem Reembolso',
    desc: 'Usuário reportando não receber o reembolso do aplicativo.'
  }
];

export default function IfoodCrisesHub() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6" id="ifood-crises-hub">
      {/* 1. Raio-X Parceria iFood (Performance & Media) */}
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-lg p-6 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.1)] flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 bg-red-50 text-red-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-assai-blue">Raio-X iFood</h3>
              <p className="text-[11px] text-slate-400">Análise de mídia e comportamento de tráfego</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Paid media item */}
            <div className="border border-slate-100 bg-slate-50/50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold bg-assai-orange/10 text-assai-orange px-2 py-0.5 rounded">
                  Mídia Paga (Impulsionado)
                </span>
                <span className="text-[10px] font-semibold text-slate-500">2 posts</span>
              </div>
              <p className="text-xl font-extrabold text-slate-800">357.553</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Visualizações / Alcance Total</p>
              <div className="mt-2.5 text-xs text-slate-600 leading-relaxed border-t border-slate-200/50 pt-2 bg-white/50 p-2 rounded">
                Média de <strong>178.776 alcance por post</strong>, impulsionado pelo formato <span className="text-assai-orange font-semibold">"Funcionário de Loja"</span> em Reels de 27/02.
              </div>
            </div>

            {/* Organic media item */}
            <div className="border border-slate-100 bg-slate-50/50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold bg-assai-blue/10 text-assai-blue px-2 py-0.5 rounded">
                  Alcance Orgânico
                </span>
                <span className="text-[10px] font-semibold text-slate-500">51 posts</span>
              </div>
              <p className="text-xl font-extrabold text-slate-800">1.433.404</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Visualizações coletadas organicamente</p>
              <div className="mt-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 rounded-lg p-2.5 text-xs">
                <span className="font-bold flex items-center gap-1 text-emerald-700">
                  <Sparkles className="w-3.5 h-3.5" /> Pico: 02/04 nos Stories
                </span>
                <p className="mt-1 leading-relaxed">
                  Gerou <strong>138k de alcance</strong> e <strong>8.9k de ações</strong> em um único dia.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 text-xs text-slate-500 border-t border-slate-100 pt-4 flex items-start gap-2">
          <Info className="w-4 h-4 text-assai-blue shrink-0 mt-0.5" />
          <p>
            O formato de Reels <strong>"Funcionários de Loja"</strong> (humor corporativo saudável) provou ser o maior vetor de engajamento limpo e orgânico do pilar.
          </p>
        </div>
      </motion.div>

      {/* 2. Hub de Análise de Atrito / Comentários Negativos (Crises) */}
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-lg p-6 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.1)] flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 bg-red-50 text-red-600 rounded-lg">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-assai-blue">Hub de Atrito / Comentários</h3>
              <p className="text-[11px] text-slate-400">Social Listening e detecção de anomalias</p>
            </div>
          </div>

          <div className="space-y-3">
            {commentsImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img.url)}
                className="group border border-slate-100 hover:border-red-200 hover:shadow-sm rounded-lg overflow-hidden bg-slate-50 hover:bg-red-50/5 cursor-zoom-in transition-all duration-300"
              >
                <div className="relative aspect-[3.5/1] w-full overflow-hidden bg-white border-b border-slate-100 flex items-center justify-center p-1">
                  <img
                    src={img.url}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <span className="p-1 px-2 bg-slate-900/80 backdrop-blur-sm text-white rounded text-[9px] font-bold flex items-center gap-1 shadow">
                      <Maximize2 className="w-2.5 h-2.5" />
                      Ampliar Evidência
                    </span>
                  </div>
                </div>
                <div className="p-2 px-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-red-600 uppercase tracking-wider">
                      {img.tag}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-400">Listening Ativo</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Insights Highlight */}
        <div className="mt-4 pt-3 border-t border-slate-100 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/30">
          <p className="text-xs text-slate-600">
            💡 <strong> </strong> 
          </p>
        </div>
      </motion.div>

      {/* 3. Recomendações de SAC (Ações Limpas) */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-lg p-6 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.1)] flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-5">
            <span className="p-2 bg-blue-50 text-assai-blue rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-assai-blue">Diretrizes de SAC e Moderação</h3>
              <p className="text-[11px] text-slate-400">Recomendações estratégicas contra atritos</p>
            </div>
          </div>

          <div className="space-y-4">
            {sacRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="flex gap-3 p-3 bg-slate-50 hover:bg-slate-100/80 rounded-lg transition-all border border-slate-100"
              >
                <div className="p-1 bg-assai-blue/10 text-assai-blue rounded shrink-0 h-6 w-6 flex items-center justify-center">
                  <span className="text-[11px] font-bold">{rec.id.replace('rec-', '')}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{rec.acao}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                    {rec.contexto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-slate-900 text-slate-200 p-4 rounded-lg text-xs relative overflow-hidden">
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="font-bold text-assai-orange uppercase tracking-wider text-[9px]"></p>
              <h5 className="text-xs font-semibold mt-1"></h5>
            </div>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-[9px] font-bold">
              Ativo
            </span>
          </div>
          {/* Subtle background glow */}
          <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-assai-orange/10 rounded-full blur-2xl" />
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-xl p-2 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-all shadow-md active:scale-90 cursor-pointer"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center bg-slate-50 rounded-lg p-4 overflow-auto max-h-[80vh]">
                <img
                  src={selectedImage}
                  alt="Evidência ampliada"
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[70vh] object-contain rounded shadow-sm"
                />
              </div>
              <div className="p-3 px-4 bg-white border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-assai-blue uppercase tracking-wider">
                  Social Listening • Captura de Tela Real
                </span>
                <span className="text-[10px] text-slate-400">Clique fora ou no botão para fechar</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
