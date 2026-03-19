import { getSelecoes, putSelecao } from "../../services/selecoes.service.js";

let selecaoAtual = null;

async function carregarJogadores() {
    
    const params = new URLSearchParams(window.location.search);
    
    const id = params.get("id") || localStorage.getItem("selecaoId");

    console.log("ID identificado:", id);

    if (!id) {
        alert("Erro: Nenhum ID de seleção foi encontrado.");
        return;
    }

    const selecoes = await getSelecoes();
    

    selecaoAtual = selecoes.find(s => s.id == id);

    if (!selecaoAtual) {
        alert("Seleção não encontrada.");
        return;
    }

    console.log("Seleção carregada:", selecaoAtual.nome);

   
    const titulo = document.querySelector("#titulo-selecao");
    if (titulo) {
        titulo.innerText = `Seleção: ${selecaoAtual.nome}`;
    }

    renderJogadores();
}

function renderJogadores() {
    const container = document.querySelector("#jogadores-container");
    if (!container) return;

    container.innerHTML = "";

    selecaoAtual.jogadores.forEach(jogador => {
        const card = document.createElement("div");
        card.classList.add("card-jogador");

        card.innerHTML = `
            <h3>${jogador.nome}</h3>
            <p>Camisa: ${jogador.camisa}</p>
            <p>Posição: ${jogador.posicao}</p>
            <p>Gols: ${jogador.gols}</p>
            <p>${jogador.titular ? "<strong>Titular</strong>" : "Reserva"}</p>
            <button class="btn-remover">Remover</button>
        `;

        const btnRemover = card.querySelector(".btn-remover");
        btnRemover.addEventListener("click", async () => {
            if (!confirm(`Deseja remover o jogador ${jogador.nome}?`)) return;

            
            selecaoAtual.jogadores = selecaoAtual.jogadores.filter(j => j.id !== jogador.id);

            
            await putSelecao(selecaoAtual.id, selecaoAtual);

            
            renderJogadores();
        });

        container.appendChild(card);
    });
}


const form = document.querySelector("#form-jogador");
if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const novoJogador = {
            id: Date.now(),
            nome: document.querySelector("#nome").value,
            camisa: Number(document.querySelector("#camisa").value),
            posicao: document.querySelector("#posicao").value,
            gols: Number(document.querySelector("#gols").value),
            titular: document.querySelector("#titular").checked
        };

       
        selecaoAtual.jogadores.push(novoJogador);

        
        await putSelecao(selecaoAtual.id, selecaoAtual);

        form.reset();
        renderJogadores();
    });
}


carregarJogadores();