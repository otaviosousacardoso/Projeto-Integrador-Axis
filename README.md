# AXIS - entrega baseada no Canva e na apostila FDW1

## Estrutura

- `index.html`: página inicial, menu e modal de login.
- `login.html`, `cadastro.html`, `recuperar-senha.html`: fluxo de conta conectado.
- `minha-conta.html`: destino visual temporário após entrar ou criar uma conta.
- `css/styles.css` e `js/main.js`: estilos e interações sem dependências externas. Esses caminhos mantêm o padrão usado no seu `index.html` original.
- `assets/`: os PNGs fornecidos, organizados nos mesmos caminhos usados pelos arquivos HTML.

## Convenções aplicadas da apostila

- Estrutura HTML completa em todas as páginas: `<!doctype html>`, `html lang="pt-br"`, `head`, `title`, metadados e `body`.
- CSS externo vinculado com `rel="stylesheet"`, `type="text/css"` e regras organizadas por assunto: caixa, cabeçalho, links, posicionamento, categorias, rodapé e formulários.
- Elementos semânticos `header`, `nav`, `main`, `section`, `article` e `footer`; o menu secundário usa lista não ordenada.
- Formulários com `form`, `fieldset`, `legend`, `label`, tipos adequados de `input` e validação do navegador.
- Seletores por elemento, classe e `id`, além de estados de links e botões. Grid, Flexbox e media queries foram preservados onde necessários para manter a fidelidade ao Canva e a responsividade.

## Fluxo implementado

`Ícone de usuário` abre o modal de login do Canva. Sem JavaScript, ele leva para `login.html`. De login, o usuário pode abrir recuperação de senha ou cadastro. Após validação no navegador, login e cadastro levam para `minha-conta.html`.

Esta é uma implementação front-end: conectar autenticação real, envio de e-mail e dados de pedidos exige um back-end seguro. Os caminhos `produtos.html`, `carrinho.html`, `ajuda.html` e `meus-pedidos.html` foram preservados para as próximas páginas do projeto.
