import { getSelecoes } from "../services/selecoes.service.js";

const selecoes = await getSelecoes();

console.log("selecoes:", selecoes);