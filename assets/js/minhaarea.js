
document.addEventListener("DOMContentLoaded", () => {
  // atualiza mensagem "Nenhum item"
  function atualizarMensagens() {
    const secoes = document.querySelectorAll(".box");
    secoes.forEach(secao => {
      const cards = secao.querySelectorAll(".card");
      const msg = secao.querySelector(".none");
      if (cards.length === 0) {
        msg.style.display = "block";
      } else {
        msg.style.display = "none";
      }
    });
  }

  // CONSULTAS 
  const consultas = document.querySelectorAll(".consultas .card");

  consultas.forEach(card => {
    const btnAlterar = card.querySelector(".edit");
    const btnCancelar = card.querySelector(".delete");

    // Simula alteração de data
    btnAlterar.addEventListener("click", () => {
      const novaData = prompt("Digite a nova data e hora da consulta (ex: 30/09/2025 - 10:00):");
      if (novaData) {
        const info = card.querySelector(".info p strong");
        info.textContent = novaData;
        alert("✅ Consulta alterada com sucesso!");
      }
    });

    // Cancela consulta (remove card)
    btnCancelar.addEventListener("click", () => {
      const confirma = confirm("Deseja realmente cancelar esta consulta?");
      if (confirma) {
        card.remove();
        atualizarMensagens();
        alert("❌ Consulta cancelada!");
      }
    });
  });

  //  EXAMES 
  const exames = document.querySelectorAll(".exames .card");

  exames.forEach(card => {
    const btnExcluir = card.querySelector(".fa-trash-can");
    const btnDownload = card.querySelector(".fa-download");

    // Simula exclusão do exame
    btnExcluir.addEventListener("click", () => {
      const confirma = confirm("Deseja excluir este exame?");
      if (confirma) {
        card.remove();
        atualizarMensagens();
        alert("🗑️ Exame removido com sucesso!");
      }
    });

    // Simula download de exame
    btnDownload.addEventListener("click", () => {
      alert("📄 Simulação: O arquivo do exame foi baixado com sucesso!");
    });
  });

  // Inicializa
  atualizarMensagens();
});
