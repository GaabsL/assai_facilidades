import { motion } from 'motion/react';
import { FileText, Eye, Zap, Heart } from 'lucide-react';
import { KPIs } from '../data';

export default function KPICards() {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  const cards = [
    {
      id: 'kpi-posts',
      title: 'Total de Publicações',
      value: formatNumber(KPIs.totalPosts),
      subtitle: 'Posts compartilhados',
      icon: FileText,
      accentBorder: 'border-l-4 border-assai-blue',
      textColor: 'text-assai-blue',
    },
    {
      id: 'kpi-alcance',
      title: 'Alcance / Visualizações',
      value: formatNumber(KPIs.totalAlcance),
      subtitle: 'Visualizações totais',
      icon: Eye,
      accentBorder: 'border-l-4 border-assai-orange',
      textColor: 'text-assai-blue',
    },
    {
      id: 'kpi-interacoes',
      title: 'Interações Totais',
      value: formatNumber(KPIs.totalInteracoes),
      subtitle: 'Engajamento absoluto',
      icon: Zap,
      accentBorder: 'border-l-4 border-success',
      textColor: 'text-assai-blue',
    },
    {
      id: 'kpi-curtidas',
      title: 'Total de Curtidas',
      value: formatNumber(KPIs.totalCurtidas),
      subtitle: 'Reações positivas',
      icon: Heart,
      accentBorder: 'border-l-4 border-warning',
      textColor: 'text-assai-blue',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <motion.div
            key={card.id}
            id={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`relative overflow-hidden rounded-lg bg-white ${card.accentBorder} p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-md hover:scale-[1.02] transition-all duration-300 group cursor-default`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {card.title}
                </p>
                <h3 className={`text-2xl font-extrabold tracking-tight ${card.textColor} mt-2`}>
                  {card.value}
                </h3>
                <span className="text-xs text-slate-400 font-normal mt-1 block">
                  {card.subtitle}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 text-slate-400 group-hover:scale-110 group-hover:bg-slate-100 group-hover:text-assai-blue transition-all duration-300 border border-slate-100/50">
                <IconComponent className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

