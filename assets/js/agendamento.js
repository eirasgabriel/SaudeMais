const clinicas = [
  {
    nome: "Clínica da Mulher",
    endereco: "Tv. Arildo Ferreira Da Silva, 5 - Barreira",
    horario: "07h da manhã às 17h da tarde",
    descricao: "Clínica Municipal especializada em Atenção Integral à Saúde da Mulher do município de Saquarema.",
    imagem: "../../assets/img/clinicadamulher.jpg",
  },
  {
    nome: "Centro de Atenção Psicossocial de Saquarema – CAPS AD",
    endereco: "Rua Adolfo Bravo, n° 28 - Bacaxá",
    horario: "08h da manhã às 17h da tarde",
    descricao: "Clínica de Saúde especializada em atendimento psicossocial.",
    imagem: "../../assets/img/caps.png",
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const especialidadeSelect = document.getElementById("especialidade");
  const medicoSelect = document.getElementById("medico");
  const dataSelect = document.getElementById("data");
  const horarioSelect = document.getElementById("horario");
  const form = document.getElementById("formAgendamento");
  const userMenu = document.getElementById("userMenu");
  const logoutMenu = document.getElementById("logoutMenu");
  const contatoBtn = document.getElementById("btnContato");
  const mapaBtn = document.getElementById("btnMapa");

  const params = new URLSearchParams(window.location.search);
  const nomeClinica = params.get("clinica");
  let clinicaSelecionada = null;

  if (nomeClinica) {
    clinicaSelecionada = clinicas.find(c => c.nome === nomeClinica);
    if (clinicaSelecionada) {
      document.getElementById("ag-img").src = clinicaSelecionada.imagem;
      document.getElementById("ag-nome").textContent = clinicaSelecionada.nome;
      document.getElementById("ag-endereco").textContent = clinicaSelecionada.endereco;
      document.getElementById("ag-horario").textContent = clinicaSelecionada.horario;
      document.getElementById("ag-descricao").textContent = clinicaSelecionada.descricao;
      contatoBtn.onclick = () => {
        window.open(`https://wa.me/${clinicaSelecionada.whatsapp}`, "_blank");
      };
      mapaBtn.onclick = () => {
         window.open(clinicaSelecionada.mapa, "_blank");
      };
    }
  }

  const dados = {
    ginecologia: {
      medicos: ["Dra. Ana Paula", "Dr. Carlos Silva"],
      datas: ["12/11/2025", "15/11/2025"],
      horarios: ["08:00", "09:30", "11:00"]
    },
    obstetricia: {
      medicos: ["Dra. Helena Moraes", "Dr. Ricardo Lima"],
      datas: ["13/11/2025", "16/11/2025"],
      horarios: ["10:00", "13:30", "15:00"]
    },
    mastologia: {
      medicos: ["Dr. João Mendes", "Dra. Laura Campos"],
      datas: ["14/11/2025", "17/11/2025"],
      horarios: ["08:30", "10:00", "14:00"]
    }
  };

  especialidadeSelect.addEventListener("change", () => {
    const esp = especialidadeSelect.value;
    medicoSelect.innerHTML = `<option value="">Selecione...</option>`;
    dataSelect.innerHTML = `<option value="">Selecione um médico</option>`;
    horarioSelect.innerHTML = `<option value="">Selecione uma data</option>`;
    if (esp && dados[esp]) {
      dados[esp].medicos.forEach(medico => {
        const option = document.createElement("option");
        option.textContent = medico;
        option.value = medico;
        medicoSelect.appendChild(option);
      });
    }
  });

  medicoSelect.addEventListener("change", () => {
    const esp = especialidadeSelect.value;
    dataSelect.innerHTML = `<option value="">Selecione...</option>`;
    horarioSelect.innerHTML = `<option value="">Selecione uma data</option>`;
    if (esp && dados[esp]) {
      dados[esp].datas.forEach(data => {
        const option = document.createElement("option");
        option.textContent = data;
        option.value = data;
        dataSelect.appendChild(option);
      });
    }
  });

  dataSelect.addEventListener("change", () => {
    const esp = especialidadeSelect.value;
    horarioSelect.innerHTML = `<option value="">Selecione...</option>`;
    if (esp && dados[esp]) {
      dados[esp].horarios.forEach(horario => {
        const option = document.createElement("option");
        option.textContent = horario;
        option.value = horario;
        horarioSelect.appendChild(option);
      });
    }
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const esp = especialidadeSelect.value;
    const med = medicoSelect.value;
    const dat = dataSelect.value;
    const hor = horarioSelect.value;
    if (!esp || !med || !dat || !hor) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    const novoAgendamento = {
      clinica: clinicaSelecionada ? clinicaSelecionada.nome : "Clínica não identificada",
      especialidade: esp,
      medico: med,
      data: dat,
      horario: hor,
      criadoEm: new Date().toLocaleString()
    };
    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos.push(novoAgendamento);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    alert("Consulta agendada com sucesso!");
    form.reset();
  });

  document.querySelector(".dropdown-container").addEventListener("click", () => {
    userMenu.classList.toggle("show");
    logoutMenu.classList.remove("show");
  });

  document.querySelector(".logout-dropdown-container").addEventListener("click", () => {
    logoutMenu.classList.toggle("show");
    userMenu.classList.remove("show");
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".dropdown-container") && !e.target.closest(".logout-dropdown-container")) {
      userMenu.classList.remove("show");
      logoutMenu.classList.remove("show");
    }
  });
});
