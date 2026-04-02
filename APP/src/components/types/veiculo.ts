export interface Veiculo {
  id: number;
  Anunciantes_id: number;
  Fabricantes_id: number;
  modelo: string;
  descricao: string;
  valor: number;
  ano: number;
  ano_modelo: number;
  fotos: string[];
}