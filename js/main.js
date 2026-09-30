/* ==========================================================================
   AXIS - JAVASCRIPT ÚNICO DO SITE
   Todas as páginas carregam este arquivo no fim do <body>. Como nem toda
   página tem todos os elementos, cada bloco só roda se achar o que precisa
   (ex.: o carrossel só existe na home, o carrinho só em carrinho.html).

   Ordem do arquivo:
   1. Elementos usados em várias páginas ..... login (modal), menu do cabeçalho
   2. Ajustes de layout ...................... alinhamento dos conteúdos ao cabeçalho
   3. Carrossel de ofertas ................... index.html (banner e carrosséis de produtos)
   4. Formulários ............................ login, cadastro e recuperar senha
   5. Carrinho ............................... carrinho.html
   6. Pagamento .............................. pagamento.html
   7. Funcionário ............................ funcionario.html (dashboard), funcionario-produtos.html (gestão)
                                               e funcionario-produto.html (cadastro e edição)
   8. Página de produto ...................... produto-*.html (galeria, descrição e frete)
   9. Lista de produtos → página do produto .. produtos.html
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

/* ---------- 3.1 CARROSSÉIS DE PRODUTOS (index.html) ----------
   "Produtos em Destaque", "Principais Escolhas" e "Itens em Oferta". A faixa rola de lado
   (também com o dedo ou o mouse) e as setas ‹ › avançam uma "página" de cartões.
   Cada seção tem o seu próprio controle, então as três funcionam de forma independente. */
document.querySelectorAll('[data-product-carousel]').forEach((box) => {
  const track = box.querySelector('[data-product-track]');
  const previousButton = box.querySelector('[data-product-previous]');
  const nextButton = box.querySelector('[data-product-next]');
  const prefersStill = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Desliga a seta quando a faixa chega no começo ou no fim */
  const updateArrows = () => {
    previousButton.disabled = track.scrollLeft <= 1;
    nextButton.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
  };

  /* Avança (1) ou volta (-1) a largura visível da faixa */
  const scrollPage = (direction) => {
    track.scrollBy({ left: direction * track.clientWidth, behavior: prefersStill ? 'auto' : 'smooth' });
  };

  previousButton.addEventListener('click', () => scrollPage(-1));
  nextButton.addEventListener('click', () => scrollPage(1));
  track.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);

  /* Teclado: com o foco dentro do carrossel, as setas ← → trocam de página */
  box.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') scrollPage(-1);
    if (event.key === 'ArrowRight') scrollPage(1);
  });

  updateArrows();
});

/* ---------- 4. FORMULÁRIOS (login, cadastro, recuperar senha, pagamento) ----------
   Ainda não há back-end: as validações usam o próprio navegador e depois
   o site apenas "finge" o próximo passo. */

/* Mostra uma mensagem (erro/sucesso/aviso) dentro de um <p> que começa escondido */
function showMessage(element, message) {
  if (!element) return;
  element.textContent = message;
  element.hidden = false;
}

/* Login (janelinha da home e login.html): valida e vai para minha-conta.html,
   ou para funcionario.html (dashboard) quando o e-mail e a senha forem os do funcionário.
   Esse é o único e-mail de funcionário do sistema. A chave abaixo guarda "quem entrou" até fechar a aba. */
const STAFF_EMAIL = 'funcionario@axis.com';
const STAFF_PASSWORD = '1234567';
const STAFF_SESSION_KEY = 'axis-funcionario';

document.querySelectorAll('[data-login-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = form.querySelector('[data-login-message]');
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (message) message.hidden = true;

    const email = form.querySelector('input[type="email"]').value.trim().toLowerCase();
    const senha = form.querySelector('input[type="password"]').value;

    if (email === STAFF_EMAIL && senha === STAFF_PASSWORD) {
      sessionStorage.setItem(STAFF_SESSION_KEY, 'ok');
      window.location.assign('funcionario.html');
      return;
    }
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
/* ---------- 7. INTRANET DO FUNCIONÁRIO (funcionario*.html) ----------
   Ainda não há back-end: os produtos ficam guardados no navegador (localStorage).
   Na primeira visita o painel começa com os 8 produtos da loja; depois disso,
   tudo que o funcionário cadastra, altera ou remove fica salvo aqui.
   Cada página do painel traz data-staff-page no <body> e só roda o bloco dela. */
const PRODUCTS_KEY = 'axis-produtos';
const STAFF_NOTICE_KEY = 'axis-staff-aviso';
const LOW_STOCK_LIMIT = 5;
const staffPage = document.body.dataset.staffPage;

/* Nomes das categorias (os mesmos dos departamentos da home) */
const categoryNames = {
  smartphones: 'Smartphones', notebooks: 'Notebooks', televisores: 'Televisores', audio: 'Áudio Profissional',
  pcs: 'PCs', tablets: 'Tablets', conectividade: 'Conectividade', acessorios: 'Acessórios'
};

/* Produtos iniciais do painel (os mesmos de produtos.html). Para mudar a lista de partida, edite aqui */
const SEED_PRODUCTS = [
  { id: 1, nome: 'Notebook Lenovo Ideapad 1 R3-7320u 4gb 256gb SSD Linux 15.6', marca: 'Lenovo', categoria: 'notebooks', preco: 3599.90, precoPix: 3419.91, estoque: 18, sku: 'LENO-IDEAPAD1-R3', imagem: 'assets/images/products/product-pc.png', descricao: '', especificacoes: '' },
  { id: 2, nome: 'Smartphone Motorola Moto G35 5g 256gb 12gb Ram Boost, tela 6,7"', marca: 'Motorola', categoria: 'smartphones', preco: 1299.90, precoPix: 1234.91, estoque: 42, sku: 'MOTO-G35-256', imagem: 'assets/images/products/product-phone.png', descricao: '', especificacoes: '' },
  { id: 3, nome: 'Fone de Ouvido JBL Tune 530BT, On-Ear, Bluetooth, Azul', marca: 'JBL', categoria: 'audio', preco: 249.90, precoPix: 237.41, estoque: 67, sku: 'JBL-T530BT-AZUL', imagem: 'assets/images/products/product-headphone.png', descricao: '', especificacoes: '' },
  { id: 4, nome: 'Mouse Sem Fio Logitech M170, 2.4Ghz, Ambidestro, Azul', marca: 'Logitech', categoria: 'acessorios', preco: 59.90, precoPix: 56.91, estoque: 150, sku: 'LOGI-M170-AZUL', imagem: 'assets/images/products/product-mouse.png', descricao: '', especificacoes: '' },
  { id: 5, nome: 'Samsung Smart TV 50" Crystal UHD 4K', marca: 'Samsung', categoria: 'televisores', preco: 2799.90, precoPix: 2659.91, estoque: 9, sku: 'SAMS-TV50-CUHD', imagem: 'assets/images/products/product-tv.png', descricao: '', especificacoes: '' },
  { id: 6, nome: 'Tablet Samsung Galaxy Tab A9 Enterprise Edition', marca: 'Samsung', categoria: 'tablets', preco: 1199.90, precoPix: 1139.91, estoque: 4, sku: 'SAMS-TABA9-ENT', imagem: 'assets/images/products/product-tablet.png', descricao: '', especificacoes: '' },
  { id: 7, nome: 'Smartwatch Redmi Watch 5 Active, Tela 2", Lacre', marca: 'Xiaomi', categoria: 'acessorios', preco: 299.90, precoPix: 284.91, estoque: 35, sku: 'REDMI-W5-ACTIVE', imagem: 'assets/images/products/product-clock.png', descricao: '', especificacoes: '' },
  { id: 8, nome: 'Processador Intel Core Ultra 5 Desktop', marca: 'Intel', categoria: 'pcs', preco: 1899.90, precoPix: 1804.91, estoque: 0, sku: 'INTEL-CU5-DESK', imagem: 'assets/images/products/product-intel.png', descricao: '', especificacoes: '' }
];

/* Foto usada quando o produto foi cadastrado sem imagem */
const NO_PHOTO = 'assets/images/mascot/robot-help-recortado.png';

/* Lê a lista salva (ou a lista inicial, se ainda não houver nada salvo) */
function loadProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
    if (Array.isArray(saved)) return saved;
  } catch (error) { /* armazenamento indisponível: usa a lista inicial */ }
  return SEED_PRODUCTS.map((product) => ({ ...product }));
}

/* Guarda a lista; devolve false se o navegador não deixou salvar (ex.: espaço cheio) */
function saveProducts(list) {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
    return true;
  } catch (error) {
    return false;
  }
}

/* Transforma 249.9 em "R$ 249,90" */
function formatPrice(value) {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* Transforma "3.599,90" ou "3599.90" em número (devolve NaN se não for um valor válido) */
function parsePrice(text) {
  const clean = String(text).trim().replace(/[^\d.,]/g, '');
  return Number(clean.includes(',') ? clean.replace(/\./g, '').replace(',', '.') : clean);
}

/* Evita que um nome com < ou " quebre o HTML montado abaixo */
function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

/* Situação do estoque: esgotado, baixo (até 5 unidades) ou em estoque */
function stockStatus(amount) {
  if (amount <= 0) return { type: 'out', text: 'Esgotado' };
  if (amount <= LOW_STOCK_LIMIT) return { type: 'low', text: 'Estoque baixo' };
  return { type: 'ok', text: 'Em estoque' };
}

/* Aviso que atravessa uma mudança de página (ex.: salvar no formulário e mostrar a mensagem na lista) */
function queueNotice(message, isError) {
  sessionStorage.setItem(STAFF_NOTICE_KEY, JSON.stringify({ message, isError: Boolean(isError) }));
}

/* Mostra o aviso guardado (se houver) no <p data-staff-notice> da página */
function showQueuedNotice() {
  const notice = document.querySelector('[data-staff-notice]');
  const queued = sessionStorage.getItem(STAFF_NOTICE_KEY);
  if (!notice || !queued) return;
  sessionStorage.removeItem(STAFF_NOTICE_KEY);
  const { message, isError } = JSON.parse(queued);
  showStaffNotice(notice, message, isError);
}

function showStaffNotice(notice, message, isError) {
  notice.textContent = message;
  notice.classList.toggle('staff-notice--error', Boolean(isError));
  notice.hidden = false;
}

/* 7.1 Acesso: sem ter entrado como funcionário, o painel volta para o login.
   "Sair" apaga esse acesso. */
if (staffPage && sessionStorage.getItem(STAFF_SESSION_KEY) !== 'ok') {
  window.location.replace('login.html');
}

document.querySelectorAll('[data-staff-logout]').forEach((link) => {
  link.addEventListener('click', () => sessionStorage.removeItem(STAFF_SESSION_KEY));
});

/* "Em breve": links do menu que ainda não têm página não fazem nada */
document.querySelectorAll('.staff-menu a[aria-disabled="true"]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});

showQueuedNotice();

/* 7.2 Dashboard (funcionario.html): números do catálogo e lista de estoque baixo */
const dashboard = document.querySelector('[data-staff-dashboard]');

if (dashboard) {
  const products = loadProducts();
  const units = products.reduce((sum, product) => sum + product.estoque, 0);
  const lowStock = products.filter((product) => product.estoque <= LOW_STOCK_LIMIT).sort((a, b) => a.estoque - b.estoque);
  const stockValue = products.reduce((sum, product) => sum + product.estoque * product.precoPix, 0);

  dashboard.querySelector('[data-stat="total"]').textContent = products.length;
  dashboard.querySelector('[data-stat="units"]').textContent = units.toLocaleString('pt-BR');
  dashboard.querySelector('[data-stat="low"]').textContent = lowStock.length;
  dashboard.querySelector('[data-stat="value"]').textContent = formatPrice(stockValue);

  const lowList = document.querySelector('[data-low-list]');
  lowList.innerHTML = lowStock.length
    ? lowStock.map((product) => {
        const status = stockStatus(product.estoque);
        return `<li><span>${escapeHtml(product.nome)} — ${product.estoque} un.</span><span class="staff-badge staff-badge--${status.type}">${status.text}</span><a href="funcionario-produto.html?id=${product.id}">Repor estoque</a></li>`;
      }).join('')
    : '<li>Nenhum produto com estoque baixo. Tudo certo por aqui!</li>';
}

/* 7.3 Gestão de produtos (funcionario-produtos.html): tabela com busca, filtro, alterar e remover */
const productList = document.querySelector('[data-staff-list]');

if (productList) {
  const rows = productList.querySelector('[data-product-rows]');
  const searchInput = productList.querySelector('[data-product-search]');
  const categoryFilter = productList.querySelector('[data-product-filter]');
  const countText = productList.querySelector('[data-product-count]');
  const emptyText = productList.querySelector('[data-product-empty]');
  const removeDialog = document.querySelector('#remove-dialog');
  const removeName = removeDialog.querySelector('[data-remove-name]');
  const listNotice = document.querySelector('[data-staff-notice]');
  let products = loadProducts();
  let productToRemove = null;

  /* Desenha a tabela só com os produtos que combinam com a busca e a categoria escolhidas */
  function renderProducts() {
    const term = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const visible = products.filter((product) => {
      const text = `${product.nome} ${product.marca} ${product.sku}`.toLowerCase();
      return text.includes(term) && (!category || product.categoria === category);
    });

    rows.innerHTML = visible.map((product) => {
      const status = stockStatus(product.estoque);
      const oldPrice = product.preco > product.precoPix ? `<s class="staff-table__old">${formatPrice(product.preco)}</s>` : '';
      return `<tr>
        <td data-label="Foto"><img src="${escapeHtml(product.imagem || NO_PHOTO)}" alt=""></td>
        <td data-label="Produto"><div><span class="staff-table__name">${escapeHtml(product.nome)}</span><span class="staff-table__sku">${escapeHtml(product.marca)} · ${escapeHtml(product.sku)}</span></div></td>
        <td data-label="Categoria">${categoryNames[product.categoria] || '—'}</td>
        <td data-label="Preço"><div>${oldPrice}<strong>${formatPrice(product.precoPix)}</strong></div></td>
        <td data-label="Estoque"><span class="staff-badge staff-badge--${status.type}">${status.text}</span> ${product.estoque} un.</td>
        <td data-label="Ações"><div class="staff-actions">
          <a class="staff-action staff-action--edit" href="funcionario-produto.html?id=${product.id}">Alterar</a>
          <button class="staff-action staff-action--remove" type="button" data-remove-id="${product.id}">Remover</button>
        </div></td>
      </tr>`;
    }).join('');

    countText.textContent = `${visible.length} de ${products.length} produtos`;
    emptyText.hidden = visible.length > 0;
  }

  searchInput.addEventListener('input', renderProducts);
  categoryFilter.addEventListener('change', renderProducts);

  /* Remover: o botão da linha só abre a janelinha; quem apaga de verdade é o "Sim, remover" */
  rows.addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove-id]');
    if (!button) return;
    productToRemove = products.find((product) => product.id === Number(button.dataset.removeId));
    if (!productToRemove) return;
    removeName.textContent = productToRemove.nome;
    removeDialog.showModal();
  });

  removeDialog.querySelectorAll('[data-remove-cancel]').forEach((button) => {
    button.addEventListener('click', () => removeDialog.close());
  });
  removeDialog.addEventListener('click', (event) => { if (event.target === removeDialog) removeDialog.close(); });

  removeDialog.querySelector('[data-remove-confirm]').addEventListener('click', () => {
    const remaining = products.filter((product) => product.id !== productToRemove.id);
    removeDialog.close();
    if (saveProducts(remaining)) {
      products = remaining;
      showStaffNotice(listNotice, 'Produto removido com sucesso!', false);
    } else {
      showStaffNotice(listNotice, 'Não foi possível remover o produto. Tente novamente.', true);
    }
    renderProducts();
  });

  renderProducts();
}

/* 7.4 Formulário (funcionario-produto.html): cadastra um produto novo ou, com ?id=, altera um existente.
   Inclui a pré-visualização da imagem (clicar ou arrastar). */
const productForm = document.querySelector('[data-product-form]');

if (productForm) {
  const fileInput = productForm.querySelector('input[type="file"]');
  const uploadArea = productForm.querySelector('[data-upload-area]');
  const uploadText = productForm.querySelector('[data-upload-text]');
  const preview = productForm.querySelector('[data-upload-preview]');
  const uploadMessage = productForm.querySelector('[data-upload-message]');
  const formMessage = productForm.querySelector('[data-form-message]');
  const fields = productForm.elements;
  const products = loadProducts();
  const editId = Number(new URLSearchParams(window.location.search).get('id')) || null;
  const editing = editId ? products.find((product) => product.id === editId) : null;
  let currentImage = '';

  function mostrarImagem(url) {
    preview.src = url;
    preview.hidden = false;
    uploadText.hidden = true;
    uploadMessage.hidden = true;
  }

  /* Modo edição: troca os textos da página e preenche os campos com os dados do produto */
  if (editId && !editing) {
    queueNotice('Produto não encontrado.', true);
    window.location.replace('funcionario-produtos.html');
  }

  if (editing) {
    document.title = 'Alterar produto | AXIS';
    document.querySelector('[data-form-title]').textContent = 'Alterar Produto';
    document.querySelector('[data-form-description]').textContent = 'Atualize as informações do eletrônico. As mudanças valem assim que você salvar.';
    productForm.querySelector('[data-form-submit]').textContent = 'Salvar Alterações';
    fields.nome.value = editing.nome;
    fields.marca.value = editing.marca;
    fields.categoria.value = editing.categoria;
    fields.preco.value = editing.preco.toFixed(2).replace('.', ',');
    fields['preco-pix'].value = editing.precoPix.toFixed(2).replace('.', ',');
    fields.estoque.value = editing.estoque;
    fields.sku.value = editing.sku;
    fields.descricao.value = editing.descricao;
    fields.especificacoes.value = editing.especificacoes;
    currentImage = editing.imagem;
    if (currentImage) mostrarImagem(currentImage);
  }

  /* Reduz a foto para no máximo 480px antes de guardar (o localStorage tem pouco espaço) */
  function shrinkImage(file, done) {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, 480 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        done(file.type === 'image/png' ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', 0.85));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  /* Confere formato (JPG/PNG) e tamanho (até 2MB) como diz o texto do campo */
  function receiveImage(file) {
    uploadMessage.classList.remove('form-message--success');
    if (!file) return;
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      showMessage(uploadMessage, 'Use uma imagem JPG ou PNG.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showMessage(uploadMessage, 'A imagem deve ter no máximo 2MB.');
      return;
    }
    shrinkImage(file, (url) => { currentImage = url; mostrarImagem(url); });
  }

  fileInput.addEventListener('change', () => receiveImage(fileInput.files[0]));

  /* Arrastar e soltar a imagem sobre a área pontilhada */
  ['dragenter', 'dragover'].forEach((type) => uploadArea.addEventListener(type, (event) => {
    event.preventDefault();
    uploadArea.classList.add('is-dragover');
  }));
  ['dragleave', 'drop'].forEach((type) => uploadArea.addEventListener(type, () => uploadArea.classList.remove('is-dragover')));
  uploadArea.addEventListener('drop', (event) => {
    event.preventDefault();
    receiveImage(event.dataTransfer.files[0]);
  });

  /* Salvar: valida, grava e volta para a lista com o aviso de sucesso */
  productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formMessage.hidden = true;
    if (!productForm.checkValidity()) {
      productForm.reportValidity();
      return;
    }

    const preco = parsePrice(fields.preco.value);
    const precoPix = parsePrice(fields['preco-pix'].value);
    if (!(preco > 0) || !(precoPix > 0)) {
      showMessage(formMessage, 'Digite preços válidos, como 1.299,90.');
      return;
    }
    if (precoPix > preco) {
      showMessage(formMessage, 'O preço no PIX não pode ser maior que o preço original.');
      return;
    }

    const product = {
      id: editing ? editing.id : products.reduce((max, item) => Math.max(max, item.id), 0) + 1,
      nome: fields.nome.value.trim(),
      marca: fields.marca.value.trim(),
      categoria: fields.categoria.value,
      preco,
      precoPix,
      estoque: Number(fields.estoque.value),
      sku: fields.sku.value.trim(),
      descricao: fields.descricao.value.trim(),
      especificacoes: fields.especificacoes.value.trim(),
      imagem: currentImage
    };

    const updated = editing ? products.map((item) => (item.id === product.id ? product : item)) : [...products, product];
    if (!saveProducts(updated)) {
      showMessage(formMessage, 'Não foi possível salvar. Tente uma imagem menor.');
      return;
    }
    queueNotice(editing ? 'Produto alterado com sucesso!' : 'Produto cadastrado com sucesso!', false);
    window.location.assign('funcionario-produtos.html');
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


/* ---------- 8. PÁGINA DE PRODUTO (produto-*.html) ----------
   Galeria de fotos, "Ver mais" da descrição e consulta de frete.
   Os botões "Comprar Agora" e "Adicionar ao carrinho" são links comuns no HTML
   (pagamento.html e carrinho.html), então funcionam mesmo sem JavaScript. */

/* Galeria: clicar numa miniatura troca a foto principal.
   O "+" só revela as fotos extras (a foto em destaque continua a mesma). */
document.querySelectorAll('[data-product-gallery]').forEach((gallery) => {
  const mainImage = gallery.querySelector('[data-gallery-main]');
  const thumbs = gallery.querySelectorAll('[data-gallery-thumb]');
  const moreButton = gallery.querySelector('[data-gallery-more]');

  /* Deixa em destaque a miniatura escolhida e mostra a foto dela em tamanho grande */
  function selectThumb(thumb) {
    mainImage.src = thumb.dataset.full;
    mainImage.alt = thumb.dataset.alt;
    thumbs.forEach((item) => {
      const isSelected = item === thumb;
      item.classList.toggle('is-active', isSelected);
      item.setAttribute('aria-pressed', String(isSelected));
    });
  }

  thumbs.forEach((thumb) => thumb.addEventListener('click', () => selectThumb(thumb)));

  if (moreButton) {
    moreButton.addEventListener('click', () => {
      const extras = gallery.querySelectorAll('[data-thumb-extra]');
      extras.forEach((item) => { item.hidden = false; });
      moreButton.closest('li').remove();
      const firstExtra = extras[0]?.querySelector('[data-gallery-thumb]');
      if (firstExtra) firstExtra.focus();
    });
  }
});

/* "Ver mais" / "Ver menos": mostra ou esconde os itens extras da descrição */
document.querySelectorAll('[data-features-toggle]').forEach((button) => {
  const extras = document.querySelectorAll('[data-feature-extra]');

  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    extras.forEach((item) => { item.hidden = isOpen; });
    button.setAttribute('aria-expanded', String(!isOpen));
    button.textContent = isOpen ? 'Ver mais' : 'Ver menos';
  });
});

/* Consulta de frete: aceita qualquer CEP com 8 números (o campo formata como 00000-000)
   e mostra "Frete grátis" em verde. Ainda é uma simulação: não consulta os Correios. */
document.querySelectorAll('[data-shipping-form]').forEach((form) => {
  const cepInput = form.querySelector('input');
  const result = form.querySelector('[data-shipping-result]');

  const onlyDigits = () => cepInput.value.replace(/\D/g, '').slice(0, 8);

  function showResult(text, type) {
    result.textContent = text;
    result.classList.toggle('is-success', type === 'success');
    result.classList.toggle('is-error', type === 'error');
  }

  /* Ao digitar: deixa só números, coloca o hífen e apaga o resultado anterior */
  cepInput.addEventListener('input', () => {
    const digits = onlyDigits();
    cepInput.value = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
    showResult('', null);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (onlyDigits().length === 8) showResult('Frete grátis', 'success');
    else showResult('Digite um CEP válido com 8 números.', 'error');
  });
});


/* ---------- 9. LISTA DE PRODUTOS → PÁGINA DO PRODUTO (produtos.html) ----------
   Liga cada cartão da vitrine à sua página: o nome do produto vira um link e o cartão
   inteiro passa a ser clicável. Vale para produtos.html e para os carrosséis da home.
   A chave é o nome do arquivo da foto do cartão. */
const productPageLinks = {
  'product-pc.png': 'produto-notebook-lenovo.html',
  'product-phone.png': 'produto-motorola-g35.html',
  'product-headphone.png': 'produto-jbl-tune-530bt.html',
  'product-mouse.png': 'produto-logitech-m170.html',
  'product-tv.png': 'produto-samsung-tv-50.html',
  'product-tablet.png': 'produto-galaxy-tab-a9.html',
  'product-clock.png': 'produto-redmi-watch-5.html',
  'product-intel.png': 'produto-intel-core-ultra-5.html'
};

document.querySelectorAll('.page--products .product-card, .page--home .product-card').forEach((card) => {
  const photo = card.querySelector('img');
  const title = card.querySelector('h2, h3');
  const page = photo && productPageLinks[photo.getAttribute('src').split('/').pop()];
  if (!page || !title) return;

  /* Nos carrosséis da home o link já vem no HTML; em produtos.html ele é criado aqui */
  if (!title.querySelector('a')) {
    const link = document.createElement('a');
    link.href = page;
    link.textContent = title.textContent;
    title.replaceChildren(link);
  }
  card.classList.add('is-linked');

  /* Clicar em qualquer parte do cartão abre a página (exceto no link do carrinho e no próprio link do nome) */
  card.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) return;
    window.location.assign(page);
  });
});
