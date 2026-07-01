import { PilarData, PromoData, CrisisAlert, SacRecommendation } from './types';

export const KPIs = {
  totalPosts: 181,
  totalAlcance: 5681944,
  totalInteracoes: 193069,
  totalCurtidas: 32001,
};

export const pilaresData: PilarData[] = [
  {
    pilar: 'Aplicativo Assaí App',
    posts: 65,
    alcance: 1790960,
    interacoes: 72580,
    curtidas: 6421,
    comentarios: 551,
    taxaEngajamento: 4.05,
  },
  {
    pilar: 'Cartão Passaí',
    posts: 58,
    alcance: 1997970,
    interacoes: 68390,
    curtidas: 15912,
    comentarios: 851,
    taxaEngajamento: 3.42,
  },
  {
    pilar: 'iFood',
    posts: 53,
    alcance: 1790957,
    interacoes: 50033,
    curtidas: 7629,
    comentarios: 699,
    taxaEngajamento: 2.79,
  },
  {
    pilar: 'Geral / Outros',
    posts: 7,
    alcance: 352258,
    interacoes: 10986,
    curtidas: 1744,
    comentarios: 130,
    taxaEngajamento: 3.12,
  },
  {
    pilar: 'Rappi',
    posts: 5,
    alcance: 102057,
    interacoes: 2066,
    curtidas: 295,
    comentarios: 27,
    taxaEngajamento: 2.02,
  },
];

export const promoData: PromoData[] = [
  {
    tipo: 'Orgânico',
    posts: 175,
    alcance: 5198516,
    interacoes: 188425,
    alcanceMedio: 29705,
    engajamento: 3.62,
  },
  {
    tipo: 'Impulsionado',
    posts: 13,
    alcance: 835686,
    interacoes: 15630,
    alcanceMedio: 64283,
    engajamento: 1.87,
  },
];

export const crisesAlerts: CrisisAlert[] = [
  {
    id: '1',
    post: 'Sacolas',
    data: '24/03/2026',
    formato: 'Carrossel',
    alcance: 47561,
    comentarios: 142,
    nivel: 'critico',
    diagnostico: 'Reclamações severas do público sobre taxas de sacolas ou regras operacionais de entrega de atacado no app do iFood.',
  },
  {
    id: '2',
    post: 'Futebol São João',
    data: '14/05/2026',
    formato: 'Post de Campanha',
    alcance: 58610,
    comentarios: 42,
    nivel: 'moderado',
    diagnostico: 'Discussões e atritos gerados por cupons de desconto esgotados ou áreas sem cobertura de entrega.',
  },
];

export const sacRecommendations: SacRecommendation[] = [
  {
    id: 'rec-2',
    acao: 'Gestão Ágil',
    contexto: 'Garantir resposta célere de SAC como cupons alternativos ou indicação clara de validade assim que os lotes promocionais de campanhas como "Futebol São João" esgotarem.',
  },
  {
    id: 'rec-3',
    acao: 'Potencialização de Conteúdo Saudável',
    contexto: 'Focar em formatos de humor corporativo ("Funcionários de Loja") no Reels, que comprovadamente tracionam alto engajamento orgânico sem gerar fricção ou reclamações de processos de entrega.',
  },
  {
    id: 'rec-4',
    acao: 'Monitoramento Integrado de Parcerias',
    contexto: 'Estabelecer canal direto com a equipe de operações do iFood para mitigar atritos operacionais antes de impulsionamentos ou picos de tráfego promocional.',
  },
];
