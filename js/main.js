/* ==========================================================================
   AXIS - JAVASCRIPT ÚNICO DO SITE
   Todas as páginas carregam este arquivo no fim do <body>. Como nem toda
   página tem todos os elementos, cada bloco só roda se achar o que precisa
   (ex.: o carrossel só existe na home, o carrinho só em carrinho.html).

   Ordem do arquivo:
   1. Elementos usados em várias páginas ..... login (modal), menu do cabeçalho
   2. Ajustes de layout ...................... alinhamento dos conteúdos ao cabeçalho
   3. Carrossel de ofertas ................... index.html
   4. Formulários ............................ login, cadastro e recuperar senha
   5. Carrinho ............................... carrinho.html
   6. Pagamento .............................. pagamento.html
   7. Funcionário ............................ funcionario.html
   ========================================================================== */

/* ---------- 1. ELEMENTOS COMPARTILHADOS ----------
   Podem não existir na página atual (por isso os "if" mais abaixo). */
const loginDialog = document.querySelector('#login-dialog');
const loginTrigger = document.querySelector('[data-open-login]');
const closeLoginButton = document.querySelector('[data-close-login]');
const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('#site-menu');

/* ---------- 2. AJUSTES DE LAYOUT (todas as páginas) ----------
   Injeta uma folha de estilo no <head> para manter o conteúdo de produtos, ajuda
   e minha conta alinhado com a mesma margem lateral do cabeçalho (3rem no desktop,
   2rem no tablet e 1,25rem no celular). Como é injetado depois do style.css,
   estas margens laterais têm prioridade sobre as do CSS. */
const layoutFixes = document.createElement('style');
layoutFixes.textContent = `
  .topbar, .site-menu { width: min(100%, 1680px); }
  .topbar, .site-menu { padding-left: 3rem; padding-right: 3rem; }
  .products-main, .help-main { width: min(100%, 1680px); }
  .products-main { padding-left: 3rem; padding-right: 3rem; }
  .help-main { padding-left: 3rem; padding-right: 3rem; }
  .account-main { width: min(100%, 1680px); padding-left: 3rem; padding-right: 3rem; }
  @media (max-width: 1100px) {
    .topbar, .site-menu, .products-main, .help-main, .account-main { padding-left: 2rem; padding-right: 2rem; }
  }
  @media (max-width: 720px) {
    .topbar { padding-left: 1.15rem; padding-right: 1.15rem; }
    .site-menu, .products-main, .help-main, .account-main { padding-left: 1.25rem; padding-right: 1.25rem; }
  }
`;
document.head.appendChild(layoutFixes);

/* Home: clicar no ícone de usuário abre a janelinha (modal) de login em vez de mudar de página.
   Se o JavaScript falhar, o link continua levando para login.html. */
if (loginDialog && loginTrigger) {
  loginTrigger.addEventListener('click', (event) => {
    event.preventDefault();
    loginDialog.showModal();
    loginDialog.querySelector('input')?.focus();
  });
}

/* Fecha a janelinha de login pelo "×" ou clicando na área escura ao redor */
if (loginDialog && closeLoginButton) {
  closeLoginButton.addEventListener('click', () => loginDialog.close());
  loginDialog.addEventListener('click', (event) => { if (event.target === loginDialog) loginDialog.close(); });
}

/* Menu do cabeçalho (todas as páginas): o ícone de hambúrguer mostra/esconde o menu
   e avisa os leitores de tela se ele está aberto (aria-expanded). */
if (menuToggle && siteMenu) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    siteMenu.hidden = isExpanded;
  });
}

/* ---------- 3. CARROSSEL DE OFERTAS (index.html) ----------
   Troca sozinho a cada 5s o texto, a imagem e o botão do banner. Também responde
   a setas, bolinhas, teclado (← →) e arrastar o dedo no celular. */
const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const slide = carousel.querySelector('[data-carousel-slide]');
  const eyebrow = carousel.querySelector('[data-carousel-eyebrow]');
  const title = carousel.querySelector('[data-carousel-title]');
  const description = carousel.querySelector('[data-carousel-description]');
  const link = carousel.querySelector('[data-carousel-link]');
  const image = carousel.querySelector('[data-carousel-image]');
  const badge = carousel.querySelector('[data-carousel-badge]');
  const dots = carousel.querySelector('[data-carousel-dots]');
  const progress = carousel.querySelector('[data-carousel-progress]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* As 5 ofertas do banner: para mudar um texto, imagem ou link, edite aqui */
  const offers = [
    { eyebrow: 'Bem-vindo à AXIS', title: 'Tecnologia que<br>mudará <span>o seu mundo</span>', description: 'O melhor em hardware e gadgets com entrega relâmpago', text: 'Ver ofertas', link: 'produtos.html?ofertas=1', image: 'assets/images/mascot/robot-banner.png', alt: 'Mascote robô da AXIS', badge: 'Ofertas especiais' },
    { eyebrow: 'Oferta da semana', title: 'Seu novo celular<br>com <span>preço incrível</span>', description: 'Desempenho, câmera e conectividade para acompanhar sua rotina', text: 'Ver smartphones', link: 'produtos.html?categoria=smartphones', image: 'assets/images/products/product-phone.png', alt: 'Smartphone em destaque', badge: 'Até 20% OFF' },
    { eyebrow: 'Som que impressiona', title: 'Mergulhe em um<br>mundo de <span>áudio</span>', description: 'Fones e equipamentos para ouvir cada detalhe com qualidade', text: 'Explorar áudio', link: 'produtos.html?categoria=audio', image: 'assets/images/products/product-headphone.png', alt: 'Fone de ouvido em destaque', badge: 'Frete grátis' },
    { eyebrow: 'Para maratonar', title: 'Sua diversão<br>em <span>tela grande</span>', description: 'Encontre a TV ideal para filmes, séries, games e muito mais', text: 'Ver televisores', link: 'produtos.html?categoria=televisores', image: 'assets/images/products/product-tv.png', alt: 'Televisão em destaque', badge: 'Oferta relâmpago' },
    { eyebrow: 'Performance AXIS', title: 'Mais potência<br>para <span>suas ideias</span>', description: 'Monte seu setup com máquinas prontas para trabalho e criação', text: 'Conhecer PCs', link: 'produtos.html?categoria=pcs', image: 'assets/images/products/product-pc.png', alt: 'Computador em destaque', badge: 'Monte seu setup' }
  ];
  /* Controle do carrossel: qual oferta está na tela e os temporizadores */
  let current = 0;
  let timer;
  let changeTimer;

  /* Cria as setas ‹ › por JavaScript e as coloca dentro do banner (sem círculos ou fundo sobre o conteúdo) */
  const previousArrow = document.createElement('button');
  const nextArrow = document.createElement('button');
  previousArrow.className = 'carousel-arrow carousel-arrow--previous';
  nextArrow.className = 'carousel-arrow carousel-arrow--next';
  previousArrow.type = nextArrow.type = 'button';
  previousArrow.innerHTML = '&#10094;';
  nextArrow.innerHTML = '&#10095;';
  previousArrow.setAttribute('aria-label', 'Oferta anterior');
  nextArrow.setAttribute('aria-label', 'Próxima oferta');
  slide.append(previousArrow, nextArrow);

  /* Estilo das setas: transparentes, sobre o banner, ficam laranja ao passar o mouse */
  const carouselFixes = document.createElement('style');
  carouselFixes.textContent = `
    .hero .carousel-arrow {
      position: absolute;
      top: 50%;
      z-index: 5;
      display: grid;
      width: 2.5rem;
      height: 5rem;
      padding: 0;
      place-items: center;
      transform: translateY(-50%);
      background: transparent;
      border: 0;
      border-radius: 0;
      color: #FFFFFF;
      font-size: 2.6rem;
      line-height: 1;
      text-shadow: 0 2px 5px rgba(0, 0, 0, .75);
    }
    .hero .carousel-arrow:hover:not(:disabled),
    .hero .carousel-arrow:focus-visible {
      background: transparent;
      color: #FF6B00;
      transform: translateY(-50%) scale(1.12);
    }
    .hero .carousel-arrow--previous { left: .7rem; }
    .hero .carousel-arrow--next { right: .7rem; }
    @media (max-width: 720px) { .hero .carousel-arrow { display: none; } }
  `;
  document.head.appendChild(carouselFixes);

  /* Cria uma bolinha (tab) para cada oferta */
  offers.forEach((offer, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Mostrar oferta ${index + 1}: ${offer.eyebrow}`);
    dot.addEventListener('click', () => { goTo(index); startAutoPlay(); });
    dots.appendChild(dot);
  });

  /* Desenha na tela a oferta escolhida: textos, imagem, link, selo e bolinha ativa; reinicia a barrinha de progresso */
  function renderOffer(index) {
    const offer = offers[index];
    eyebrow.textContent = offer.eyebrow;
    title.innerHTML = offer.title;
    description.textContent = offer.description;
    link.href = offer.link;
    link.textContent = offer.text;
    image.src = offer.image;
    image.alt = offer.alt;
    badge.textContent = offer.badge;
    slide.setAttribute('aria-label', `Oferta ${index + 1} de ${offers.length}`);
    dots.querySelectorAll('.carousel-dot').forEach((dot, dotIndex) => {
      dot.setAttribute('aria-selected', String(dotIndex === index));
      dot.tabIndex = dotIndex === index ? 0 : -1;
    });
    progress.classList.remove('is-running');
    void progress.offsetWidth;
    if (!reduceMotion) progress.classList.add('is-running');
  }

  /* Vai para uma oferta (dando a volta no fim/início da lista) com um leve efeito de fade */
  function goTo(index) {
    current = (index + offers.length) % offers.length;
    carousel.classList.add('is-changing');
    window.clearTimeout(changeTimer);
    changeTimer = window.setTimeout(() => { renderOffer(current); carousel.classList.remove('is-changing'); }, reduceMotion ? 0 : 120);
  }

  /* Troca automática a cada 5s (desligada para quem prefere menos animação) */
  function startAutoPlay() {
    window.clearInterval(timer);
    if (!reduceMotion) timer = window.setInterval(() => goTo(current + 1), 5000);
  }

  /* Cliques nas setas */
  previousArrow.addEventListener('click', () => { goTo(current - 1); startAutoPlay(); });
  nextArrow.addEventListener('click', () => { goTo(current + 1); startAutoPlay(); });

  /* Celular: arrastar para o lado troca de oferta. Também pausa o autoplay com mouse/foco e aceita as setas do teclado. */
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
  carousel.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(distance) < 45) return;
    goTo(current + (distance < 0 ? 1 : -1));
    startAutoPlay();
  }, { passive: true });
  carousel.addEventListener('mouseenter', () => window.clearInterval(timer));
  carousel.addEventListener('mouseleave', startAutoPlay);
  carousel.addEventListener('focusin', () => window.clearInterval(timer));
  carousel.addEventListener('focusout', (event) => { if (!carousel.contains(event.relatedTarget)) startAutoPlay(); });
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(current + 1); startAutoPlay(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(current - 1); startAutoPlay(); }
  });
  renderOffer(current);
  startAutoPlay();
}

/* ---------- 4. FORMULÁRIOS (login, cadastro, recuperar senha, pagamento) ----------
   Ainda não há back-end: as validações usam o próprio navegador e depois
   o site apenas "finge" o próximo passo. */

/* Mostra uma mensagem (erro/sucesso/aviso) dentro de um <p> que começa escondido */
function showMessage(element, message) {
  if (!element) return;
  element.textContent = message;
  element.hidden = false;
}

/* Login (janelinha da home e login.html): valida e vai para minha-conta.html */
document.querySelectorAll('[data-login-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = form.querySelector('[data-login-message]');
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (message) message.hidden = true;
    window.location.assign('minha-conta.html');
  });
});

/* Cadastro (cadastro.html): confere se as duas senhas são iguais e vai para minha-conta.html */
const registerForm = document.querySelector('[data-register-form]');
if (registerForm) {
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const password = registerForm.querySelector('#register-password');
    const confirmation = registerForm.querySelector('#register-confirmation');
    const message = registerForm.querySelector('[data-register-message]');
    if (!registerForm.checkValidity()) { registerForm.reportValidity(); return; }
    if (password.value !== confirmation.value) { showMessage(message, 'As senhas precisam ser iguais.'); confirmation.focus(); return; }
    window.location.assign('minha-conta.html');
  });
}

/* Recuperar senha (recuperar-senha.html): mostra uma mensagem neutra, sem dizer se o e-mail existe */
const recoveryForm = document.querySelector('[data-recovery-form]');
if (recoveryForm) {
  recoveryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = recoveryForm.querySelector('[data-recovery-message]');
    if (!recoveryForm.checkValidity()) { recoveryForm.reportValidity(); return; }
    showMessage(message, 'Se este e-mail estiver cadastrado, você receberá as instruções de recuperação.');
  });
}


/* ---------- 5. CARRINHO (carrinho.html) ----------
   O cliente escolhe UM produto (bolinha) e o resumo à direita mostra subtotal e total.
   Sem produto escolhido, o resumo fica escondido. */
const cartItems = document.querySelectorAll('.cart-item');

if (cartItems.length) {
  const cartSummary = document.querySelector('#cart-summary');
  const summarySubtotal = document.querySelector('#summary-subtotal');
  const summaryTotal = document.querySelector('#summary-total');

  /* Transforma 249.9 em "R$ 249,90" */
  const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  /* Mostra/esconde o resumo e atualiza os valores conforme o produto marcado.
     O preço vem do atributo data-price do cartão no HTML. */
  function updateCartSummary() {
    const selected = document.querySelector('.product-check:checked');

    if (!selected) {
      cartSummary.hidden = true;
      return;
    }

    const price = Number(selected.closest('.cart-item').dataset.price);
    cartSummary.hidden = false;
    summarySubtotal.textContent = formatCurrency(price);
    summaryTotal.textContent = formatCurrency(price);
  }

  cartItems.forEach((item) => {
    const radio = item.querySelector('.product-check');
    const removeButton = item.querySelector('.cart-item__remove');

    /* Clicar em qualquer parte do cartão marca o produto (menos em botões, links e no próprio campo) */
    item.addEventListener('click', (event) => {
      if (event.target.closest('input, button, a')) return;
      radio.checked = true;
      updateCartSummary();
    });

    radio.addEventListener('change', updateCartSummary);

    /* Lixeira: tira o produto da lista e recalcula o resumo */
    removeButton.addEventListener('click', () => {
      item.remove();
      updateCartSummary();
    });
  });

  updateCartSummary();
}


/* ---------- 6. PAGAMENTO (pagamento.html) ----------
   Confere endereço, CEP e forma de pagamento (validação do navegador), mostra
   um aviso conforme o método escolhido e leva para pedido-confirmado.html.
   Ainda é uma simulação: não há cobrança real. */
const paymentForm = document.querySelector('#form-pagamento');

if (paymentForm) {
  const paymentMessage = document.querySelector('#mensagem');
  const paymentSubmit = document.querySelector('button[form="form-pagamento"]');

  const paymentNotices = {
    pix: 'PIX selecionado. Confirmando o pagamento...',
    cartao: 'Cartão de crédito selecionado. Processando o pagamento...'
  };

  paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!paymentForm.checkValidity()) { paymentForm.reportValidity(); return; }

    const method = paymentForm.querySelector('input[name="pagamento"]:checked').value;
    showMessage(paymentMessage, paymentNotices[method]);

    /* Trava o botão para não enviar duas vezes e segue para a confirmação */
    if (paymentSubmit) paymentSubmit.disabled = true;
    window.setTimeout(() => window.location.assign('pedido-confirmado.html'), 1500);
  });
}
/* 7. PAINEL DO FUNCIONÁRIO: upload de imagem com pré-visualização (funcionario.html) */
const productForm = document.querySelector('[data-product-form]');

if (productForm) {
  const fileInput = productForm.querySelector('input[type="file"]');
  const uploadText = productForm.querySelector('[data-upload-text]');
  const preview = productForm.querySelector('[data-upload-preview]');
  const uploadMessage = productForm.querySelector('[data-upload-message]');

  function mostrarImagem(file) {
    const url = URL.createObjectURL(file);
    preview.src = url;
    preview.hidden = false;
    uploadText.hidden = true;
    uploadMessage.hidden = true;
  }

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) mostrarImagem(file);
  });

  productForm.addEventListener('reset', () => {
    preview.hidden = true;
    uploadText.hidden = false;
    uploadMessage.hidden = true;
  });

  productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!productForm.checkValidity()) {
      productForm.reportValidity();
      return;
    }
    showMessage(uploadMessage, 'Produto salvo com sucesso!');
    uploadMessage.classList.add('form-message--success');
  });
}

let estrelasSelecionadas = 0;
let produtoAtual = "";


/* =========================================
   ABRIR AVALIAÇÃO
   ========================================= */

function abrirAvaliacao(nome, imagem, data) {

    produtoAtual = nome;

    document.getElementById("imagemAvaliacao").src = imagem;
    document.getElementById("imagemAvaliacao").alt = nome;

    document.getElementById("nomeAvaliacao").textContent = nome;
    document.getElementById("dataAvaliacao").textContent = data;

    const avaliacaoSalva =
        JSON.parse(localStorage.getItem("avaliacao_" + nome));

    if (avaliacaoSalva) {

        estrelasSelecionadas = avaliacaoSalva.estrelas;

        document.getElementById("comentarioAvaliacao").value =
            avaliacaoSalva.comentario;

        atualizarEstrelas();

    } else {

        estrelasSelecionadas = 0;

        document.getElementById("comentarioAvaliacao").value = "";

        document.querySelectorAll("#estrelasAvaliacao button")
            .forEach(function(estrela) {
                estrela.classList.remove("selecionada");
            });
    }

    document.getElementById("modalAvaliacao").style.display = "flex";
}


/* =========================================
   SELECIONAR ESTRELA
   ========================================= */

function selecionarEstrela(numero) {

    estrelasSelecionadas = numero;

    atualizarEstrelas();

}


/* =========================================
   ATUALIZAR ESTRELAS
   ========================================= */

function atualizarEstrelas() {

    const estrelas =
        document.querySelectorAll("#estrelasAvaliacao button");

    estrelas.forEach(function(estrela, indice) {

        if (indice < estrelasSelecionadas) {
            estrela.classList.add("selecionada");
        } else {
            estrela.classList.remove("selecionada");
        }

    });
}


/* =========================================
   ENVIAR AVALIAÇÃO
   ========================================= */

function enviarAvaliacao() {

    if (estrelasSelecionadas === 0) {

        alert("Escolha uma quantidade de estrelas.");

        return;
    }

    const comentario =
        document.getElementById("comentarioAvaliacao").value;

    const avaliacao = {

        estrelas: estrelasSelecionadas,

        comentario: comentario

    };

    localStorage.setItem(
        "avaliacao_" + produtoAtual,
        JSON.stringify(avaliacao)
    );

    alert("Avaliação salva!");

    fecharAvaliacao();

}


/* =========================================
   FECHAR AVALIAÇÃO
   ========================================= */

function fecharAvaliacao() {

    document.getElementById("modalAvaliacao").style.display = "none";

}

/* CANCELAMENTO*/

function abrirCancelamento(nome, imagem) {

    document.getElementById("tituloCancelamento").textContent =
        "Cancelar Pedido";

    document.getElementById("imagemCancelamento").src = imagem;

    document.getElementById("imagemCancelamento").alt = nome;

    document.getElementById("nomeCancelamento").textContent = nome;

    document
        .querySelectorAll("#modalCancelamento input[name='formaReembolso']")
        .forEach(function(input) {
            input.checked = false;
        });

    document.getElementById("modalCancelamento").style.display = "flex";
}


function abrirReembolso(nome, imagem) {

    document.getElementById("tituloCancelamento").textContent =
        "Reembolso";

    document.getElementById("imagemCancelamento").src = imagem;

    document.getElementById("imagemCancelamento").alt = nome;

    document.getElementById("nomeCancelamento").textContent = nome;

    document
        .querySelectorAll("#modalCancelamento input[name='formaReembolso']")
        .forEach(function(input) {
            input.checked = false;
        });

    document.getElementById("modalCancelamento").style.display = "flex";
}


function fecharCancelamento() {

    document.getElementById("modalCancelamento").style.display = "none";

}


function confirmarCancelamento() {

    const escolhido = document.querySelector(
        "#modalCancelamento input[name='formaReembolso']:checked"
    );

    if (!escolhido) {
        alert("Escolha a forma do reembolso.");
        return;
    }

    alert("Solicitação confirmada!");

    fecharCancelamento();

}



window.addEventListener("click", function(event) {

    const modalAvaliacao =
        document.getElementById("modalAvaliacao");

    const modalCancelamento =
        document.getElementById("modalCancelamento");

    if (event.target === modalAvaliacao) {
        fecharAvaliacao();
    }

    if (event.target === modalCancelamento) {
        fecharCancelamento();
    }

});
