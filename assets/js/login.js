// ====== Mostrar / ocultar senha ======
const eye = document.querySelector('.password-wrapper i');
const senhaInput = document.querySelector('#senha');

if (eye && senhaInput) {
  eye.addEventListener('click', () => {
    const isPassword = senhaInput.type === 'password';
    senhaInput.type = isPassword ? 'text' : 'password';
    eye.classList.toggle('fa-eye');
    eye.classList.toggle('fa-eye-slash');
  });
}

// ====== Função para gerar hash da senha ======
async function gerarHash(texto) {
  const encoder = new TextEncoder();
  const data = encoder.encode(texto);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// ====== Função para carregar usuários (localStorage + JSON externo opcional) ======
async function carregarUsuarios() {
  // Tenta carregar do localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  try {
    // Tenta carregar também de um arquivo usuarios.json (caso exista)
    const resposta = await fetch("../../usuarios.json");
    if (resposta.ok) {
      const usuariosArquivo = await resposta.json();

      // Evita duplicação (mesmo e-mail)
      usuariosArquivo.forEach(u => {
        if (!usuarios.some(us => us.email === u.email)) {
          usuarios.push(u);
        }
      });

      // Atualiza o localStorage com todos os usuários
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  } catch (erro) {
    console.warn("Nenhum arquivo usuarios.json encontrado ou erro ao carregar:", erro);
  }

  return usuarios;
}

// ====== Lógica principal de login ======
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login-btn');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');

  if (!loginButton || !emailInput || !senhaInput) return;

  loginButton.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
      alert("Por favor, preencha e-mail e senha!");
      return;
    }

    const usuarios = await carregarUsuarios();
    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
      alert("Usuário não encontrado!");
      return;
    }

    const hashSenha = await gerarHash(senha);

    if (hashSenha === usuario.senha) {
      alert(`Bem-vindo(a), ${usuario.nome}!`);
      window.location.href = "../../pages/dashboard/minha_area.html";
    } else {
      alert("Senha incorreta!");
    }
  });
});
