# AXIS - Projeto Integrador (HTML5 + CSS3 estáticos)

Site estático da loja AXIS, feito conforme a apostila de Fundamentos de Web Design I (FDW1): HTML5 semântico, CSS3 e layout responsivo. **Sem back-end e sem banco de dados.**

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Página inicial: banner, categorias, produtos em destaque, banners institucionais |
| `produtos.html` | Catálogo (filtros + vitrine no grid de 12 colunas) |
| `produto-*.html` | Páginas de detalhe de cada produto (8) |
| `sobre.html` | Quem somos: história, nome, objetivo e valores |
| `faq.html` | Perguntas frequentes com `<details>` e `<summary>` |
| `contato.html` | Formulário com validação nativa do HTML5 |
| `login.html`, `cadastro.html`, `recuperar-senha.html`, `minha-conta.html` | Fluxo de conta (visual) |
| `carrinho.html`, `pagamento.html`, `pedido-confirmado.html`, `meuspedidos.html` | Fluxo de compra (visual) |
| `ajuda.html` | Central de ajuda |
| `dashboard.html` | Painel do funcionário: tabela de gestão de produtos (dados estáticos) |
| `css/style.css` | Todo o CSS (o índice está no topo do arquivo) |
| `js/main.js` | JavaScript básico: menu, `alert()` de demonstração, conferência de senha, galeria |
| `assets/` | Imagens |

## Convenções aplicadas

- **Header idêntico em todas as páginas**, fixo no topo (`position: sticky`) e com altura única.
- **Grid de 12 colunas** em CSS puro (seção 45.3 da apostila): `.row`, `.col-1` a `.col-12`, com `.col-t-*` (tablet, até 1100px) e `.col-m-*` (celular, até 720px) e `box-sizing: border-box`.
- **Semântica HTML5**: `header`, `nav`, `main`, `section`, `article`, `aside` e `footer`.
- **JavaScript mínimo**: nada de `fetch`, `localStorage`, `sessionStorage`, PHP ou banco de dados.

## Observações

- O painel (`dashboard.html`) é só demonstração: "Editar" e "Excluir" mostram um `alert()` e nada é salvo. Não há login real; o acesso é pelo menu do cabeçalho.
- Login e cadastro apenas levam para `minha-conta.html`; recuperação de senha e contato mostram um aviso.
