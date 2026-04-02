import type { Veiculo } from "../types/veiculo";

const API_URL = "https://congenial-lamp-5gr6qwxrrj9jf7999-3000.app.github.dev/veiculos";

export async function getVeiculos(): Promise<Veiculo[]> {
  const response = await fetch(API_URL);
  return response.json();
}