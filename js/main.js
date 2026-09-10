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
  loginDialog.addEventListener('click', (event) => {
    if (event.target === loginDialog) loginDialog.close();
  });
}

if (menuToggle && siteMenu) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    siteMenu.hidden = isExpanded;
  });
}

function showMessage(element, message) {
  element.textContent = message;
  element.hidden = false;
}

document.querySelectorAll('[data-login-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = form.querySelector('[data-login-message]');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
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
    if (!registerForm.checkValidity()) {
      registerForm.reportValidity();
      return;
    }
    if (password.value !== confirmation.value) {
      showMessage(message, 'As senhas precisam ser iguais.');
      confirmation.focus();
      return;
    }
    window.location.assign('minha-conta.html');
  });
}

const recoveryForm = document.querySelector('[data-recovery-form]');
if (recoveryForm) {
  recoveryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = recoveryForm.querySelector('[data-recovery-message]');
    if (!recoveryForm.checkValidity()) {
      recoveryForm.reportValidity();
      return;
    }
    showMessage(message, 'Se este e-mail estiver cadastrado, você receberá as instruções de recuperação.');
  });
}
