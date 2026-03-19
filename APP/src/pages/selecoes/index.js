import { getSelecoes, deleteSelecao, postSelecao, putSelecao } from "../../services/selecoes.service.js";


async function carregarSelecoes() {

    const selecoes = await getSelecoes();

    console.log("selecoes:", selecoes);

    const container = document.querySelector("#selecoes-container");

    container.innerHTML = "";

    selecoes.forEach(selecao => {

        const card = document.createElement("div");

        card.classList.add("card-selecao");

        card.innerHTML = `
            <img src="${selecao.logo}" alt="${selecao.nome}" width="120">

            <h2>${selecao.nome}</h2>

            <p>Grupo ${selecao.grupo}</p>

            <div class="acoes">
                <button class="btn-ver">Ver jogadores</button>
                <button class="btn-editar">Editar</button>
                <button class="btn-excluir">Excluir</button>
            </div>
        `;

       
        const btnVer = card.querySelector(".btn-ver");

        btnVer.addEventListener("click", () => {

            localStorage.setItem("selecaoId", selecao.id);

            window.location.href = "jogadores";

});

        
        const btnExcluir = card.querySelector(".btn-excluir");

        btnExcluir.addEventListener("click", async () => {

            const confirmar = confirm(`Deseja excluir ${selecao.nome}?`);

            if (!confirmar) return;

            await deleteSelecao(selecao.id);

            carregarSelecoes();
        });

        
        const btnEditar = card.querySelector(".btn-editar");

        btnEditar.addEventListener("click", () => {

            document.querySelector("#selecao-id").value = selecao.id;
            document.querySelector("#nome").value = selecao.nome;
            document.querySelector("#grupo").value = selecao.grupo;
            document.querySelector("#logo").value = selecao.logo;

        });

        container.appendChild(card);
    });

}

carregarSelecoes();


//CHAT QUE FEZ ( NAO ENTENDI )
const form = document.querySelector("#form-selecao");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const id = document.querySelector("#selecao-id").value;
    const nome = document.querySelector("#nome").value;
    const grupo = document.querySelector("#grupo").value;
    const logo = document.querySelector("#logo").value;

    const selecao = {
        nome,
        grupo,
        logo
    };

    if (id) {

        await putSelecao(id, selecao);

    } else {

        await postSelecao({
            ...selecao,
            jogadores: [],
            conquistas: []
        });

    }

    form.reset();
    document.querySelector("#selecao-id").value = "";

    carregarSelecoes();
});