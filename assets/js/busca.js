const clinicas = [
    {
        nome: "Clínica da Mulher",
        endereco: "Tv. Arildo Ferreira Da Silva, 5 - Barreira",
        horario: "07h da manhã às 17h da tarde",
        descricao: "Clínica Municipal especializada em Atenção Integral à Saúde da Mulher do município de Saquarema.",
        imagem: "../../assets/img/clinicadamulher.jpg",
    },
    {
        nome: "Centro de Atenção Psicossocial de Saquarema – CAPS",
        endereco: "Rua Adolfo Bravo, n° 28 - Bacaxá",
        horario: "08h da manhã às 17h da tarde",
        descricao: "Clínica de Saúde especializada em atendimento psicossocial, oferecendo suporte, acompanhamento e cuidado em saúde mental aos moradores de Saquarema.",
        imagem: "../../assets/img/caps.jpg",
    },
];

function criarCard(clinica) {
    return `
    <div class="card">
        <img src="${clinica.imagem}" class="card-img">

        <div class="card-info">
            <h2>${clinica.nome}</h2>
            <p>${clinica.endereco}</p>
            <p>Horário de Funcionamento: <strong>${clinica.horario}</strong></p>
            <p>${clinica.descricao}</p>

            <button class="btn-main">
                Agendar consulta <i class="fa-solid fa-arrow-right"></i>
            </button>

            <div class="btn-group">
                <a href="../../pages/contato.html" class="btn-secondary">
                    Entre em contato <i class="fa-solid fa-envelope"></i>
                </a>
                <a href="../../pages/localização.html" class="btn-secondary">
                    Mostrar no mapa <i class="fa-solid fa-location-dot"></i>
                </a>
            </div>
        </div>
    </div>
    `;
}


    function buscarClinica() {
        const termo = document.getElementById("search-input").value.toLowerCase().trim();
        const cardsContainer = document.getElementById("cards");

        cardsContainer.innerHTML = "";

        if (!termo) return;

        const resultado = clinicas.find(c =>
            c.nome.toLowerCase().includes(termo)
        );

        if (resultado) {
            cardsContainer.innerHTML = criarCard(resultado);
        } else {
            cardsContainer.innerHTML = `
                <p style="text-align:center; padding:20px; font-size:18px;">
                    Nenhuma clínica encontrada.
                </p>`;
        }
    }

    document.getElementById("search-btn").addEventListener("click", buscarClinica);

    document.getElementById("search-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") buscarClinica();
    });

