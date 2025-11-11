   const clinicas = [
        {
            nome: "Clínica da Mulher",
            endereco: "Tv. Arildo Ferreira Da Silva, 5 - Barreiera",
            horario: "07h às 17h",
            descricao: "Clínica Municipal especializada em Atenção Integral à Saúde da Mulher do município de Saquarema.",
            imagem: "../../assets/img/clinica.jpg",
            whatsapp: "https://wa.me/552199999999",
            mapa: "https://maps.google.com"
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
                    <a href="${clinica.whatsapp}" target="_blank" class="btn-secondary">
                        Entre em contato <i class="fa-brands fa-whatsapp"></i>
                    </a>

                    <a href="${clinica.mapa}" target="_blank" class="btn-secondary">
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

