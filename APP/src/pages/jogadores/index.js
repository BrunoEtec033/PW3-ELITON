import { getSelecoes, putSelecao } from "../../services/selecoes.service.js";

let selecaoAtual = null;

async function carregarJogadores() {

    const params = new URLSearchParams(window.location.href.split("?")[1]);
    const id = localStorage.getItem("selecaoId");

    console.log("ID da URL:", id);

    const selecoes = await getSelecoes();

    console.log("Seleções:", selecoes);

    selecaoAtual = selecoes.find(s => s.id == id);

    if (!selecaoAtual) {
        alert("Seleção não encontrada.");
        return;
    }

    console.log("Seleção encontrada:", selecaoAtual);

    document.querySelector("#titulo-selecao").innerText = `Seleção: ${selecaoAtual.nome}`;

    renderJogadores();
}

function renderJogadores() {

    const container = document.querySelector("#jogadores-container");

    container.innerHTML = "";

    selecaoAtual.jogadores.forEach(jogador => {

        const card = document.createElement("div");

        card.classList.add("card-jogador");

        card.innerHTML = `
        <h3>${jogador.nome}</h3>
        <p>Camisa: ${jogador.camisa}</p>
        <p>Posição: ${jogador.posicao}</p>
        <p>Gols: ${jogador.gols}</p>
        <p>${jogador.titular ? "Titular" : "Reserva"}</p>
        <button class="btn-remover">Remover</button>
        `;

        const btnRemover = card.querySelector(".btn-remover");

        btnRemover.addEventListener("click", async () => {

            const confirmar = confirm("Remover jogador?");

            if (!confirmar) return;

            selecaoAtual.jogadores = selecaoAtual.jogadores.filter(j => j.id !== jogador.id);

            await putSelecao(selecaoAtual.id, selecaoAtual);

            renderJogadores();
        });

        container.appendChild(card);

    });

}

const form = document.querySelector("#form-jogador");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nome = document.querySelector("#nome").value;
    const camisa = Number(document.querySelector("#camisa").value);
    const posicao = document.querySelector("#posicao").value;
    const gols = Number(document.querySelector("#gols").value);
    const titular = document.querySelector("#titular").checked;

    const novoJogador = {
        id: Date.now(),
        nome,
        camisa,
        posicao,
        gols,
        titular
    };

    selecaoAtual.jogadores.push(novoJogador);

    await putSelecao(selecaoAtual.id, selecaoAtual);

    form.reset();

    renderJogadores();

});

carregarJogadores();