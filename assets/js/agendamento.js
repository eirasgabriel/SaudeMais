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

  // Simulação de dados
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

  // Atualiza médicos conforme especialidade
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

  // Atualiza datas conforme médico
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

  // Atualiza horários conforme data
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

  // Simula envio do formulário
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

    alert(`✅ Consulta agendada!\n\nEspecialidade: ${esp}\nMédico: ${med}\nData: ${dat}\nHorário: ${hor}`);
    form.reset();
  });

  // Menu suspenso - Perfil
  document.querySelector(".dropdown-container").addEventListener("click", () => {
    userMenu.classList.toggle("show");
    logoutMenu.classList.remove("show");
  });

  // Menu suspenso - Logout
  document.querySelector(".logout-dropdown-container").addEventListener("click", () => {
    logoutMenu.classList.toggle("show");
    userMenu.classList.remove("show");
  });

  // Botões de contato e mapa
  contatoBtn.addEventListener("click", () => {
    window.open("https://wa.me/5522999611638?text=Olá! Gostaria de informações sobre agendamento.", "_blank");
  });

  mapaBtn.addEventListener("click", () => {
    window.open("https://www.google.com/maps?q=Tv.+Arildo+Ferreira+Da+Silva,+5+-+Barreira,+Saquarema", "_blank");
  });

  // Fecha menus ao clicar fora
  document.addEventListener("click", e => {
    if (!e.target.closest(".dropdown-container") && !e.target.closest(".logout-dropdown-container")) {
      userMenu.classList.remove("show");
      logoutMenu.classList.remove("show");
    }
  });
});
