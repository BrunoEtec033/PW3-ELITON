import { useEffect, useState } from "react";
import { getVeiculos } from "../services/veiculoService";
import type { Veiculo } from "../types/veiculo";

export function VeiculosList() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  useEffect(() => {
    getVeiculos().then(setVeiculos);
  }, []);

  return (
    <div>
      <h1>Lista de Veículos</h1>

      {veiculos.map((veiculo) => (
        <div key={veiculo.id}>
          <h2>{veiculo.modelo}</h2>
          <p>{veiculo.descricao}</p>
          <strong>R$ {veiculo.valor}</strong>
        </div>
      ))}
    </div>
  );
}