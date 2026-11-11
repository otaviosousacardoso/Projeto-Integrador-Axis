/* ==========================================================================
   AXIS - JAVASCRIPT BÁSICO DO SITE
   Só interações simples de front-end (sem banco de dados, sem localStorage,
   sem fetch). Todas as páginas carregam este arquivo no fim do <body>.
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
   se ele está aberto (aria-expanded). */


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
   <button class="tab-btn" data-tab="id-do-painel"> mostra o <div class="tab-panel" id="id-do-painel">. */
var botoesAba = document.querySelectorAll('[data-tab]');

for (var a = 0; a < botoesAba.length; a++) {
  botoesAba[a].addEventListener('click', function () {
    var paineis = document.querySelectorAll('.tab-panel');
    var abas = document.querySelectorAll('[data-tab]');

    for (var p = 0; p < paineis.length; p++) { paineis[p].classList.remove('is-active'); }
    for (var b = 0; b < abas.length; b++) { abas[b].classList.remove('is-active'); }

    document.querySelector('#' + this.getAttribute('data-tab')).classList.add('is-active');
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

    document.querySelector('[data-offers-count]').textContent = visiveis + ' ofertas encontradas';
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


