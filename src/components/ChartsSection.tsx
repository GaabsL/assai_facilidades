import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { motion } from 'motion/react';
import { ArrowUpRight, Award, Flame, HelpCircle } from 'lucide-react';
import { pilaresData, promoData } from '../data';

Chart.register(...registerables);

export default function ChartsSection() {
  const chartCanvas1 = useRef<HTMLCanvasElement | null>(null);
  const chartCanvas2 = useRef<HTMLCanvasElement | null>(null);
  const chartInstance1 = useRef<Chart | null>(null);
  const chartInstance2 = useRef<Chart | null>(null);

  const [activeTab, setActiveTab] = useState<'posts' | 'alcance' | 'interacoes'>('alcance');

  useEffect(() => {
    // ---- CHART 1: COMPARATIVO POR PILAR (Dynamic tab based on state) ----
    if (chartCanvas1.current) {
      // Destroy previous instance
      if (chartInstance1.current) {
        chartInstance1.current.destroy();
      }

      const filteredPilares = pilaresData.filter(d => d.pilar !== 'Geral / Outros');
      const labels = filteredPilares.map(d => d.pilar.replace('Aplicativo Assaí ', ''));
      let dataValues: number[] = [];
      let labelText = '';
      let colorBg = '';
      let colorBorder = '';

      if (activeTab === 'posts') {
        dataValues = filteredPilares.map(d => d.posts);
        labelText = 'Quantidade de Publicações (Posts)';
        colorBg = 'rgba(0, 71, 145, 0.25)'; // Corporate Assai Blue
        colorBorder = '#004791';
      } else if (activeTab === 'alcance') {
        dataValues = filteredPilares.map(d => d.alcance);
        labelText = 'Alcance / Visualizações Totais';
        colorBg = 'rgba(255, 130, 0, 0.25)'; // Corporate Assai Orange
        colorBorder = '#FF8200';
      } else {
        dataValues = filteredPilares.map(d => d.interacoes);
        labelText = 'Interações Totais';
        colorBg = 'rgba(16, 185, 129, 0.25)'; // Emerald
        colorBorder = '#10B981';
      }

      chartInstance1.current = new Chart(chartCanvas1.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: labelText,
              data: dataValues,
              backgroundColor: colorBg,
              borderColor: colorBorder,
              borderWidth: 2,
              borderRadius: 8,
              barPercentage: 0.55,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                font: {
                  family: 'Inter',
                  size: 11,
                  weight: 'bold'
                },
                color: '#475569'
              }
            },
            tooltip: {
              backgroundColor: '#1E293B',
              titleFont: { family: 'Inter', size: 12, weight: 'bold' },
              bodyFont: { family: 'Inter', size: 12 },
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: function (context) {
                  let value = context.raw as number;
                  return `${context.dataset.label}: ${new Intl.NumberFormat('pt-BR').format(value)}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#64748B',
                font: {
                  family: 'Inter',
                  size: 11
                }
              }
            },
            y: {
              grid: {
                color: '#F1F5F9'
              },
              ticks: {
                color: '#64748B',
                font: {
                  family: 'Inter',
                  size: 11
                },
                callback: function (value) {
                  if (typeof value === 'number') {
                    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                    if (value >= 1000) return (value / 1000).toFixed(0) + 'k';
                  }
                  return value;
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance1.current) {
        chartInstance1.current.destroy();
      }
    };
  }, [activeTab]);

  useEffect(() => {
    // ---- CHART 2: ORGÂNICO VS IMPULSIONADO (Double Bar/Doughnut combo) ----
    if (chartCanvas2.current) {
      if (chartInstance2.current) {
        chartInstance2.current.destroy();
      }

      const org = promoData[0];
      const imp = promoData[1];

      chartInstance2.current = new Chart(chartCanvas2.current, {
        type: 'doughnut',
        data: {
          labels: ['Tráfego Orgânico', 'Mídia Impulsionada'],
          datasets: [
            {
              label: 'Alcance Total',
              data: [org.alcance, imp.alcance],
              backgroundColor: [
                'rgba(0, 71, 145, 0.85)', // Corporate Assai Blue
                'rgba(255, 130, 0, 0.85)'  // Corporate Assai Orange
              ],
              borderColor: ['#004791', '#FF8200'],
              borderWidth: 1.5,
              weight: 0.6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 16,
                font: {
                  family: 'Inter',
                  size: 11,
                  weight: 'bold'
                },
                color: '#475569'
              }
            },
            tooltip: {
              backgroundColor: '#1E293B',
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: function (context) {
                  const label = context.label || '';
                  const value = context.raw as number;
                  const pct = ((value / (org.alcance + imp.alcance)) * 100).toFixed(1);
                  return `${label}: ${new Intl.NumberFormat('pt-BR').format(value)} (${pct}%)`;
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance2.current) {
        chartInstance2.current.destroy();
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="charts-section-grid">
      {/* Chart 1: Pillars breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-2 bg-white rounded-lg p-6 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.1)] flex flex-col justify-between"
      >
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h3 className="text-sm font-bold text-assai-blue flex items-center gap-2">
                <span className="w-1 h-3.5 bg-assai-orange block rounded-full"></span>
                Comparativos Métricos por Pilar
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Alterne entre as abas para analisar Alcance, Interações ou Volume de Posts.
              </p>
            </div>

            {/* Tab Controls */}
            <div className="flex p-1 bg-slate-100 rounded-lg self-start sm:self-center">
              <button
                onClick={() => setActiveTab('alcance')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'alcance'
                    ? 'bg-white text-assai-orange shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Alcance
              </button>
              <button
                onClick={() => setActiveTab('interacoes')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'interacoes'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Interações
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'posts'
                    ? 'bg-white text-assai-blue shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Posts
              </button>
            </div>
          </div>

          {/* Chart Canvas Wrap */}
          <div className="relative h-72 w-full">
            <canvas ref={chartCanvas1} />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-3 text-xs text-slate-500 bg-slate-50/50 p-3 rounded-lg">
          <HelpCircle className="w-4 h-4 text-assai-blue shrink-0" />
          <span>
            <strong>Observação técnica:</strong> O pilar <strong>Cartão Passaí</strong> lidera em alcance absoluto, enquanto o <strong>App Assaí</strong> apresenta excelente eficiência em volume de interações totais.
          </span>
        </div>
      </motion.div>

      {/* Chart 2: Organic vs Sponsored & Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-lg p-6 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.1)] flex flex-col justify-between"
      >
        <div>
          <h3 className="text-sm font-bold text-assai-blue flex items-center gap-2 mb-1">
            <span className="w-1 h-3.5 bg-assai-orange block rounded-full"></span>
            Divisão de Alcance
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Proporção de Alcance Orgânico vs. Impulsionado.
          </p>

          <div className="relative h-48 w-full mb-4">
            <canvas ref={chartCanvas2} />
          </div>

          {/* Stat Comparison */}
          <div className="grid grid-cols-2 gap-4 mt-4 border-t border-slate-100 pt-4">
            <div className="bg-sky-50/40 p-3 rounded-lg border border-sky-100/30">
              <span className="text-[10px] uppercase font-bold tracking-wider text-sky-600 block">Orgânico</span>
              <p className="text-lg font-bold text-slate-800 mt-1">3,62%</p>
              <span className="text-[10px] text-slate-400">Taxa de Engajamento</span>
            </div>
            <div className="bg-orange-50/40 p-3 rounded-lg border border-orange-100/30">
              <span className="text-[10px] uppercase font-bold tracking-wider text-assai-orange block">Impulsionado</span>
              <p className="text-lg font-bold text-slate-800 mt-1">1,87%</p>
              <span className="text-[10px] text-slate-400">Taxa de Engajamento</span>
            </div>
          </div>
        </div>

        {/* Insight highlighted text */}
        <div className="mt-5 bg-gradient-to-br from-assai-blue to-[#002d5e] text-white rounded-lg p-4 relative overflow-hidden shadow-sm">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 bg-white/10 text-assai-orange rounded shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-assai-orange uppercase tracking-wider">Raio-X de Impulsionamento</h4>
              <p className="text-xs text-slate-200 leading-relaxed mt-1">
                O impulsionamento expande o horizonte de descoberta da marca (<span className="font-semibold text-assai-orange">Alcance Médio +116%</span>), mas o tráfego orgânico entrega o dobro da Taxa de Engajamento (<span className="font-semibold text-emerald-400">3,62% vs 1,87%</span>), tracionado pela retenção dos Stories.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
