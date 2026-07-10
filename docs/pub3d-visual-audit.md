# PUB 3D — auditoria visual após rollback

Data: 10 de julho de 2026

## Direção descartada

A camada visual anterior foi tratada como direção rejeitada. Foram removidos:

- cena WebGL e dependência remota de Three.js;
- canvas global fixo;
- fallback procedural em canvas 2D;
- pseudoimpressora e etiquetas decorativas da seção de operação;
- arquivos CSS criados para remendar a direção rejeitada;
- asset intermediário `pub-logo-chroma.png`.

Não há arquivos STL, OBJ, GLB ou GLTF no projeto.

## Base limpa preservada

Foram mantidos:

- estrutura comercial da PUB 3D;
- jornada de personalizados e encomendas;
- produtos próprios e marketplaces;
- operação de pedidos, produção, acabamento, embalagem e expedição;
- expansão como operação completa, não apenas instalação de máquinas;
- formulários, navegação, logo transparente e SEO básico.

## Nova família visual

A nova camada usa apenas DOM, CSS 3D e SVG leve. O vocabulário é único durante a página:

| Elemento | Semiótica | Uso |
| --- | --- | --- |
| Camadas empilhadas | impressão, construção e volume | hero e personalizados |
| Fita/linha | filamento, fluxo e conexão | hero e produtos |
| Módulos repetidos | catálogo, pedido e recorrência | resumo e produtos |
| Impressora editorial | produção FDM sem simulação técnica | operação |
| Células conectadas | farm, expansão e capacidade | operação e expansão |

O sistema é decorativo e subordinado ao conteúdo. Ele não representa produtos reais nem simula uma máquina.
Na seção de operação, a impressora é uma silhueta minimalista feita com DOM/CSS para dar reconhecimento imediato à farm, sem loader, modelo externo ou canvas.

## Validação de acúmulo

- Não há dois sistemas visuais simultâneos.
- Não há canvas oculto.
- Não há import de Three.js.
- Não há loader de modelo 3D.
- Não há imagens ou renders de terceiros.
- A única imagem de marca usada no site é `assets/pub-logo-transparent.png`.
