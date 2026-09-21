const loginDialog = document.querySelector('#login-dialog');
const loginTrigger = document.querySelector('[data-open-login]');
const closeLoginButton = document.querySelector('[data-close-login]');
const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('#site-menu');

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
    window.setTimeout(() => { renderOffer(current); carousel.classList.remove('is-changing'); }, reduceMotion ? 0 : 120);
  }

  function startAutoPlay() {
    window.clearInterval(timer);
    if (!reduceMotion) timer = window.setInterval(() => goTo(current + 1), 5000);
  }

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
    if (!recoveryForm.checkValidity()) { form.reportValidity(); return; }
    showMessage(message, 'Se este e-mail estiver cadastrado, você receberá as instruções de recuperação.');
  });
}
