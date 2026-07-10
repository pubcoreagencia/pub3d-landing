/* Dados editáveis da PUB 3D. Links vazios não devem ser renderizados. */
window.PUB3D = {
  expansion: { status: 'Modelo de expansão em estruturação', applicationsOpen: true, commercialOfferAvailable: false, legalNotice: 'O cadastro representa uma manifestação de interesse e não garante aprovação, disponibilidade regional, exclusividade territorial ou abertura de unidade.' },
  marketplaces: [],
  contact: { whatsapp: '' },
  pending: ['WhatsApp ou endpoint seguro', 'catálogo ou links oficiais de marketplace', 'acervo de fotos e portfólio aprovados', 'definição comercial da distribuição de pedidos']
};
const pub3dAssetVersion = '20260710-operation-scene';
const versionedAsset = path => `${path}?v=${pub3dAssetVersion}`;
const pub3dStyles = document.createElement('link');
pub3dStyles.rel = 'stylesheet';
pub3dStyles.href = versionedAsset('overrides.css');
document.head.append(pub3dStyles);
const pub3dLogoStyles = document.createElement('link');
pub3dLogoStyles.rel = 'stylesheet';
pub3dLogoStyles.href = versionedAsset('logo.css');
document.head.append(pub3dLogoStyles);
const pub3dSceneStyles = document.createElement('link');
pub3dSceneStyles.rel = 'stylesheet';
pub3dSceneStyles.href = versionedAsset('scene.css');
document.head.append(pub3dSceneStyles);
const visualRefinement = document.createElement('link');
visualRefinement.rel = 'stylesheet';
visualRefinement.href = versionedAsset('visual-refinement.css');
document.head.append(visualRefinement);
