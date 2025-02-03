import Produto from "./Produto";

export default interface Categoria {
    id: number;
    nome: string;
    produto?: Produto[];
}