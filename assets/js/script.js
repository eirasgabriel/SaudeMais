// ===== PESQUISAR CLÍNICA =====
function buscarClinica() {
    const termo = document.getElementById('buscaClinica').value.trim().toLowerCase();
    const resultado = document.getElementById('resultadoClinica');

    if (!termo) {
        //Envolvido em Template String
        resultado.innerHTML = `<p>Digite o nome de uma clínica para pesquisar.</p>`;
        return;
    }

    if (termo.includes('mulher')) {
        //Envolvido em Template String
        resultado.innerHTML =
            `<div class="clinica-card">
                <h3>Clínica da Mulher</h3>
                <p><strong>Endereço:</strong> Tv. Arildo Ferreira Da Silva, 5 - Barreira</p>
                <p><strong>Horário:</strong> 07h às 17h</p>
                <button class="btn" onclick="window.open('http://maps.google.com/')">
                    Ver no Mapa
                </button>
            </div>`; //Link do Google Maps
    } else {
        resultado.innerHTML = '<p style="color:red;">Nenhuma clínica encontrada com esse nome.</p>';
    }
}

// ===== AGENDAR CONSULTA =====
function agendarConsulta() {
    const nome = prompt("Digite o nome do paciente:");
    const data = prompt("Digite a data da consulta (ex: 12/11/2025):");
    const hora = prompt("Digite o horário (ex: 14:30):");

    if (!nome || !data || !hora) {
        alert("Preencha todos os campos para agendar.");
        return;
    }

    const consulta = { nome, data, hora };
    const consultas = JSON.parse(localStorage.getItem('consultas') || '[]');
    consultas.push(consulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));

    const resultado = document.getElementById('resultadoClinica');
    
    //Envolvido em Template String 
    resultado.innerHTML =
        `<div class="clinica-card">
            <h3>Consulta Agendada!</h3>
            <p><strong>Paciente:</strong> ${nome}</p>
            <p><strong>Data:</strong> ${data}</p>
            <p><strong>Hora:</strong> ${hora}</p>
        </div>`;
}

// ===== CADASTRAR USUÁRIO =====
function cadastrarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const perfil = document.getElementById('perfil').value;

    if (!nome || !email || !perfil) {
        alert("Preencha todos os campos!");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push({ nome, email, perfil });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    exibirUsuarios();
    event.target.reset();
}

// ===== EXIBIR USUÁRIOS =====
function exibirUsuarios() {
    const lista = document.getElementById('listaUsuarios');
    if (!lista) return;

    lista.innerHTML = '';
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (usuarios.length === 0) {
        lista.innerHTML = '<p>Nenhum usuário cadastrado.</p>';
        return;
    }

    usuarios.forEach((u, i) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${u.nome}</strong> - ${u.perfil} <br> <small>${u.email}</small>`;
        li.onclick = () => {
            if (confirm(`Deseja excluir ${u.nome}?`)) {
                usuarios.splice(i, 1);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                exibirUsuarios();
            }
        };
        lista.appendChild(li);
    });
}

// ===== RELATÓRIOS =====
function gerarRelatorio() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const consultas = JSON.parse(localStorage.getItem('consultas') || '[]');

    const totalUsuarios = usuarios.length;
    const medicos = usuarios.filter(u => u.perfil === 'Médico').length;
    const pacientes = usuarios.filter(u => u.perfil === 'Paciente').length;
    const totalConsultas = consultas.length;

    const div = document.getElementById('relatorio');
    
    //Envolvido em Template String e uso de ${variavel}
    div.innerHTML =
        `<h3>Relatório Geral</h3>
        <p><strong>Usuários cadastrados:</strong> ${totalUsuarios}</p>
        <p><strong>Médicos:</strong> ${medicos}</p>
        <p><strong>Pacientes:</strong> ${pacientes}</p>
        <p><strong>Consultas agendadas:</strong> ${totalConsultas}</p>`;

    if (totalConsultas > 0) {
        div.innerHTML += `<h4>Últimas Consultas:</h4>`;
        consultas.slice(-3).forEach(c => {
            //Envolvido em Template String e uso de ${c.nome}, ${c.data}, ${c.hora}
            div.innerHTML += `<p>🩺 ${c.nome} - ${c.data} às ${c.hora}</p>`;
        });
    }
}

// Carrega usuários automaticamente se existir lista
exibirUsuarios();