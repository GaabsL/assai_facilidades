import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowUpDown, Search, Percent, Filter, RotateCcw } from 'lucide-react';
import { pilaresData } from '../data';
import { PilarData } from '../types';

export default function PilaresTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof PilarData | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  const handleSort = (field: keyof PilarData) => {
    if (sortBy === field) {
      // Toggle order
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSortBy(null);
    setSortOrder('desc');
  };

  const filteredAndSortedData = useMemo(() => {
    let result = pilaresData.filter(item => item.pilar !== 'Geral / Outros');

    if (searchTerm.trim() !== '') {
      result = result.filter(item =>
        item.pilar.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy) {
      result.sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortOrder === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        } else if (typeof valA === 'number' && typeof valB === 'number') {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        }
        return 0;
      });
    }

    return result;
  }, [searchTerm, sortBy, sortOrder]);

  // Totals calculations
  const totals = useMemo(() => {
    const tableData = pilaresData.filter(item => item.pilar !== 'Geral / Outros');
    const totalPosts = tableData.reduce((acc, curr) => acc + curr.posts, 0);
    const totalAlcance = tableData.reduce((acc, curr) => acc + curr.alcance, 0);
    const totalInteracoes = tableData.reduce((acc, curr) => acc + curr.interacoes, 0);
    const totalCurtidas = tableData.reduce((acc, curr) => acc + curr.curtidas, 0);
    const totalComentarios = tableData.reduce((acc, curr) => acc + curr.comentarios, 0);
    // Weighted engagement rate
    const averageEngagement =
      tableData.reduce((acc, curr) => acc + curr.taxaEngajamento * curr.posts, 0) / totalPosts;

    return {
      posts: totalPosts,
      alcance: totalAlcance,
      interacoes: totalInteracoes,
      curtidas: totalCurtidas,
      comentarios: totalComentarios,
      taxaEngajamento: averageEngagement,
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden"
      id="pilares-table-container"
    >
      {/* Header and Filter Bar */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-assai-blue flex items-center gap-2">
            <span className="w-1 h-3.5 bg-assai-orange block rounded-full"></span>
            Performance por Pilar Estratégico
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Resultados consolidados de Janeiro a Junho de 2026 ordenados e filtráveis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Filtrar pilar..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 w-48 sm:w-60 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-assai-orange/20 focus:border-assai-orange text-slate-700 placeholder-slate-400 shadow-sm"
            />
          </div>

          {/* Reset button if filter is active */}
          {(searchTerm || sortBy) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm transition-all shadow-sm"
              title="Limpar Filtros"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Limpar</span>
            </button>
          )}
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider">
              <th className="py-3 px-6 select-none cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('pilar')}>
                <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                  Pilar
                  <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-5 text-right select-none cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('posts')}>
                <div className="flex items-center justify-end gap-1.5 font-bold">
                  Posts
                  <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-5 text-right select-none cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('alcance')}>
                <div className="flex items-center justify-end gap-1.5 font-bold">
                  Alcance
                  <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-5 text-right select-none cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('interacoes')}>
                <div className="flex items-center justify-end gap-1.5 font-bold">
                  Interações
                  <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-5 text-right select-none cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('curtidas')}>
                <div className="flex items-center justify-end gap-1.5 font-bold">
                  Curtidas
                  <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-5 text-right select-none cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('comentarios')}>
                <div className="flex items-center justify-end gap-1.5 font-bold">
                  Comentários
                  <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-6 text-right select-none cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('taxaEngajamento')}>
                <div className="flex items-center justify-end gap-1.5 text-assai-orange font-bold">
                  Taxa Engaj.
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredAndSortedData.length > 0 ? (
              filteredAndSortedData.map((row) => {
                const isHighlight = row.pilar.includes('iFood') || row.pilar.includes('Passaí');
                const isApp = row.pilar.includes('App') || row.taxaEngajamento > 3.5;
                return (
                  <tr
                    key={row.pilar}
                    className={`hover:bg-slate-50/50 transition-colors ${
                      isHighlight ? 'bg-orange-50/10' : ''
                    }`}
                  >
                    <td className="py-3 px-6 font-semibold text-slate-800">
                      {row.pilar}
                    </td>
                    <td className="py-3 px-5 text-right text-slate-600 font-mono">
                      {row.posts}
                    </td>
                    <td className="py-3 px-5 text-right font-medium text-slate-800 font-mono">
                      {formatNumber(row.alcance)}
                    </td>
                    <td className="py-3 px-5 text-right text-slate-600 font-mono">
                      {formatNumber(row.interacoes)}
                    </td>
                    <td className="py-3 px-5 text-right text-slate-600 font-mono">
                      {formatNumber(row.curtidas)}
                    </td>
                    <td className="py-3 px-5 text-right text-slate-600 font-mono">
                      {row.comentarios}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isApp 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-sky-100 text-sky-800'
                      }`}>
                        {row.taxaEngajamento.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 text-sm">
                  Nenhum pilar encontrado correspondente ao filtro.
                </td>
              </tr>
            )}

            {/* Totals Row */}
            <tr className="bg-slate-100/60 font-bold text-slate-800 border-t-2 border-slate-200">
              <td className="py-3.5 px-6">Total / Média Geral</td>
              <td className="py-3.5 px-5 text-right font-mono">{totals.posts}</td>
              <td className="py-3.5 px-5 text-right font-mono">{formatNumber(totals.alcance)}</td>
              <td className="py-3.5 px-5 text-right font-mono">{formatNumber(totals.interacoes)}</td>
              <td className="py-3.5 px-5 text-right font-mono">{formatNumber(totals.curtidas)}</td>
              <td className="py-3.5 px-5 text-right font-mono">{totals.comentarios}</td>
              <td className="py-3.5 px-6 text-right">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-assai-blue text-white">
                  {totals.taxaEngajamento.toFixed(2)}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
