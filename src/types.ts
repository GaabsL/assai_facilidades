export interface PilarData {
  pilar: string;
  posts: number;
  alcance: number;
  interacoes: number;
  curtidas: number;
  comentarios: number;
  taxaEngajamento: number; // e.g., 4.05 for 4.05%
}

export interface PromoData {
  tipo: 'Orgânico' | 'Impulsionado';
  posts: number;
  alcance: number;
  interacoes: number;
  alcanceMedio: number;
  engajamento: number; // e.g., 1.87
}

export interface CrisisAlert {
  id: string;
  post: string;
  data: string;
  formato: string;
  alcance: number;
  comentarios: number;
  nivel: 'critico' | 'moderado';
  diagnostico: string;
}

export interface SacRecommendation {
  id: string;
  acao: string;
  contexto: string;
}
