# Pesquisa UI/UX — PUB 3D

## 1. Objetivo e contexto

Construir uma landing para uma unidade de fabricação digital da holding PUB. A página precisa atender duas intenções sem misturá-las: contratar modelagem/produção e registrar interesse numa futura operação de farm ou rede. Não há números, clientes, fotos próprias, dados territoriais ou oferta comercial confirmados; portanto, eles não são exibidos.

## 2. Fontes, termos e limitações

Foram consultadas galerias e referências técnicas em julho de 2026. Termos: “additive manufacturing website”, “industrial WebGL website”, “scroll driven 3D product reveal”, “accessible WebGL canvas fallback”, “3D printing branding”, “manufacturing landing page”. Resultados bloqueados ou que exibiam somente thumbnails não foram tratados como navegação completa.

### Referências selecionadas

| Referência | Plataforma | Categoria | Aprendizado aplicável | Não copiar |
|---|---|---|---|---|
| [HappyOps](https://www.awwwards.com/sites/happyops) | Awwwards, 2023 | manufatura / 3D | Tecnologia industrial pode ter linguagem editorial e movimento sem perder clareza | A paleta cyan-magenta e a estética de software |
| [Finely Crafted](https://www.awwwards.com/sites/finely-crafted) | Awwwards, 2021 | tour WebGL | Uma cena imersiva funciona quando está ligada a uma sequência de fazer | Navegação incomum e imersão longa para uma landing comercial |
| [Klingö](https://www.behance.net/gallery/244339871/Klingoe-Visual-Identity-%283DPrinter-Studio%29) | Behance, 2026 | identidade | Tirar a impressão 3D da aparência puramente técnica e aproximá-la de objeto/craft | A identidade e composição do case |
| [ENABLE 3D](https://www.behance.net/gallery/153477767/ENABLE-3D-Brand-Visual-Identity) | Behance, 2022 | marca / fabricação distribuída | Produção descentralizada é uma narrativa de rede, não uma lista de máquinas | A linguagem visual e alegações da empresa |
| [ZMORPH](https://www.behance.net/gallery/112686795/ZMORPH-Rebranding-Webdesign) | Behance, 2021 | produto / web | Sistema de marca e jornadas devem preceder microinterações | O sistema visual do case |
| [3D Creative](https://www.behance.net/gallery/111754021/3D-Creative) | Behance, 2021 | marca / website | Gráficos de volume ajudam a tornar fabricação compreensível | O desenho da identidade |
| [RawIdea](https://www.behance.net/gallery/232374727/RawIdea-Corporate-Website-3D-Printing) | Behance, 2025 | corporativo | Empresas de impressão precisam comunicar aplicações, além da máquina | O layout/copy do projeto |
| [Magnet Lover](https://onepagelove.com/magnet-lover) | One Page Love, 2026 | manufatura / landing | Detalhe visual e um único percurso podem valorizar produto físico | O conceito, ramo e arte final |
| [Three.js responsive](https://threejs.org/manual/en/responsive.html) | Three.js | técnica | Tamanho deve partir de CSS e pixel ratio precisa ser deliberado | Implementar 3D sem necessidade concreta |
| [WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html) | Three.js | técnica | DPR influencia diretamente o buffer e o custo de GPU | Pixel ratio máximo do dispositivo em mobile |
| [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | GSAP | técnica | Medição de triggers pode ser otimizada; escolher uma camada de motion | Adicionar GSAP para poucas transições |
| [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion) | MDN | acessibilidade | Preferência do usuário deve reduzir/remover movimentos não essenciais | Fallback só visual, sem conteúdo |

## 3. Padrões encontrados e leitura crítica

- O melhor 3D de produto explica montagem, material, escala ou inspeção; objetos girando sem legenda pareciam decoração.
- Referências industriais fortes alternam blocos de leitura longos com detalhes técnicos curtos. A interface fica mais confiável quando o vocabulário visual é disciplinado.
- Muitos cases premiados dependem de vídeo/WebGL e transições longas. Para captação, as ações precisam aparecer no primeiro viewport e repetirem no fim.
- O mobile bem resolvido simplifica a cena, mantém o texto em fluxo e não transforma seções em duas colunas estreitas.
- Portfólios de identidade são úteis para tipografia, ritmo e cor, mas não comprovam responsividade, acessibilidade ou performance de um site real.

## 4. Direções exploradas

| Direção | Ideia | Vantagem | Risco |
|---|---|---|---|
| Laboratório de camadas | Peça como pilha de camadas que vira objeto e operação | Une impressão, processo e expansão | Poderia parecer um dashboard fictício |
| Oficina editorial | Fotografia macro, páginas com grande espaço negativo e ênfase no acabamento | Humana e premium | Depende de fotos próprias ainda indisponíveis |
| Rede de produção | Diagrama vivo de unidades, pedidos e padrões | Evidencia expansão | Pode ter tom de apresentação a investidor |

### Direção escolhida: “Da ideia à matéria”

Foi escolhida uma síntese entre laboratório de camadas e oficina editorial. A marca usa papel quente, preto quase orgânico e vermelho de processo; o vermelho assinala decisão/energia, não neon. A peça em camadas é uma metáfora direta de modelo → camada → matéria → peça. A farm aparece como estrutura organizada, e não como promessa de escala financeira.

## 5. Sistema visual e narrativa

- **Tipografia:** Manrope para leitura técnica contemporânea, Playfair Display em itálico somente para matéria/gesto humano e DM Mono para índices.
- **Grid:** margem variável de 4,7% (5% mobile); títulos em blocos largos, informação operacional em linhas de regra.
- **Paleta:** ink `#141410`, paper `#e9e5db`, process red `#e43d25`.
- **Scroll:** hero (modelo em camadas) → operações → aplicações → quatro decisões → farm → rede → expansão → duas conversões. Não há scroll sequestrado.
- **3D:** uma ilustração procedural em Canvas 2D, com planos deslocados e índice de camadas. É uma decisão consciente: sem modelo real de peça, uma cena Three.js genérica introduziria peso e falsa especificidade.

## 6. Arquitetura e conteúdo

O protótipo estático concentra HTML semântico em `index.html`, aparência responsiva em `style.css` e comportamento progressivo em `app.js`. Em uma aplicação de produção, conteúdo (operações, FAQ, CTAs, status e dados de contato) deve migrar para `content/pub3d.ts`; o status de expansão deve preservar: “Programa de expansão em estruturação”, sem valores financeiros, regiões ou disponibilidade inventada.

## 7. Performance, mobile e acessibilidade

- Sem framework, dependências ou assets raster. A fonte remota deve ser auto-hospedada em produção, com `font-display: swap`.
- Canvas usa DPR limitado a 1,5, pausa quando a aba fica oculta e não contém conteúdo essencial.
- A versão mobile remove rótulos decorativos, converte grids para uma coluna e mantém CTAs e formulários na ordem de leitura.
- Skip link, landmarks, um H1, labels, foco nativo, formulários com `required`, accordions nativos `details/summary`, contraste alto e aviso explícito da expansão estão presentes.
- `prefers-reduced-motion` remove canvas, smooth scroll e transições não essenciais.
- Os formulários não simulam backend: validam nativamente e preparam a mensagem no clipboard quando disponível. A integração real deve receber validação no servidor, consentimento, antispam e rate limiting; nenhum dado é enviado ou registrado pelo protótipo.

## 8. Riscos, assets e próximos passos

Ainda são necessários: logotipo oficial, WhatsApp/endpoint, política de privacidade, fotos reais de máquinas/processos/peças, portfólio com metadados e confirmação jurídica/comercial do programa de expansão. Antes de publicar, adicionar metadados Open Graph com imagem real, analytics já aprovado e testes em dispositivos físicos. Não usar renders ou imagens de terceiros como se fossem produção da PUB 3D.

## 9. Como evita copiar referências

Nenhum layout, copy, paleta, modelo, foto ou interação foi extraído de uma referência. A solução parte do processo material específico da PUB 3D e usa somente princípios abstratos observados: hierarquia editorial, 3D explicativo, progressive enhancement, motion reduzível e segmentação explícita de jornadas.

---

## Atualização de arquitetura — produtos, marketplaces e expansão

### Diagnóstico do protótipo anterior

O primeiro protótipo tinha direção de arte consistente e uma boa metáfora de “camadas”, mas descrevia a PUB 3D principalmente como fabricação sob demanda e farm. “Aplicações”, “processo”, “farm” e “rede” repetiam partes da mesma promessa em blocos separados. A frente de produtos próprios e marketplace estava ausente, o que fazia a expansão parecer produtiva antes de parecer comercial.

### Pesquisa complementar

Além das referências acima, foram consultados resultados de [One Page Love](https://onepagelove.com/) para landing pages de produto físico e a documentação de [MDN sobre scroll progress](https://developer.mozilla.org/en-US/blog/scroll-progress-animations-in-css/). Os princípios retidos foram: fluxo comercial legível sem dashboard fictício, CTA de catálogo condicionado a um destino real, e movimento simples quando CSS/DOM comunica melhor que uma cena pesada. Não foram feitas alegações de navegação em cases sem acesso completo.

### Nova arquitetura de informação: oito blocos

1. Hero — posicionamento completo e duas rotas prioritárias.
2. PUB 3D em resumo — mapa de quatro movimentos, imediatamente após a dobra.
3. Personalizados e encomendas — pedido único, modelagem e acabamento.
4. Produtos e marketplaces — demanda, catálogo, anúncio, pedido e dados.
5. Operação integrada e farm — pedido conectado à produção, embalagem e envio.
6. Expansão — réplica de operação completa, não venda de equipamento.
7. Portfólio — duas estruturas vazias e honestas até a chegada do acervo real.
8. Conversão — dois formulários e FAQ essencial, seguidos do CTA final.

Essa redução substitui blocos que voltavam a explicar “processo”, “rede” e “farm” separadamente. Cada seção agora responde a uma pergunta: o que é, como encomendar, como um produto circula, como um pedido opera, o que pode ser replicado, o que já pode ser mostrado e qual conversa iniciar.

### Direção de interação e 3D

A narrativa foi expandida para **ideia/demanda → produto → anúncio → pedido → camada → peça → embalagem → envio → dados → escala**. A camada visual não simula marketplace, métricas ou unidades existentes: no hero, o canvas mostra matéria em camadas; na operação, o DOM ilustra ordens e uma máquina como diagrama. Ambos são dispensáveis à leitura e pausam/reduzem movimento conforme a preferência do usuário.

### Configuração e decisões pendentes

`content.js` concentra o status de expansão, contatos, lista de marketplaces e pendências. A lista vem vazia por padrão; logo, não há CTA de catálogo ou logotipo de canal sem link oficial. Permanecem abertas: modelo de conta de marketplace (central, regional ou híbrido), distribuição de pedidos, canal de WhatsApp/endpoint seguro, portfólio aprovado e condições jurídicas/comerciais da expansão.
