/* ==========================================================================
   AXIS - JAVASCRIPT BÁSICO DO SITE
   Só interações simples de front-end (sem banco de dados e sem fetch; o
   localStorage é usado apenas na seção 20, o cadastro de cupons do admin). Todas as páginas carregam este arquivo no fim do <body>.
   Cada bloco só roda se encontrar o elemento que precisa.

   1. Menu do cabeçalho (abrir/fechar)
   2. Alertas simples de demonstração (botões com data-alert)
   3. Cadastro: conferir se as duas senhas são iguais
   4. Carrinho: remover um item da lista
   5. Página de produto: trocar a foto principal
   6. Login: funcionário e administrador (usuários fixos)
   ========================================================================== */

/* ---------- 1. MENU DO CABEÇALHO ----------
   O ícone de hambúrguer mostra/esconde o menu e avisa os leitores de tela
   se ele está aberto (aria-expanded).
   Até 720px (celular) o menu é uma barra lateral que desliza pela direita
   (drawer): o CSS faz o deslize, e aqui criamos o fundo escuro e o botão ×,
   e fechamos o menu ao clicar fora, no ×, num link ou na tecla Esc. */
var menuToggle = document.querySelector('.menu-toggle');
var siteMenu = document.querySelector('#site-menu');

if (menuToggle && siteMenu) {
  var menuCelular = window.matchMedia('(max-width: 720px)');

  var menuFundo = document.createElement('div');
  menuFundo.className = 'site-menu-backdrop';
  siteMenu.parentNode.appendChild(menuFundo);

  var menuFechar = document.createElement('button');
  menuFechar.type = 'button';
  menuFechar.className = 'site-menu__close';
  menuFechar.setAttribute('aria-label', 'Fechar menu');
  menuFechar.innerHTML = '&times;';
  siteMenu.insertBefore(menuFechar, siteMenu.firstChild);

  function definirMenu(abrir) {
    menuToggle.setAttribute('aria-expanded', String(abrir));
    siteMenu.hidden = !abrir;
    menuFundo.classList.toggle('is-open', abrir && menuCelular.matches);
    document.body.classList.toggle('menu-open', abrir && menuCelular.matches);

    if (abrir && menuCelular.matches) { menuFechar.focus(); }
  }

  menuToggle.addEventListener('click', function () {
    definirMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  menuFechar.addEventListener('click', function () {
    definirMenu(false);
    menuToggle.focus();
  });

  menuFundo.addEventListener('click', function () {
    definirMenu(false);
  });

  siteMenu.addEventListener('click', function (evento) {
    if (menuCelular.matches && evento.target.closest('a')) { definirMenu(false); }
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      definirMenu(false);
      menuToggle.focus();
    }
  });

  /* Ao girar o celular / redimensionar a janela, o menu volta fechado */
  if (menuCelular.addEventListener) {
    menuCelular.addEventListener('change', function () { definirMenu(false); });
  } else {
    menuCelular.addListener(function () { definirMenu(false); });
  }
}

/* ---------- 2. ALERTAS DE DEMONSTRAÇÃO ----------
   Qualquer botão com data-alert="mensagem" mostra um alert() simples.
   Ex.: botões "Editar" e "Excluir" do dashboard. */
var botoesAlerta = document.querySelectorAll('[data-alert]');

for (var i = 0; i < botoesAlerta.length; i++) {
  botoesAlerta[i].addEventListener('click', function () {
    alert(this.getAttribute('data-alert'));
  });
}

/* Formulários com data-alert-submit: validam pelo navegador (required, type="email"...)
   e, se estiver tudo certo, mostram um alert() em vez de enviar os dados. */
var formsAlerta = document.querySelectorAll('form[data-alert-submit]');

for (var j = 0; j < formsAlerta.length; j++) {
  formsAlerta[j].addEventListener('submit', function (evento) {
    evento.preventDefault();
    alert(this.getAttribute('data-alert-submit'));
  });
}

/* ---------- 3. CADASTRO ----------
   O HTML5 não compara dois campos, então este é o único teste feito em JavaScript. */
var formCadastro = document.querySelector('#form-cadastro');

if (formCadastro) {
  formCadastro.addEventListener('submit', function (evento) {
    var senha = document.querySelector('#register-password');
    var confirmacao = document.querySelector('#register-confirmation');

    if (senha.value !== confirmacao.value) {
      evento.preventDefault();
      alert('As senhas precisam ser iguais.');
      confirmacao.focus();
    }
  });
}

/* ---------- 4. CARRINHO ----------
   A lixeira tira o produto da lista. */
var botoesRemover = document.querySelectorAll('.cart-item__remove');

for (var k = 0; k < botoesRemover.length; k++) {
  botoesRemover[k].addEventListener('click', function () {
    this.closest('.cart-item').remove();
  });
}

/* ---------- 5. PÁGINA DE PRODUTO ----------
   Galeria: clicar numa miniatura troca a foto principal. */
var galeria = document.querySelector('[data-product-gallery]');

if (galeria) {
  var fotoPrincipal = galeria.querySelector('[data-gallery-main]');
  var miniaturas = galeria.querySelectorAll('[data-gallery-thumb]');

  for (var m = 0; m < miniaturas.length; m++) {
    miniaturas[m].addEventListener('click', function () {
      fotoPrincipal.src = this.getAttribute('data-full');
      fotoPrincipal.alt = this.getAttribute('data-alt');

      for (var n = 0; n < miniaturas.length; n++) {
        miniaturas[n].classList.remove('is-active');
        miniaturas[n].setAttribute('aria-pressed', 'false');
      }

      this.classList.add('is-active');
      this.setAttribute('aria-pressed', 'true');
    });
  }
}

/* ---------- 6. LOGIN (usuários fixos, só demonstração) ----------
   funcionario@axis.com / 1234567 -> dashboard-funcionario.html
   admin@axis.com       / 1234567 -> admin.html
   Qualquer outro e-mail segue para minha-conta.html (cliente). */
var formLogin = document.querySelector('#form-login');

if (formLogin) {
  formLogin.addEventListener('submit', function (evento) {
    var email = document.querySelector('#page-login-email').value.trim().toLowerCase();
    var senha = document.querySelector('#page-login-password').value;
    var erro = document.querySelector('#login-erro');

    if (email === 'funcionario@axis.com' || email === 'admin@axis.com') {
      evento.preventDefault();

      if (senha === '1234567') {
        window.location.href = (email === 'admin@axis.com') ? 'admin.html' : 'dashboard-funcionario.html';
      } else {
        erro.hidden = false;
      }
    }
  });
}

/* ---------- 7. ABAS ----------
   <button class="tab-btn" data-tab="id-do-painel"> mostra o <div class="tab-panel" id="id-do-painel">.
   Cada grupo de abas (.tabs) funciona sozinho: trocar a aba de um grupo não mexe nos outros,
   então dá para ter abas dentro de abas (ex.: Minha conta > Meus pedidos > Em andamento). */
var botoesAba = document.querySelectorAll('[data-tab]');

for (var a = 0; a < botoesAba.length; a++) {
  botoesAba[a].addEventListener('click', function () {
    var grupo = this.closest('.tabs') || document;
    var abas = grupo.querySelectorAll('[data-tab]');

    for (var b = 0; b < abas.length; b++) {
      var painelAba = document.getElementById(abas[b].getAttribute('data-tab'));

      abas[b].classList.remove('is-active');
      if (painelAba) { painelAba.classList.remove('is-active'); }
    }

    document.getElementById(this.getAttribute('data-tab')).classList.add('is-active');
    this.classList.add('is-active');
  });
}

/* ---------- 8. FILTRO DE TABELA ----------
   <input data-filter="id-da-tabela"> esconde as linhas que não têm o texto digitado. */
var campoFiltro = document.querySelector('[data-filter]');

if (campoFiltro) {
  campoFiltro.addEventListener('input', function () {
    var linhas = document.querySelectorAll('#' + this.getAttribute('data-filter') + ' tbody tr');
    var texto = this.value.toLowerCase();

    for (var l = 0; l < linhas.length; l++) {
      linhas[l].hidden = linhas[l].textContent.toLowerCase().indexOf(texto) === -1;
    }
  });
}

/* ---------- 9. COPIAR CUPOM ----------
   <button data-copy="CODIGO"> copia o código e troca o texto do botão por um instante. */
var botoesCopiar = document.querySelectorAll('[data-copy]');

for (var c = 0; c < botoesCopiar.length; c++) {
  botoesCopiar[c].addEventListener('click', function () {
    var botao = this;
    var textoOriginal = botao.textContent;

    if (navigator.clipboard) { navigator.clipboard.writeText(botao.getAttribute('data-copy')); }
    botao.textContent = 'Copiado!';
    setTimeout(function () { botao.textContent = textoOriginal; }, 1500);
  });
}

/* ---------- 10. SAIR DA CONTA ----------
   Qualquer link/botão com data-logout volta para a tela de login (sem sessão real). */
var botaoSair = document.querySelector('[data-logout]');

if (botaoSair) {
  botaoSair.addEventListener('click', function (evento) {
    evento.preventDefault();
    window.location.href = 'login.html';
  });
}

/* ---------- 11. TROCAR SENHA ----------
   Marca o campo "confirmar" como inválido enquanto for diferente da nova senha
   (o próprio navegador impede o envio e mostra a mensagem). */
var novaSenha = document.querySelector('#nova-senha');
var confirmaNovaSenha = document.querySelector('#confirma-nova-senha');

if (novaSenha && confirmaNovaSenha) {
  var conferirSenhas = function () {
    var mensagem = (novaSenha.value !== confirmaNovaSenha.value) ? 'As senhas precisam ser iguais.' : '';
    confirmaNovaSenha.setCustomValidity(mensagem);
  };

  novaSenha.addEventListener('input', conferirSenhas);
  confirmaNovaSenha.addEventListener('input', conferirSenhas);
}

/* ---------- 12. REMOVER ITEM ----------
   <button data-remove=".classe-do-bloco"> remove o bloco pai mais próximo com essa classe.
   Ex.: remover endereço, marcar atendimento como resolvido. */
var botoesRemoverBloco = document.querySelectorAll('[data-remove]');

for (var r = 0; r < botoesRemoverBloco.length; r++) {
  botoesRemoverBloco[r].addEventListener('click', function () {
    this.closest(this.getAttribute('data-remove')).remove();
  });
}

/* ---------- 13. DESPACHAR PEDIDO ----------
   <button data-dispatch> troca o selo da linha para "Despachado" e desativa o botão. */
var botoesDespachar = document.querySelectorAll('[data-dispatch]');

for (var d = 0; d < botoesDespachar.length; d++) {
  botoesDespachar[d].addEventListener('click', function () {
    var selo = this.closest('tr').querySelector('.badge');

    selo.textContent = 'Despachado';
    selo.className = 'badge badge--ok';
    this.textContent = 'Enviado';
    this.disabled = true;
  });
}

/* ---------- 14. AJUSTE RÁPIDO DE ESTOQUE ----------
   <button data-stock="-1"> ou data-stock="10" soma ao número da etiqueta .stock e troca a cor. */
var botoesEstoque = document.querySelectorAll('[data-stock]');

for (var e = 0; e < botoesEstoque.length; e++) {
  botoesEstoque[e].addEventListener('click', function () {
    var etiqueta = this.closest('.list-row').querySelector('.stock');
    var quantidade = parseInt(etiqueta.textContent, 10) + Number(this.getAttribute('data-stock'));

    if (quantidade < 0) { quantidade = 0; }

    etiqueta.textContent = quantidade + ' un.';
    etiqueta.className = 'stock ' + (quantidade === 0 ? 'stock--out' : (quantidade < 10 ? 'stock--low' : 'stock--ok'));
  });
}

/* ---------- 15. TEMPORIZADOR DE OFERTAS ----------
   <span class="countdown" data-countdown="hoje"> conta até 23:59:59 de hoje.
   <span class="countdown" data-countdown="90">   conta 90 minutos a partir de agora. */
var contadores = document.querySelectorAll('[data-countdown]');

function doisDigitos(numero) {
  return numero < 10 ? '0' + numero : String(numero);
}

function atualizarContadores() {
  for (var t = 0; t < contadores.length; t++) {
    var resto = Math.floor((Number(contadores[t].getAttribute('data-fim')) - Date.now()) / 1000);

    if (resto <= 0) {
      contadores[t].textContent = 'Encerrada';
    } else {
      contadores[t].textContent = doisDigitos(Math.floor(resto / 3600)) + ':' + doisDigitos(Math.floor(resto % 3600 / 60)) + ':' + doisDigitos(resto % 60);
    }
  }
}

if (contadores.length > 0) {
  for (var u = 0; u < contadores.length; u++) {
    var fim = new Date();

    if (contadores[u].getAttribute('data-countdown') === 'hoje') {
      fim.setHours(23, 59, 59, 999);
    } else {
      fim = new Date(Date.now() + Number(contadores[u].getAttribute('data-countdown')) * 60000);
    }

    contadores[u].setAttribute('data-fim', String(fim.getTime()));
  }

  atualizarContadores();
  setInterval(atualizarContadores, 1000);
}

/* ---------- 16. FILTRO POR DESCONTO ----------
   <button data-min-discount="15"> mostra só as colunas com data-discount >= 15. */
var botoesDesconto = document.querySelectorAll('[data-min-discount]');

for (var v = 0; v < botoesDesconto.length; v++) {
  botoesDesconto[v].addEventListener('click', function () {
    var minimo = Number(this.getAttribute('data-min-discount'));
    var cartoes = document.querySelectorAll('[data-discount]');
    var visiveis = 0;

    for (var x = 0; x < botoesDesconto.length; x++) { botoesDesconto[x].classList.remove('is-active'); }
    this.classList.add('is-active');

    for (var y = 0; y < cartoes.length; y++) {
      var mostrar = Number(cartoes[y].getAttribute('data-discount')) >= minimo;
      cartoes[y].hidden = !mostrar;
      if (mostrar) { visiveis++; }
    }

    document.querySelector('[data-offers-count]').textContent = visiveis + (visiveis === 1 ? ' oferta encontrada' : ' ofertas encontradas');
  });
}

/* ---------- 17. FILTRO DE CATEGORIAS DO BLOG ----------
   <button data-cat="dicas"> mostra só os posts com data-category="dicas" ("todos" mostra tudo). */
var botoesCategoria = document.querySelectorAll('[data-cat]');

for (var z = 0; z < botoesCategoria.length; z++) {
  botoesCategoria[z].addEventListener('click', function () {
    var categoria = this.getAttribute('data-cat');
    var posts = document.querySelectorAll('[data-category]');

    for (var w = 0; w < botoesCategoria.length; w++) { botoesCategoria[w].classList.remove('is-active'); }
    this.classList.add('is-active');

    for (var q = 0; q < posts.length; q++) {
      posts[q].hidden = categoria !== 'todos' && posts[q].getAttribute('data-category') !== categoria;
    }
  });
}

/* ---------- 18. PAGINAÇÃO DA VITRINE DE PRODUTOS ----------
   As seções .product-page são alternadas pelas setas no fim da vitrine. */

var paginasProdutos = document.querySelectorAll('.product-page');
var botaoPaginaAnterior = document.querySelector('[data-page-prev]');
var botaoPaginaProxima = document.querySelector('[data-page-next]');

if (paginasProdutos.length > 0 && botaoPaginaAnterior && botaoPaginaProxima) {

  var paginaProdutoAtual = 0;

  function mostrarPaginaProdutos() {

    for (var i = 0; i < paginasProdutos.length; i++) {
      paginasProdutos[i].hidden = (i !== paginaProdutoAtual);
    }

    botaoPaginaAnterior.disabled = (paginaProdutoAtual === 0);
    botaoPaginaProxima.disabled = (paginaProdutoAtual === paginasProdutos.length - 1);

  }

  botaoPaginaAnterior.addEventListener('click', function () {

    if (paginaProdutoAtual > 0) {
      paginaProdutoAtual--;
      mostrarPaginaProdutos();
    }

  });

  botaoPaginaProxima.addEventListener('click', function () {

    if (paginaProdutoAtual < paginasProdutos.length - 1) {
      paginaProdutoAtual++;
      mostrarPaginaProdutos();
    }

  });

  mostrarPaginaProdutos();

}


/* ---------- 19. MINHA CONTA: ABAS INTERNAS (sem recarregar a página) ----------
   Botões <button data-account-tab="pedidos"> mostram o painel <section id="painel-pedidos">.
   Também funcionam: setas do teclado, links diretos (minha-conta.html#pedidos) e
   botões <button data-go-tab="cupons"> espalhados pelo conteúdo (ex.: "Ver todos"). */
var abasConta = document.querySelectorAll('[data-account-tab]');

if (abasConta.length > 0) {
  var paineisConta = document.querySelectorAll('.account-panel');

  function nomeAbaValido(nome) {
    for (var i = 0; i < abasConta.length; i++) {
      if (abasConta[i].getAttribute('data-account-tab') === nome) { return nome; }
    }
    return abasConta[0].getAttribute('data-account-tab');
  }

  function ativarAbaConta(nome, atualizarEndereco) {
    nome = nomeAbaValido(nome);

    for (var i = 0; i < abasConta.length; i++) {
      var ativa = abasConta[i].getAttribute('data-account-tab') === nome;

      abasConta[i].classList.toggle('is-active', ativa);
      abasConta[i].setAttribute('aria-selected', String(ativa));
      abasConta[i].setAttribute('tabindex', ativa ? '0' : '-1');
    }

    for (var j = 0; j < paineisConta.length; j++) {
      paineisConta[j].classList.toggle('is-active', paineisConta[j].id === 'painel-' + nome);
    }

    if (atualizarEndereco && window.history && window.history.replaceState) {
      try { window.history.replaceState(null, '', '#' + nome); } catch (erro) { /* sem endereço: tudo bem */ }
    }
  }

  for (var k = 0; k < abasConta.length; k++) {
    abasConta[k].addEventListener('click', function () {
      ativarAbaConta(this.getAttribute('data-account-tab'), true);
    });

    /* Setas, Home e End mudam de aba (padrão de acessibilidade para abas) */
    abasConta[k].addEventListener('keydown', function (evento) {
      var lista = Array.prototype.slice.call(abasConta);
      var posicao = lista.indexOf(this);
      var destino = -1;

      if (evento.key === 'ArrowDown' || evento.key === 'ArrowRight') { destino = (posicao + 1) % lista.length; }
      if (evento.key === 'ArrowUp' || evento.key === 'ArrowLeft') { destino = (posicao - 1 + lista.length) % lista.length; }
      if (evento.key === 'Home') { destino = 0; }
      if (evento.key === 'End') { destino = lista.length - 1; }

      if (destino > -1) {
        evento.preventDefault();
        lista[destino].focus();
        ativarAbaConta(lista[destino].getAttribute('data-account-tab'), true);
      }
    });
  }

  var botoesIrParaAba = document.querySelectorAll('[data-go-tab]');

  for (var m = 0; m < botoesIrParaAba.length; m++) {
    botoesIrParaAba[m].addEventListener('click', function () {
      var destinoAba = nomeAbaValido(this.getAttribute('data-go-tab'));

      ativarAbaConta(destinoAba, true);
      document.getElementById('painel-' + destinoAba).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* Abre a aba indicada na URL (#pedidos, #cupons, #ajuda) ou o Resumo */
  ativarAbaConta(window.location.hash.replace('#', ''), false);

  window.addEventListener('hashchange', function () {
    ativarAbaConta(window.location.hash.replace('#', ''), false);
  });
}


/* ---------- 20. ADMIN: CUPONS PROMOCIONAIS (LocalStorage) ----------
   Só roda em cupons-admin.html (elemento com data-coupon-admin).
   O admin cria, ativa/desativa, expira, reativa e exclui cupons. Tudo fica salvo no
   navegador (chave axis_admin_cupons_v1). Se o navegador bloquear o localStorage, a
   lista funciona normalmente, mas volta ao exemplo ao recarregar a página.
   Situação do cupom: "ativo", "inativo" ou "expirado". Um cupom cuja validade já passou
   aparece como expirado automaticamente. */
var cupomAdmin = document.querySelector('[data-coupon-admin]');

if (cupomAdmin) {
  var CHAVE_CUPONS = 'axis_admin_cupons_v1';
  var listaCupons = [];
  var filtroCupom = 'todos';
  var buscaCupom = '';

  var corpoCupons = cupomAdmin.querySelector('[data-coupon-list]');
  var avisoVazio = cupomAdmin.querySelector('[data-coupon-empty]');
  var mensagemCupom = cupomAdmin.querySelector('#cupom-msg');
  var formCupom = cupomAdmin.querySelector('#form-cupom');
  var campoCodigo = formCupom.elements['codigo'];
  var campoTipo = formCupom.elements['tipo'];
  var campoValor = formCupom.elements['valor'];
  var campoValidade = formCupom.elements['validade'];

  function doisDigitos(n) { return (n < 10 ? '0' : '') + n; }

  function dataParaISO(data) {
    return data.getFullYear() + '-' + doisDigitos(data.getMonth() + 1) + '-' + doisDigitos(data.getDate());
  }

  function hojeISO() { return dataParaISO(new Date()); }

  function somarDias(iso, dias) {
    var partes = iso.split('-');
    var data = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]) + dias);
    return dataParaISO(data);
  }

  function formatarData(iso) {
    var partes = iso.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
  }

  function formatarReais(numero) {
    return 'R$ ' + Number(numero).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function cuponsExemplo() {
    return [
      { id: 'c1', codigo: 'AXIS10', descricao: '10% em acessórios', tipo: 'percentual', valor: 10, minimo: 0, validade: '2026-11-30', limite: 500, usos: 214, status: 'ativo' },
      { id: 'c2', codigo: 'FRETEGRATIS', descricao: 'Frete grátis em compras acima de R$ 299', tipo: 'frete', valor: 0, minimo: 299, validade: '2026-12-15', limite: 0, usos: 389, status: 'ativo' },
      { id: 'c3', codigo: 'BEMVINDO10', descricao: '10% na primeira compra', tipo: 'percentual', valor: 10, minimo: 0, validade: '2026-12-31', limite: 0, usos: 1204, status: 'ativo' },
      { id: 'c4', codigo: 'BLACKAXIS25', descricao: 'Black Friday: 25% em eletrônicos', tipo: 'percentual', valor: 25, minimo: 500, validade: '2026-11-30', limite: 300, usos: 0, status: 'inativo' },
      { id: 'c5', codigo: 'NOTE15', descricao: '15% em notebooks', tipo: 'percentual', valor: 15, minimo: 0, validade: '2026-11-08', limite: 200, usos: 87, status: 'ativo' },
      { id: 'c6', codigo: 'VERAO20', descricao: '20% em ventiladores e acessórios', tipo: 'percentual', valor: 20, minimo: 0, validade: '2026-02-28', limite: 0, usos: 342, status: 'ativo' },
      { id: 'c7', codigo: 'CONSUMIDOR15', descricao: '15% no Dia do Consumidor', tipo: 'percentual', valor: 15, minimo: 0, validade: '2026-03-15', limite: 0, usos: 518, status: 'ativo' }
    ];
  }

  function carregarCupons() {
    try {
      var texto = window.localStorage.getItem(CHAVE_CUPONS);
      var dados = texto ? JSON.parse(texto) : null;
      if (Array.isArray(dados)) { return dados; }
    } catch (erro) { /* storage bloqueado ou JSON inválido: usa o exemplo */ }
    return cuponsExemplo();
  }

  function salvarCupons() {
    try { window.localStorage.setItem(CHAVE_CUPONS, JSON.stringify(listaCupons)); } catch (erro) { /* sem storage: tudo bem */ }
  }

  function situacaoCupom(cupom) {
    if (cupom.status === 'expirado') { return 'expirado'; }
    if (cupom.validade && cupom.validade < hojeISO()) { return 'expirado'; }
    return cupom.status;
  }

  function descreverBeneficio(cupom) {
    var texto = cupom.tipo === 'percentual' ? cupom.valor + '% de desconto'
      : cupom.tipo === 'fixo' ? formatarReais(cupom.valor) + ' de desconto'
      : 'Frete grátis';
    if (cupom.minimo > 0) { texto += ' · pedido mín. ' + formatarReais(cupom.minimo); }
    return texto;
  }

  function mostrarMensagem(texto, tipo) {
    mensagemCupom.textContent = texto;
    mensagemCupom.className = 'coupon-msg' + (tipo ? ' coupon-msg--' + tipo : '');
  }

  function criarCelula(linha, rotulo) {
    var celula = document.createElement('td');
    celula.setAttribute('data-label', rotulo);
    linha.appendChild(celula);
    return celula;
  }

  function criarBotao(texto, acao, id, classe, rotuloAria) {
    var botao = document.createElement('button');
    botao.type = 'button';
    botao.className = classe;
    botao.textContent = texto;
    botao.setAttribute('data-acao', acao);
    botao.setAttribute('data-id', id);
    botao.setAttribute('aria-label', rotuloAria);
    return botao;
  }

  function desenharCupons() {
    var contagem = { todos: listaCupons.length, ativo: 0, inativo: 0, expirado: 0 };
    var mostrados = 0;

    corpoCupons.innerHTML = '';

    for (var i = 0; i < listaCupons.length; i++) {
      var cupom = listaCupons[i];
      var situacao = situacaoCupom(cupom);
      contagem[situacao]++;

      var passaFiltro = filtroCupom === 'todos' || filtroCupom === situacao;
      var passaBusca = buscaCupom === '' || cupom.codigo.toLowerCase().indexOf(buscaCupom) > -1 || (cupom.descricao || '').toLowerCase().indexOf(buscaCupom) > -1;
      if (!passaFiltro || !passaBusca) { continue; }
      mostrados++;

      var linha = document.createElement('tr');

      var celCodigo = criarCelula(linha, 'Código');
      var forte = document.createElement('strong');
      forte.className = 'coupon-code';
      forte.textContent = cupom.codigo;
      celCodigo.appendChild(forte);
      if (cupom.descricao) {
        celCodigo.appendChild(document.createElement('br'));
        var pequeno = document.createElement('small');
        pequeno.textContent = cupom.descricao;
        celCodigo.appendChild(pequeno);
      }

      criarCelula(linha, 'Benefício').textContent = descreverBeneficio(cupom);

      var celValidade = criarCelula(linha, 'Validade');
      celValidade.textContent = cupom.validade ? formatarData(cupom.validade) : 'Sem validade';
      if (cupom.status === 'expirado' && cupom.expiradoEm) {
        celValidade.appendChild(document.createElement('br'));
        var aviso = document.createElement('small');
        aviso.textContent = 'Expirado manualmente em ' + formatarData(cupom.expiradoEm);
        celValidade.appendChild(aviso);
      }

      criarCelula(linha, 'Usos').textContent = cupom.usos + ' / ' + (cupom.limite > 0 ? cupom.limite : '∞');

      var celStatus = criarCelula(linha, 'Status');
      var selo = document.createElement('span');
      selo.className = 'badge ' + (situacao === 'ativo' ? 'badge--ok' : situacao === 'inativo' ? 'badge--wait' : 'badge--off');
      selo.textContent = situacao === 'ativo' ? 'Ativo' : situacao === 'inativo' ? 'Inativo' : 'Expirado';
      celStatus.appendChild(selo);

      var celAcoes = criarCelula(linha, 'Ações');
      var grupo = document.createElement('div');
      grupo.className = 'staff-actions';
      if (situacao === 'ativo') {
        grupo.appendChild(criarBotao('Desativar', 'desativar', cupom.id, 'button-edit', 'Desativar cupom ' + cupom.codigo));
        grupo.appendChild(criarBotao('Expirar', 'expirar', cupom.id, 'button-edit', 'Expirar cupom ' + cupom.codigo));
      } else if (situacao === 'inativo') {
        grupo.appendChild(criarBotao('Ativar', 'ativar', cupom.id, 'button-edit', 'Ativar cupom ' + cupom.codigo));
        grupo.appendChild(criarBotao('Expirar', 'expirar', cupom.id, 'button-edit', 'Expirar cupom ' + cupom.codigo));
      } else {
        grupo.appendChild(criarBotao('Reativar', 'reativar', cupom.id, 'button-edit', 'Reativar cupom ' + cupom.codigo + ' por mais 30 dias'));
      }
      grupo.appendChild(criarBotao('Copiar', 'copiar', cupom.id, 'button-edit', 'Copiar código ' + cupom.codigo));
      grupo.appendChild(criarBotao('Excluir', 'excluir', cupom.id, 'button-delete', 'Excluir cupom ' + cupom.codigo));
      celAcoes.appendChild(grupo);

      corpoCupons.appendChild(linha);
    }

    avisoVazio.hidden = mostrados > 0;

    var chaves = ['todos', 'ativo', 'inativo', 'expirado'];
    for (var k = 0; k < chaves.length; k++) {
      var contadores = cupomAdmin.querySelectorAll('[data-coupon-count="' + chaves[k] + '"]');
      for (var m = 0; m < contadores.length; m++) { contadores[m].textContent = contagem[chaves[k]]; }
    }
  }

  function acharCupom(id) {
    for (var i = 0; i < listaCupons.length; i++) {
      if (listaCupons[i].id === id) { return i; }
    }
    return -1;
  }

  /* Botões da tabela (Ativar, Desativar, Expirar, Reativar, Copiar, Excluir) */
  corpoCupons.addEventListener('click', function (evento) {
    var botao = evento.target.closest('button[data-acao]');
    if (!botao) { return; }

    var posicao = acharCupom(botao.getAttribute('data-id'));
    if (posicao < 0) { return; }

    var cupom = listaCupons[posicao];
    var acao = botao.getAttribute('data-acao');

    if (acao === 'copiar') {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cupom.codigo).then(function () {
          mostrarMensagem('Código ' + cupom.codigo + ' copiado.', 'ok');
        }, function () {
          mostrarMensagem('Não foi possível copiar. O código é ' + cupom.codigo + '.', 'erro');
        });
      } else {
        mostrarMensagem('Seu navegador não permite copiar automaticamente. O código é ' + cupom.codigo + '.', 'erro');
      }
      return;
    }

    if (acao === 'excluir') {
      if (!window.confirm('Excluir o cupom ' + cupom.codigo + '? Essa ação não pode ser desfeita.')) { return; }
      listaCupons.splice(posicao, 1);
      mostrarMensagem('Cupom ' + cupom.codigo + ' excluído.', 'ok');
    } else if (acao === 'ativar') {
      cupom.status = 'ativo';
      mostrarMensagem('Cupom ' + cupom.codigo + ' ativado.', 'ok');
    } else if (acao === 'desativar') {
      cupom.status = 'inativo';
      mostrarMensagem('Cupom ' + cupom.codigo + ' desativado.', 'ok');
    } else if (acao === 'expirar') {
      cupom.status = 'expirado';
      cupom.expiradoEm = hojeISO();
      mostrarMensagem('Cupom ' + cupom.codigo + ' expirado.', 'ok');
    } else if (acao === 'reativar') {
      cupom.status = 'ativo';
      delete cupom.expiradoEm;
      if (!cupom.validade || cupom.validade < hojeISO()) { cupom.validade = somarDias(hojeISO(), 30); }
      mostrarMensagem('Cupom ' + cupom.codigo + ' reativado (válido até ' + formatarData(cupom.validade) + ').', 'ok');
    }

    salvarCupons();
    desenharCupons();
  });

  /* Filtros por situação e busca */
  var botoesFiltroCupom = cupomAdmin.querySelectorAll('[data-coupon-filter]');

  for (var f = 0; f < botoesFiltroCupom.length; f++) {
    botoesFiltroCupom[f].addEventListener('click', function () {
      filtroCupom = this.getAttribute('data-coupon-filter');
      for (var g = 0; g < botoesFiltroCupom.length; g++) { botoesFiltroCupom[g].classList.remove('is-active'); }
      this.classList.add('is-active');
      desenharCupons();
    });
  }

  cupomAdmin.querySelector('[data-coupon-search]').addEventListener('input', function () {
    buscaCupom = this.value.toLowerCase().trim();
    desenharCupons();
  });

  /* Formulário: código sempre em maiúsculas e sem símbolos; valor some no frete grátis */
  campoCodigo.addEventListener('input', function () {
    this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  });

  function ajustarCampoValor() {
    var frete = campoTipo.value === 'frete';
    campoValor.disabled = frete;
    if (frete) { campoValor.value = ''; }
    campoValor.placeholder = campoTipo.value === 'percentual' ? 'Ex.: 10 (de 1 a 100)' : 'Ex.: 50,00';
    campoValor.max = campoTipo.value === 'percentual' ? '100' : '';
  }

  campoTipo.addEventListener('change', ajustarCampoValor);
  campoValidade.min = hojeISO();
  ajustarCampoValor();

  /* O botão "Limpar" apaga a mensagem; o reset feito pelo próprio código (após criar) não apaga */
  var resetPeloCodigo = false;

  formCupom.addEventListener('reset', function () {
    var manterMensagem = resetPeloCodigo;
    resetPeloCodigo = false;
    window.setTimeout(function () {
      ajustarCampoValor();
      if (!manterMensagem) { mostrarMensagem('', ''); }
    }, 0);
  });

  formCupom.addEventListener('submit', function (evento) {
    evento.preventDefault();

    var codigo = campoCodigo.value.trim();
    var tipo = campoTipo.value;
    var valor = parseFloat(String(campoValor.value).replace(',', '.'));
    var minimo = parseFloat(String(formCupom.elements['minimo'].value).replace(',', '.'));
    var limite = parseInt(formCupom.elements['limite'].value, 10);
    var validade = campoValidade.value;

    if (!/^[A-Z0-9]{4,20}$/.test(codigo)) { mostrarMensagem('O código precisa ter de 4 a 20 letras ou números (sem espaços).', 'erro'); campoCodigo.focus(); return; }

    for (var i = 0; i < listaCupons.length; i++) {
      if (listaCupons[i].codigo === codigo) { mostrarMensagem('Já existe um cupom com o código ' + codigo + '.', 'erro'); campoCodigo.focus(); return; }
    }

    if (tipo !== 'frete') {
      if (isNaN(valor) || valor <= 0) { mostrarMensagem('Informe um valor de desconto maior que zero.', 'erro'); campoValor.focus(); return; }
      if (tipo === 'percentual' && valor > 100) { mostrarMensagem('O desconto percentual não pode passar de 100%.', 'erro'); campoValor.focus(); return; }
    }

    if (!validade) { mostrarMensagem('Escolha a data de validade.', 'erro'); campoValidade.focus(); return; }
    if (validade < hojeISO()) { mostrarMensagem('A validade não pode ser uma data que já passou.', 'erro'); campoValidade.focus(); return; }

    listaCupons.unshift({
      id: 'c' + new Date().getTime(),
      codigo: codigo,
      descricao: formCupom.elements['descricao'].value.trim(),
      tipo: tipo,
      valor: tipo === 'frete' ? 0 : valor,
      minimo: isNaN(minimo) || minimo < 0 ? 0 : minimo,
      validade: validade,
      limite: isNaN(limite) || limite < 0 ? 0 : limite,
      usos: 0,
      status: formCupom.elements['ativo'].checked ? 'ativo' : 'inativo'
    });

    salvarCupons();
    desenharCupons();
    resetPeloCodigo = true;
    formCupom.reset();
    mostrarMensagem('Cupom ' + codigo + ' criado com sucesso.', 'ok');
  });

  cupomAdmin.querySelector('[data-coupon-reset]').addEventListener('click', function () {
    if (!window.confirm('Restaurar os cupons de exemplo? Os cupons criados por você serão apagados.')) { return; }
    listaCupons = cuponsExemplo();
    salvarCupons();
    desenharCupons();
    mostrarMensagem('Cupons de exemplo restaurados.', 'ok');
  });

  listaCupons = carregarCupons();
  desenharCupons();
}
