  const eye = document.querySelector('.password-wrapper i');
  const senha = document.querySelector('#senha');

  eye.addEventListener('click', () => {
    const isPassword = senha.type === 'password';
    senha.type = isPassword ? 'text' : 'password';
    eye.classList.toggle('fa-eye');
    eye.classList.toggle('fa-eye-slash');
  });

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login-btn');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');

  loginButton.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (email && senha) {
      if (email === "teste@saude.com" && senha === "123456") {
        window.location.href = "../pages/minha_area.html";
      }
    }
  });
});