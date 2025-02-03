import Produto from "./Produto";

export default interface Categoria {
    id: number;
    nome: string;
    nacionalidade: string;
    produtos?: Produto[];
}