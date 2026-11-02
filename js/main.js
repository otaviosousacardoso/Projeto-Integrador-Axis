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
var menuToggle = document.querySelector('.menu-toggle');
var siteMenu = document.querySelector('#site-menu');

if (menuToggle && siteMenu) {
  menuToggle.addEventListener('click', function () {
    var aberto = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!aberto));
    siteMenu.hidden = aberto;
  });
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
   funcionario@axis.com / 1234567 -> dashboard.html
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
        window.location.href = (email === 'admin@axis.com') ? 'admin.html' : 'dashboard.html';
      } else {
        erro.hidden = false;
      }
    }
  });
}
