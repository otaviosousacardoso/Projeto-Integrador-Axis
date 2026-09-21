const loginDialog = document.querySelector('#login-dialog');
const loginTrigger = document.querySelector('[data-open-login]');
const closeLoginButton = document.querySelector('[data-close-login]');
const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('#site-menu');

/* Mantém os conteúdos das páginas alinhados ao mesmo eixo do cabeçalho. */
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

if (loginDialog && loginTrigger) {
  loginTrigger.addEventListener('click', (event) => {
    event.preventDefault();
    loginDialog.showModal();
    loginDialog.querySelector('input')?.focus();
  });
}

if (loginDialog && closeLoginButton) {
  closeLoginButton.addEventListener('click', () => loginDialog.close());
  loginDialog.addEventListener('click', (event) => { if (event.target === loginDialog) loginDialog.close(); });
}

if (menuToggle && siteMenu) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    siteMenu.hidden = isExpanded;
  });
}

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
  const offers = [
    { eyebrow: 'Bem-vindo à AXIS', title: 'Tecnologia que<br>mudará <span>o seu mundo</span>', description: 'O melhor em hardware e gadgets com entrega relâmpago', text: 'Ver ofertas', link: 'produtos.html?ofertas=1', image: 'assets/images/mascot/robot-banner.png', alt: 'Mascote robô da AXIS', badge: 'Ofertas especiais' },
    { eyebrow: 'Oferta da semana', title: 'Seu novo celular<br>com <span>preço incrível</span>', description: 'Desempenho, câmera e conectividade para acompanhar sua rotina', text: 'Ver smartphones', link: 'produtos.html?categoria=smartphones', image: 'assets/images/products/product-phone.png', alt: 'Smartphone em destaque', badge: 'Até 20% OFF' },
    { eyebrow: 'Som que impressiona', title: 'Mergulhe em um<br>mundo de <span>áudio</span>', description: 'Fones e equipamentos para ouvir cada detalhe com qualidade', text: 'Explorar áudio', link: 'produtos.html?categoria=audio', image: 'assets/images/products/product-headphone.png', alt: 'Fone de ouvido em destaque', badge: 'Frete grátis' },
    { eyebrow: 'Para maratonar', title: 'Sua diversão<br>em <span>tela grande</span>', description: 'Encontre a TV ideal para filmes, séries, games e muito mais', text: 'Ver televisores', link: 'produtos.html?categoria=televisores', image: 'assets/images/products/product-tv.png', alt: 'Televisão em destaque', badge: 'Oferta relâmpago' },
    { eyebrow: 'Performance AXIS', title: 'Mais potência<br>para <span>suas ideias</span>', description: 'Monte seu setup com máquinas prontas para trabalho e criação', text: 'Conhecer PCs', link: 'produtos.html?categoria=pcs', image: 'assets/images/products/product-pc.png', alt: 'Computador em destaque', badge: 'Monte seu setup' }
  ];
  let current = 0;
  let timer;
  let changeTimer;

  /* Setas dentro do banner, sem círculos ou fundo sobre o conteúdo. */
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

  offers.forEach((offer, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Mostrar oferta ${index + 1}: ${offer.eyebrow}`);
    dot.addEventListener('click', () => { goTo(index); startAutoPlay(); });
    dots.appendChild(dot);
  });

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

  function goTo(index) {
    current = (index + offers.length) % offers.length;
    carousel.classList.add('is-changing');
    window.clearTimeout(changeTimer);
    changeTimer = window.setTimeout(() => { renderOffer(current); carousel.classList.remove('is-changing'); }, reduceMotion ? 0 : 120);
  }

  function startAutoPlay() {
    window.clearInterval(timer);
    if (!reduceMotion) timer = window.setInterval(() => goTo(current + 1), 5000);
  }

  previousArrow.addEventListener('click', () => { goTo(current - 1); startAutoPlay(); });
  nextArrow.addEventListener('click', () => { goTo(current + 1); startAutoPlay(); });

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

function showMessage(element, message) {
  if (!element) return;
  element.textContent = message;
  element.hidden = false;
}

document.querySelectorAll('[data-login-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = form.querySelector('[data-login-message]');
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (message) message.hidden = true;
    window.location.assign('minha-conta.html');
  });
});

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

const recoveryForm = document.querySelector('[data-recovery-form]');
if (recoveryForm) {
  recoveryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = recoveryForm.querySelector('[data-recovery-message]');
    if (!recoveryForm.checkValidity()) { recoveryForm.reportValidity(); return; }
    showMessage(message, 'Se este e-mail estiver cadastrado, você receberá as instruções de recuperação.');
  });
}
