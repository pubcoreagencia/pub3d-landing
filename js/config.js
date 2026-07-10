export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isCoarsePointer = matchMedia('(pointer: coarse)').matches;

export const visualAssets = {
  logo: {
    source: 'assets/pub-logo-transparent.png',
    type: 'brand-asset',
    section: 'header/footer',
    semanticRole: 'identidade PUB 3D',
    isReal: true,
    isConcept: false
  },
  visualSystem: {
    source: null,
    type: 'css-dom-svg',
    section: 'site-wide',
    semanticRole: 'camadas, filamento, módulos e rede operacional',
    isReal: false,
    isConcept: true
  },
  portfolio: {
    source: null,
    type: 'editorial-placeholder',
    section: 'portfolio',
    semanticRole: 'estrutura para acervo aprovado',
    isReal: false,
    isConcept: true
  }
};
