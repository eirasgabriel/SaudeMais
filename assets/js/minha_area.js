function carregarConsultas() {
    const lista = document.getElementById("lista-consultas");
    const msgSemConsultas = document.getElementById("sem-consultas");

    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    if (agendamentos.length === 0) {
        msgSemConsultas.style.display = "block";
        return;
    }

    msgSemConsultas.style.display = "none";
    lista.innerHTML = "";

    agendamentos.forEach((ag, index) => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="info">
                <p><strong>${ag.data} - ${ag.horario}</strong></p>
                <p>${ag.clinica}</p>
                <p>${ag.especialidade}</p>
            </div>
            <div class="actions">
                <button class="edit" data-index="${index}">Alterar Data</button>
                <button class="delete" data-index="${index}">Cancelar</button>
            </div>
        `;

        lista.appendChild(card);
    });

    document.querySelectorAll(".delete").forEach(btn => {
        btn.addEventListener("click", function () {
            const i = this.getAttribute("data-index");
            agendamentos.splice(i, 1);
            localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
            carregarConsultas(); 
        });
    });
}

document.addEventListener("DOMContentLoaded", carregarConsultas);