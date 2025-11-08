    // Mostrar / ocultar senha
    document.querySelectorAll('.password-wrapper i').forEach(icon => {
      icon.addEventListener('click', () => {
        const input = icon.previousElementSibling;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      });
    });

    document.getElementById('cadastro-btn').addEventListener('click', () => {
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
      const confirmar = document.getElementById('confirmar-senha').value;
      const termos = document.getElementById('termos').checked;

      if (!nome || !email || !senha || !confirmar) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      if (senha !== confirmar) {
        alert('As senhas não coincidem.');
        return;
      }

      if (!termos) {
        alert('Você precisa aceitar os termos de uso.');
        return;
      }

      alert('Cadastro realizado com sucesso!');
      window.location.href = 'dashboard.html';
    });