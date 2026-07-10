export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isCoarsePointer = matchMedia('(pointer: coarse)').matches;
export const states = {
  topo: { name: 'IDEIA / MODELO', mode: 'idea', accent: '#e43d25', density: 18 },
  resumo: { name: 'SLICING / FLUXO', mode: 'layers', accent: '#e43d25', density: 10 },
  personalizados: { name: 'PERSONALIZAR', mode: 'custom', accent: '#e43d25', density: 7 },
  produtos: { name: 'CATÁLOGO / PRODUTO', mode: 'catalog', accent: '#e43d25', density: 6 },
  operacao: { name: 'PEDIDO / PRODUÇÃO', mode: 'order', accent: '#f1e8dc', density: 8 },
  expansao: { name: 'FARM / REDE', mode: 'network', accent: '#e43d25', density: 12 },
  projeto: { name: 'CONVERGÊNCIA', mode: 'close', accent: '#e43d25', density: 4 }
};
export const stateIds = Object.keys(states);
