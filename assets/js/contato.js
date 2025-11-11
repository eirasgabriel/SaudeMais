// ================================================
// BANCO DE DADOS DAS CLÍNICAS
// ================================================
const clinicas = [
  {
    nome: "Clínica da Mulher",
    endereco: "Tv. Arildo Ferreira Da Silva, 5 - Barreira",
    horario: "07h da manhã às 17h da tarde",
    descricao:
      "Clínica Municipal especializada em Atenção Integral à Saúde da Mulher, oferecendo serviços de ginecologia, obstetrícia, prevenção e acompanhamento médico.",
    imagem: "../../assets/img/clinicadamulher.jpg",
    whatsapp: "5522999611638",
    telefone: "5522999611638",
    email: "contato@clinicadamulher.com"
  },
  {
    nome: "Centro de Atenção Psicossocial de Saquarema – CAPS AD",
    endereco: "Rua Adolfo Bravo, n° 28 - Bacaxá",
    horario: "08h da manhã às 17h da tarde",
    descricao:
      "Unidade especializada em saúde mental, oferecendo atendimento psicossocial, apoio terapêutico e acompanhamento contínuo aos moradores de Saquarema.",
    imagem: "../../assets/img/caps.png",
    whatsapp: "5522999999999",
    telefone: "5522999999999",
    email: "contato@capsad.com"
  }
];

// ================================================
// FUNÇÃO DE GENERALIZAÇÃO DO CARD DE CONTATO
// ================================================
document.addEventListener("DOMContentLoaded", () => {
  // Pega a clínica enviada pela URL (?clinica=...)
  const params = new URLSearchParams(window.location.search);
  const nomeClinica = params.get("clinica");

  if (!nomeClinica) return;

  // Busca a clínica correspondente no banco
  const clinica = clinicas.find(c => c.nome === nomeClinica);
  if (!clinica) return;

  // Preenche o card
  document.getElementById("ct-img").src = clinica.imagem;
  document.getElementById("ct-endereco").innerHTML = `<strong>${clinica.endereco}</strong>`;
  document.getElementById("ct-horario").textContent = clinica.horario;
  document.getElementById("ct-descricao").textContent = clinica.descricao;

  // Botão LIGAR
  document.getElementById("btnLigar").onclick = () => {
    window.location.href = `tel:${clinica.telefone}`;
  };

  // Botão WHATSAPP
  document.getElementById("btnWhatsapp").onclick = () => {
    window.open(`https://wa.me/${clinica.whatsapp}`, "_blank");
  };

  // Botão EMAIL
  document.getElementById("btnEmail").onclick = () => {
    window.location.href = `mailto:${clinica.email}`;
  };
});
